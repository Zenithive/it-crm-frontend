import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dashboardUnreadMessagesJson } from "../../api/jsonService/dashboardJsonService";
import { fetchGoogleUnreadEmails } from "../../api/apiService/googleunnread.service";

interface Message {
  name: string;
  message: string;
  date?: Date;
}

const UnreadMessages = () => {
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get auth tokens from Redux store
  const auth = useSelector((state: any) => state.auth);
  const { googleAccessToken } = auth || {};

  // Determine whether to use dummy data based on environment
  const useDummyData = String(process.env.NEXT_PUBLIC_USE_DUMMY_DATA || "false").trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // If Google access token is available, try to fetch real emails
        if (googleAccessToken) {
          try {
            const googleUnreadEmails = await fetchGoogleUnreadEmails(googleAccessToken);

            console.log("googleUnreadEmails",googleUnreadEmails);
            
            if (googleUnreadEmails.length > 0) {
              setUnreadMessages(googleUnreadEmails);
              setIsLoading(false);
              return;
            }
          } catch (googleError) {
            console.error("Error fetching Google unread emails:", googleError);
            // Fall back to dummy data if Google fetch fails
          }
        }

        // Fallback to local JSON data
        const messagesData = dashboardUnreadMessagesJson();
        setUnreadMessages(messagesData ?? []);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
        setError("Failed to load messages");
        setUnreadMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [googleAccessToken, useDummyData]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-custom min-h-[330px]">
        <div className="flex justify-between items-center mb-4 relative">
          <div className="font-semibold text-bg-blue-12 text-lg md:text-xl">
            Unread Messages
          </div>
          
          {unreadMessages.length > 0 && (
            <div className="unread_icon">{unreadMessages.length}</div>
          )}
        </div>

        <div className="scrollbar-custom overflow-y-auto max-h-[230px]">
          {unreadMessages.length > 0 ? (
            unreadMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 mr-4 ${
                  index !== unreadMessages.length - 1 ? "border-b border-content-border" : ""
                }`}
              >
                <div className="flex-1 min-w-0 mx-3 mt-4">
                  <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
                    {msg.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {msg.message}
                  </p>
                </div>
                <button>
                  <img src="arrow.svg" alt="Arrow" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No unread messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnreadMessages;