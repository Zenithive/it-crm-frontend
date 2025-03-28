

interface GoogleMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{
      name: string;
      value: string;
    }>;
  };
}

interface FormattedMessage {
  name: string;
  message: string;
  date: Date;
}

export const fetchGoogleUnreadEmails = async (
  accessToken: string,
  maxResults: number = 10
): Promise<FormattedMessage[]> => {
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&labelIds=UNREAD&maxResults=${maxResults}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch unread emails: ${response.status}`);
    }

    const data = await response.json();

    // Fetch details for each message
    const messageDetailsPromises = data.messages.map(async (msg: { id: string }) => {
      const detailResponse = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return detailResponse.json();
    });

    const messageDetails: GoogleMessage[] = await Promise.all(messageDetailsPromises);

    // Format messages
    return messageDetails.map(message => {
      const fromHeader = message.payload.headers.find(header => header.name === 'From');
      const dateHeader = message.payload.headers.find(header => header.name === 'Date');

      return {
        name: fromHeader ? extractName(fromHeader.value) : 'Unknown Sender',
        message: message.snippet || 'No preview available',
        date: dateHeader ? new Date(dateHeader.value) : new Date()
      };
    });
  } catch (error) {
    console.error("Error fetching Google unread emails:", error);
    throw error;
  }
};

// Helper function to extract name from email address
const extractName = (fromHeader: string): string => {
  // Handle formats like: "John Doe <john@example.com>" or "john@example.com"
  const nameMatch = fromHeader.match(/^"?([^"<]+)"?\s*<?\S+@\S+>?/);
  return nameMatch ? nameMatch[1].trim() : fromHeader;
};