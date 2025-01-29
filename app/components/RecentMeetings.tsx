import React from "react";
import Content from "../microComponents/Content";

const RecentMeetings = () => {
  const recent_meetings = [
    {
      profileImage: "profileLogo.svg",
      name: "Client Meeting",
      time: "Yesterday, 3:00 PM",
    },
    {
      profileImage: "profileLogo.svg",
      name: "Client Meeting",
      time: "Yesterday, 3:00 PM",
    },
    {
      profileImage: "profileLogo.svg",
      name: "Client Meeting",
      time: "Yesterday, 3:00 PM",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#F6F5FF] border border-bg-blue-11 rounded-lg">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <img src="icon_1.svg" alt="Recent Meetings" className="w-6 h-6" />
            <span className="text-sm sm:text-base">Recent Meetings</span>
          </div>
          
          <div className="divide-y divide-bg-blue-11">
            {recent_meetings.map((profile, index) => (
              <div key={index} className="py-4">
                <div className="flex items-center justify-between">
                  <Content
                    profileImage={profile.profileImage}
                    name={profile.name}
                    designation={profile.time}
                    nameStyle="text-sm sm:text-base"
                    otherStyle="text-xs sm:text-sm"
                  />
                  <button className="hidden sm:block text-bg-blue-11 text-sm hover:underline">
                    View Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentMeetings;
