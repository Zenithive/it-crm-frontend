
import Data1 from "../microComponents/Content";

import Box from "../microComponents/Box";
import Card from "../microComponents/Card";
import Content from "../microComponents/Content";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
// import Profile from "../microComponents/Profile";

export default function LeftCardDetails() {



    const router = useRouter();

    const profiles = [
      { profileImage: 'profileLogo.svg', name: 'John Doe', designation: 'Marketing Head' },
      { profileImage: 'profileLogo.svg', name: 'John Doe', designation: 'Marketing Head' },
      { profileImage: 'profileLogo.svg', name: 'Jane Smith', designation: 'HR Manager' },
      { profileImage: 'profileLogo.svg', name: 'Emily Davis', designation: 'Developer' },
    ];



    const handleNextClick = () => {
        
        router.push('/contact');
      };
 
  
    return (
      <div className="w-full">
        <div className="w-full bg-[#F6F5FF] border border-bg-blue-11 rounded-lg">
          <div className="divide-y divide-bg-blue-11">
            {profiles.map((profile, index) => (
              <div key={index} className="p-4 sm:p-6" onClick={handleNextClick}>
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