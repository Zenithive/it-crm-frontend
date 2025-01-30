import React from "react";
import Content from "../../microComponents/Content";
import {unread_messages} from "../Path/TaskData";
import {ChevronDown} from 'lucide-react'

  const UnreadMessages = ()=>{
    return (
      <div className="">
        <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-gray-800">Unread Messages</h3>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-4">
                {unread_messages.map((msg, index) => (
                  <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                    <img
                      src="image.svg"
                      alt={msg.name}
                      className="w-10 h-10 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{msg.name}</h4>
                      <p className="text-sm text-gray-500">{msg.message}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
      </div>
    );
  };


export default UnreadMessages;
