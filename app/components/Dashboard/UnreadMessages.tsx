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
  const [needsGoogleLogin, setNeedsGoogleLogin] = useState(false);

  // Get auth tokens from Redux store
  const auth = useSelector((state: any) => state.auth);
  const { googleAccessToken, isLoggedIn } = auth || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Check if user is logged in but no Google token is available
        if (isLoggedIn && !googleAccessToken) {
          setNeedsGoogleLogin(true);
          setIsLoading(false);
          return;
        }

        // If Google access token is available, try to fetch real emails
        if (googleAccessToken) {
          try {
            const googleUnreadEmails = await fetchGoogleUnreadEmails(googleAccessToken);
            
            console.log("googleUnreadEmails", googleUnreadEmails);
            
            if (googleUnreadEmails.length > 0) {
              setUnreadMessages(googleUnreadEmails);
              setIsLoading(false);
              return;
            }
          } catch (googleError) {
            console.error("Error fetching Google unread emails:", googleError);
          }
        } else {
          // No Google token available, set needsGoogleLogin flag
          setNeedsGoogleLogin(true);
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
  }, [googleAccessToken, isLoggedIn]);

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Redirect to Google authentication endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Check if user needs to login with Google
  if (needsGoogleLogin) {
    return (
      <div className="w-full relative">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-custom min-h-[330px]">
          <div className="flex justify-between items-center mb-4 relative">
            <div className="font-semibold text-bg-blue-12 text-lg md:text-xl">
              Unread Messages
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-48 p-6 text-center">
            <p className="text-gray-700 mb-4">Please login with your Google email to sync your emails from Google.</p>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center gap-3 p-2 px-4 border border-bg-blue-12 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <img src="/google.svg" className="w-5 h-5" alt="Google" />
              <span className="text-bg-blue-12 font-medium">
                Login with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    );
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