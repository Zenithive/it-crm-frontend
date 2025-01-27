import React from "react";
import Content from "../microComponents/Content";

const UnreadMessages = () => {
  const unread_messsages = [
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
    <div className="">
      <div className="flex">
        <div
          className="w-[254px] h-[297px] border border-bg-blue-11 rounded-lg   relative"
          style={{ backgroundColor: "#F6F5FF" }}
        >
          <div className="">
            <div className="flex mt-3 ml-[10px]">
              <div className="">
                <img src="icon_2.svg" alt="Unread Messages"></img>
              </div>
              <div className="ml-2">Unread Messages</div>
              <div className="w-6 h-6 rounded-full bg-bg-red flex items-center justify-center ml-[55px]" style={{ width: "24px", height: "24px" }}>
                    <div className="text-text-red">12</div>
              </div>
            </div>
            <hr className="w-[254px] mt-[10px] border-bg-blue-11"></hr>

            {unread_messsages.map((profile, index) => (
              <div key={index}>
                <div className="flex ">
                  <div className="pt-[30px] ml-[10px]">
                    <Content
                      profileImage={profile.profileImage}
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

export default UnreadMessages;
