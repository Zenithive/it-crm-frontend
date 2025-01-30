
import React from "react";
import Content from "../../microComponents/Content";

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
    <div className="">
      <div className="flex">
        <div
          className="w-[254px] h-[297px] border border-bg-blue-11 rounded-lg relative"
          style={{ backgroundColor: "#F6F5FF" }}
        >
          <div className="">
            <div className="flex mt-3 ml-[10px]">
              <div className="">
                <img src="icon_3.svg" alt="Unread Messages"></img>
              </div>
              <div className="ml-2">Follow-ups</div>
            </div>
            <hr className="w-[254px] mt-[10px]  border-bg-blue-11"></hr>

            {followups.map((profile, index) => (
              <div key={index}>
                <div className="flex items-center">
                  {/* Apply the dynamic color */}
                  <div
                    className={`w-3 h-3 rounded-full mt-3 bg-bg-blue-12 ml-[23px]`}
                  ></div>
                  <div className="pt-[30px] ml-[14px]">
                    <Content
                      name={profile.name}
                      designation={profile.message}
                      nameStyle="text-[16px]"
                      otherStyle="text-[14px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUps;
