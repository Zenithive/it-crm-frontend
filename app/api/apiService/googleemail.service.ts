import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface EmailMessage {
  id: number;
  sender: string;
  time: string;
  date: string;
  subject?: string;
  snippet?: string;
  isRead: boolean;
  emailAddress?: string; // Full email address for filtering
}

export const useGmailEmails = () => {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get auth tokens from Redux store
  const auth = useSelector((state: any) => state.auth);
  const { googleAccessToken } = auth || {};

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true);

        if (!googleAccessToken) {
          throw new Error('No Google access token available');
        }

        // Fetch both inbox and read emails
        const [inboxResponse, readResponse] = await Promise.all([
          fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50&labelIds=INBOX',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
                'Content-Type': 'application/json',
              },
            }
          ),
          fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50&q=label:read',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
                'Content-Type': 'application/json',
              },
            }
          )
        ]);

        if (!inboxResponse.ok) {
          throw new Error(`HTTP error fetching inbox: ${inboxResponse.status}`);
        }

        if (!readResponse.ok) {
          throw new Error(`HTTP error fetching read emails: ${readResponse.status}`);
        }

        const inboxData = await inboxResponse.json();
        const readData = await readResponse.json();

        // Combine messages and remove duplicates
        const allMessages = [...(inboxData.messages || [])];
        
        if (readData.messages) {
          // Add read messages that aren't already in the inbox list
          const inboxIds = new Set(inboxData.messages?.map((msg: { id: string }) => msg.id) || []);
          readData.messages.forEach((msg: { id: string }) => {
            if (!inboxIds.has(msg.id)) {
              allMessages.push(msg);
            }
          });
        }

        // Fetch details for each message
        const emailDetails = await Promise.all(
          allMessages.map(async (message: { id: string }, index: number) => {
            const detailResponse = await fetch(
              `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${googleAccessToken}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            const messageDetail = await detailResponse.json();

            // Extract headers
            const headers = messageDetail.payload.headers;
            const fromHeader = headers.find((h: any) => h.name === 'From');
            const subjectHeader = headers.find((h: any) => h.name === 'Subject');
            const dateHeader = headers.find((h: any) => h.name === 'Date');

            // Extract email address from the From header
            const fromValue = fromHeader ? fromHeader.value : 'Unknown <unknown@example.com>';
            const emailMatch = fromValue.match(/<([^>]+)>/);
            const emailAddress = emailMatch ? emailMatch[1] : fromValue;

            // Parse sender name
            const senderName = fromHeader
              ? fromHeader.value.replace(/<.*>/, '').trim()
              : 'Unknown Sender';

            // Parse date
            const messageDate = dateHeader
              ? new Date(dateHeader.value)
              : new Date();

            // Check if message is read
            const isRead = !messageDetail.labelIds?.includes('UNREAD');

            return {
              id: index,
              sender: senderName,
              emailAddress: emailAddress, // Store the full email address
              time: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: messageDate.toLocaleDateString(),
              subject: subjectHeader ? subjectHeader.value : 'No Subject',
              snippet: messageDetail.snippet || 'No preview available',
              isRead: isRead
            };
          })
        );

        setEmails(emailDetails);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching emails:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    if (googleAccessToken) {
      fetchEmails();
    }
  }, [googleAccessToken]);

  return { emails, isLoading, error };
};