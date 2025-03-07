"use client";
import React from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  receiver: string;
  attachment?: { name: string; size: string };
}

interface MessageThreadProps {
  activeConversation: string;
  messages: Message[];
}

const Message: React.FC<MessageThreadProps> = ({ activeConversation, messages }) => {
  return (
    <div className="w-7/12 flex flex-col">
    {/* Conversation Header */}
    <div className="px-4 mt-4">
      <h2 className="font-medium">{activeConversation}</h2>
    </div>

    {/* Message Thread */}
    <div className="flex-1 p-4 overflow-y-auto scrollbar-custom mr-2">
      {messages.map(message => (
          <div key={message.id} className="mb-6">
            <div className="font-medium mb-3">{message.sender}</div>
          <div className="flex items-start">
            <div className="flex-1">
              <p className="mb-2 bg-bg-blue-15 p-2 rounded-xl inline-block">{message.content}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="font-medium">{message.receiver}</div>
          </div>
          {message.attachment && (
            <div className="flex mt-2 justify-end">
              <div className="rounded-md max-w-xs p-1 flex items-center border-bg-blue-12 border">
                <div className="ml-2 mr-3 text-indigo-500">
                  <img src='pdf_icon.svg' alt='Doc'></img>
                </div>
                <div>
                  <div className="text-indigo-500 text-sm">{message.attachment.name}</div>
                  <div className="text-gray-500 text-xs">{message.attachment.size}</div>
                </div>
                <div className="mx-2 text-indigo-500">
                <img src='download_icon.svg' alt='Download'></img>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Message;
