import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface EmailMessage {
  id: number;
  sender: string;
  time: string;
  date: string;
  subject?: string;
  snippet?: string;
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

        const response = await fetch(
          'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50&labelIds=INBOX',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Fetch details for each message
        const emailDetails = await Promise.all(
          data.messages.map(async (message: { id: string }, index: number) => {
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

              // Parse sender name
              const senderName = fromHeader 
                ? fromHeader.value.replace(/<.*>/, '').trim() 
                : 'Unknown Sender';

              // Parse date
              const messageDate = dateHeader 
                ? new Date(dateHeader.value) 
                : new Date();

            return {
              id: index,
              sender: senderName,
              time: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: messageDate.toLocaleDateString(),
              subject: subjectHeader ? subjectHeader.value : 'No Subject',
              snippet: messageDetail.snippet || 'No preview available'
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