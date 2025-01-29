'use client';
import { useState } from "react";


interface Data {
    logo: string;
    task: string;
    lastText: string;
    children?: React.ReactNode;
    lastTextColor?: string;
   
}
export default function Card({ logo, task,lastText,children,lastTextColor }:Data) {
    return (
      <div className="w-[310px] h-[260px] border border-bg-blue-11 rounded-lg" style={{ backgroundColor: "#F6F5FF" }}>
        <div className="flex px-[10px] justify-between pt-[8px]">
          <div className="flex gap-2 justify-center items-center">
            <img
              src={logo}
              style={{ width: "24px", height: "24px" }}
            />
            <span className="text-[16px] font-normal">{task}</span>
          </div>
          <span className={`text-[14px] font-normal  ${lastTextColor ? lastTextColor : 'text-bg-gray-13'}`} > 
            {lastText} 
          </span>
        </div>
        <hr className="w-full mt-[11.96px] border-bg-blue-11" />
        {children}
      </div>
    );
  }
