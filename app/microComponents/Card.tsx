'use client';
import { useState } from "react";

export default function Card(){
    const [isChecked, setIsChecked] = useState(false);

    
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    return(<>
    
    <div className="w-[310px] h-[260px] border border-bg-blue-11 rounded-lg">

        <div> <img src='tabler_checkbox.svg' style={{width:'24px',height:'24px'}}></img> <span className="text-[16px] font-normal">Today’s Task</span><span className="text-[14px] font-normal" style={{color:'#6B7280'}}>5 remaining</span></div>
        <hr className=" w-[285px] mx-[12px] mt-[24.5px] border-bg-blue-11 "></hr>
        <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        /><div className="flex flex-col text-[16px]">
            <span  style={{color:'#333333'}}>Follow up with Client ABC</span>
            <span style={{color:'#6B7280'}}>Due in 2 hours</span>
        </div>
        </div>
        <div></div>
        <div></div>
    </div>
    </>);
}