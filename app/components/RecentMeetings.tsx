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
    <div className="">
      <div className="flex">
        <div
          className="w-[420px] h-[297px] border border-bg-blue-11 rounded-lg relative"
          style={{ backgroundColor: "#F6F5FF" }}
        >
          <div className="mt-[10px] ml-[10px]">
          <div className="flex mb-[17px]">
            <div className="">
              <img src="icon_1.svg" alt="Recent Meetings"></img>
            </div>
            <div className="ml-2">Recent Meetings</div>
          </div>
        </div>
          <hr className="w-[420px]  border-bg-blue-11"></hr>
          <div className=" ml-[10px]">
          {recent_meetings.map((profile, index) => (
            <div key={index}>
              <div className="flex ">
                <div className="pt-[18px] ">
                  <Content
                    profileImage={profile.profileImage}
                    name={profile.name}
                    designation={profile.time}
                    nameStyle="text-[16px]"
                    otherStyle="text-[14px]"
                  />  
                </div>
                <div className="justify-end items-center flex w-[220px] mt-3">
                  <div className="text-bg-blue-11 text-[14px]">View Notes</div>
                </div>
              </div>
              <div>
              {index < recent_meetings.length - 1 && (
                  <hr className="w-[399px] mt-[10px] border-bg-blue-11"></hr>
                )}
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
