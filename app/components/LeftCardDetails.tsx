<<<<<<< HEAD

import Data1 from "../microComponents/Content";

=======
import Box from "../microComponents/Box";
import Card from "../microComponents/Card";
import Content from "../microComponents/Content";
// import Profile from "../microComponents/Profile";
>>>>>>> a79f9dff93ec3b874dcab66990b2ef7f42b6f726

export default function LeftCardDetails() {

    const profiles = [
        { profileImage: 'profileLogo.svg',name: 'John Doe', designation: 'Marketing Head'},
        { profileImage: 'profileLogo.svg', name: 'John Doe', designation: 'Marketing Head' },
        { profileImage: 'profileLogo.svg', name: 'Jane Smith', designation: 'HR Manager' },
        { profileImage: 'profileLogo.svg', name: 'Emily Davis', designation: 'Developer' },
    ];
    return (<>  <div className="grid grid-cols-2">
        <div className="w-[309px] h-[737px] border border-bg-blue-11 rounded-lg left-[71px] top-[201px] relative " style={{ backgroundColor: "#F6F5FF" }}>

            {profiles.map((profile, index) => (
                <div key={index}>
                    <div className="pt-[17px] ml-[34px]"> <Content  profileImage={profile.profileImage}
                        name={profile.name}
                        designation={profile.designation} /></div>
                    <div ><hr className=" w-[285px] mx-[12px] mt-[24.5px] border-bg-blue-11 "></hr></div></div>))}
        </div>

        </div>

         

    </>)
}