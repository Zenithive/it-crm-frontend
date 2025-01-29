import React from "react";
import Content from "../microComponents/Content";

const UnreadMessages = () => {
  const unread_messages = [
    {
      profileImage: "profileLogo.svg",
      name: "Sachin Tend",
      message: "Hello, I wanted to follow up ...",
    },
    {
      profileImage: "profileLogo.svg",
      name: "Sachin Tend",
      message: "Hello, I wanted to follow up ...",
    },
    {
      profileImage: "profileLogo.svg",
      name: "Sachin Tend",
      message: "Hello, I wanted to follow up ...",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#F6F5FF] border border-bg-blue-11 rounded-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src="icon_2.svg" alt="Unread Messages" className="w-6 h-6" />
              <span className="text-sm sm:text-base">Unread Messages</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-bg-red flex items-center justify-center">
              <span className="text-text-red text-xs">12</span>
            </div>
          </div>

          <div className="divide-y divide-bg-blue-11">
            {unread_messages.map((profile, index) => (
              <div key={index} className="py-4">
                <Content
                  profileImage={profile.profileImage}
                  name={profile.name}
                  designation={profile.message}
                  nameStyle="text-sm sm:text-base"
                  otherStyle="text-xs sm:text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UnreadMessages;
