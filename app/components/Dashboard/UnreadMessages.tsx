import React from "react";
import Content from "../../microComponents/Content";
import {unread_messages} from "../Path/TaskData";
// import {ChevronDown} from 'lucide-react'

const UnreadMessages = () => {
  return (
    <div className="w-full"  data-testid="unread-messages-section">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="font-semibold text-bg-blue-12 text-lg md:text-xl">
            Unread Messages
          </h3>
          {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
        </div>
        <div className="space-y-4">
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
              {/* <ChevronDown className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default UnreadMessages;
