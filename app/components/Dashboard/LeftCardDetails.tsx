
import Data1 from "../../microComponents/Content";

import Box from "../../microComponents/Box";
import Card from "../../microComponents/Card";
import Content from "../../microComponents/Content";
import {profiles} from "../Path/TaskData";
// import Profile from "../microComponents/Profile";

export default function LeftCardDetails() {
    
  
    return (
      <div className="w-full max-w-[309px] md:max-w-[750px] lg:max-w-[309px]">
        <div className="w-full bg-[#F6F5FF] border border-bg-blue-11 rounded-lg">
          <div className="divide-y divide-bg-blue-11">
            {profiles.map((profile, index) => (
              <div key={index} className="p-4 sm:p-6">
                <Content
                  profileImage={profile.profileImage}
                  name={profile.name}
                  designation={profile.designation}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }