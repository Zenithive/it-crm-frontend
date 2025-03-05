"use client";
import React, { JSX } from "react";

interface Channel {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface SidebarProps {
  channels: Channel[];
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ channels, activeChannel, setActiveChannel }) => {
  return (
    <div className="w-4/12 border-r border-gray-200 flex flex-col">
      <div className="py-5 px-10">
        <div className="bg-bg-blue-12 text-white rounded-md py-2 px-6 mb-2">
          <span>Unread</span>
        </div>
        <div className="bg-white text-bg-blue-12 rounded-md shadow-custom mt-4 py-2 px-6">
          <span>All</span>
        </div>
      </div>
      <div className="border-t border-content-border mx-8 my-4"></div>
      <div className="p-2">
        <h3 className="text-indigo-500 text-lg font-bold px-8 py-2">Channels</h3>
        <div className="space-y-2 max-w-[280px] mx-auto">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeChannel === channel.name ? "bg-indigo-50 text-indigo-500" : "text-gray-700"
              }`}
              onClick={() => setActiveChannel(channel.name)}
            >
              {channel.icon}
              <span className="ml-2">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
