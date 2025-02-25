import React, { useState, useEffect } from "react";
import { dashboardUnreadMessagesApi } from "../../api/apiService/dashboardApiService";
import { dashboardUnreadMessagesJson } from "../../api/jsonService/dashboardJsonService";

const UnreadMessages = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);

  const useDummyData = String(process.env.NEXT_PUBLIC_USE_DUMMY_DATA || "false").trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesData = useDummyData
          ? await dashboardUnreadMessagesApi()
          : dashboardUnreadMessagesJson();

          setUnreadMessages(useDummyData ? messagesData?.messages ?? [] : messagesData ?? []);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchData();
  }, [useDummyData]);

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-custom">
        <div className="flex justify-between items-center mb-4 relative">
          <div className="font-semibold text-bg-blue-12 text-lg md:text-xl">
            Unread Messages
          </div>

          {unreadMessages.length > 0 && (
            <div className="unread_icon">{unreadMessages.length}</div>
          )}
        </div>

        <div className="scrollbar-custom overflow-y-auto max-h-[200px]">
          {unreadMessages.length > 0 ? (
            unreadMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 mr-4 ${
                  index !== unreadMessages.length - 1 ? "border-b border-bg-blue-12-[1px]" : ""
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
