import Navbar from "./Navbar";
'use client';
import { useState } from "react";
import Card from "../microComponents/Card";
import LeftCardDetails from "./LeftCardDetails";
import RecentMeetings from "./RecentMeetings";
import UnreadMessages from "./UnreadMessages";
import FollowUps from "./FollowUps";

export default function DashboardPage() {
    const [isChecked, setIsChecked] = useState(false);


    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

  return (
    <>
      <Navbar></Navbar>

      <LeftCardDetails />
      <div className="flex">
        <div className="">
          <RecentMeetings></RecentMeetings>
        </div>
        <div className="">
          <UnreadMessages></UnreadMessages>
        </div>
        <div className="">
          <FollowUps></FollowUps>
        </div>
      </div>
    
 


   
   

  
   <div className="flex  gap-[20px]">
   <LeftCardDetails/>
   <div className="cards flex gap-[20px] ">

    <Card  logo={'tabler_checkbox.svg'}
                            task={'Today’s Task'}
                            lastText={'5 remaining'} >

<div className="flex gap-[18px] flex-col">
             <div className="flex gap-[22px] pt-[20px]  px-[10px] ">
                 <div className="">
                   <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="w-[19px] h-[17px] mt-2 text-blue-600 border-gray-300   focus:ring-blue-500 "
                    />
                </div>
                <div className="">
                <div className="flex flex-col text-[16px]">
                    <span style={{ color: '#333333' }}>Follow up with Client ABC</span>
                    <span style={{ color: '#6B7280' }}>Due in 2 hours</span>
                </div>
                </div>
            </div>
            <div className="flex gap-4   px-[10px] ">
                <div className="">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="w-[19px] h-[17px] mt-2 text-blue-600 border-gray-300  focus:ring-blue-500 "
                    />
                </div>
                <div className="">
                <div className="flex flex-col text-[16px]">
                    <span style={{ color: '#333333' }}>Follow up with Client ABC</span>
                    <span style={{ color: '#6B7280' }}>Due in 2 hours</span>
                </div>
                </div>
            </div>
            <div className="flex gap-4  px-[10px] ">
                <div className="">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="w-[19px] h-[17px] mt-2 text-blue-600 border-gray-300  focus:ring-blue-500 "
                    />
                </div>
                <div className="">
                <div className="flex flex-col text-[16px]">
                    <span style={{ color: '#333333' }}>Follow up with Client ABC</span>
                    <span style={{ color: '#6B7280' }}>Due in 2 hours</span>
                </div>
                </div>
            </div>
            </div>
                                </Card>
<Card logo={'video.svg'}
                            task={'Today’s Meetings'}
                            lastText={'View All'} 
                            lastTextColor="text-bg-blue-11">

<div className="flex gap-[18px] flex-col">
             <div className="flex gap-4 pt-[20px] px-[10px] ">
                 
                   <img src='Frame 423.svg'></img>
            
                <div className="">
                <div className="flex flex-col ">
                    <span style={{ color: '#333333' }} className="text-[14px] font-normal">Product Demo - XYZ Corp</span>
                    <span style={{ color: '#6B7280' }} className="text-[10px]">2:00 PM - 3:00 PM</span>
                </div>
                </div>
                <div className="flex justify-between items-center">
                    <button className=" w-[38px] h-[21px] bg-bg-blue-11 text-[10px] text-center rounded-md text-white">join</button>
                </div>
            </div>
           

            <div className="flex gap-4 px-[10px] ">
                 
                   <img src='Frame 423.svg'></img>
            
                <div className="">
                <div className="flex flex-col ">
                    <span style={{ color: '#333333' }} className="text-[14px] font-normal">Product Demo - XYZ Corp</span>
                    <span style={{ color: '#6B7280' }} className="text-[10px]">2:00 PM - 3:00 PM</span>
                </div>
                </div>
                <div className="flex justify-between items-center">
                    <button className=" w-[38px] h-[21px] bg-bg-blue-11 text-[10px] text-center rounded-md text-white">join</button>
                </div>
            </div>

            <div className="flex gap-4  px-[10px] ">
                 
                 <img src='Frame 423.svg'></img>
          
              <div className="">
              <div className="flex flex-col ">
                  <span style={{ color: '#333333' }} className="text-[14px] font-normal">Product Demo - XYZ Corp</span>
                  <span style={{ color: '#6B7280' }} className="text-[10px]">2:00 PM - 3:00 PM</span>
              </div>
              </div>
              <div className="flex justify-between items-center">
                  <button className=" w-[38px] h-[21px] bg-bg-blue-11 text-[10px] text-center rounded-md text-white">join</button>
              </div>
          </div>
            </div> 

                            </Card>

                            <Card logo={'cl.svg'} task={'Time'}
                            lastText={''}>

<div className="flex gap-[25px] flex-col">
             <div className="flex justify-between pt-[20px]  px-[11px] ">
                <div className="text-[16px" style={{color:'#6A6A6A'}}>New York</div> 
                <div className="text-[12px] text-black">12:00 PM</div>
                
            </div>
            <div className="flex justify-between   px-[11px] ">
                <div className="text-[16px" style={{color:'#6A6A6A'}}>London</div> 
                <div className="text-[12px] text-black">12:00 PM</div>
                
            </div>
            <div className="flex justify-between   px-[11px] ">
                <div className="text-[16px" style={{color:'#6A6A6A'}}>Tokyo</div> 
                <div className="text-[12px] text-black">12:00 PM</div>
                
            </div>
         
            </div>

                            </Card>
                            </div>
   </div>
   
                       

    </>)
}