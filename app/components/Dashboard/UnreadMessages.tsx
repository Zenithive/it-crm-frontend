import React from "react";
import Content from "../../microComponents/Content";
import { unread_messages } from "../Path/TaskData";
import { ChevronDown } from "lucide-react";

const UnreadMessages = () => {
  return (
    <div className="w-full relative" data-testid="unread-messages-section">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 md:mb-6 relative">
          <div className="font-semibold text-bg-blue-12 text-lg md:text-xl">
            Unread Messages
          </div>

          {unread_messages.length > 0 && (
            <div className="bg-blue_shadow text-bg-blue-12 text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {unread_messages.length}
            </div>
          )}
        </div>

        <div className="space-y-4 max-h-[220px] overflow-y-auto  ">
          {unread_messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center justify-between pb-4 ${
                index !== unread_messages.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <img
                src="image.svg"
                alt={msg.name}
                className="w-8 h-8 md:w-10 md:h-10 mt-1 flex-shrink-0"
              />
              <div className="flex-1 min-w-0 mx-3">
                <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
                  {msg.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-500 truncate">
                  {msg.message}
                </p>
              </div>
              <img src="arrow.svg" alt="Arrow"></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnreadMessages;
