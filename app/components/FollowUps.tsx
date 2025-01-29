
import React from "react";
import Content from "../microComponents/Content";

const FollowUps = () => {
  const followups = [
    {
      name: "XYZ Corp Deal Discussion",
      message: "Due in 2 hours",
    },
    {
      name: "XYZ Corp Deal Discussion",
      message: "Due in 2 hours",
    },
    {
      name: "XYZ Corp Deal Discussion",
      message: "Due in 2 hours",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#F6F5FF] border border-bg-blue-11 rounded-lg">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <img src="icon_3.svg" alt="Follow-ups" className="w-6 h-6" />
            <span className="text-sm sm:text-base">Follow-ups</span>
          </div>

          <div className="space-y-6">
            {followups.map((profile, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-bg-blue-12 flex-shrink-0" />
                <Content
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

export default FollowUps;
