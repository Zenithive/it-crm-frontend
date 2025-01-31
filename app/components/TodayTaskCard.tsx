"use client";
import { useState } from "react";
import Card from "../microComponents/Card";

export default function TodayTaskCard() {
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const handleCheckboxChange = (index: number) => (event: any) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <>
      <Card logo={"tabler_checkbox.svg"} task={"Today’s Task"} lastText={"5 remaining"}>
        <div className="flex gap-[18px] flex-col">
       
          <div className="flex gap-[22px] pt-[20px] px-[10px] ">
            <div className="">
              <input
                type="checkbox"
                checked={checkedItems[0]}
                onChange={handleCheckboxChange(0)}
                className="w-[19px] h-[17px] mt-2 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="">
              <div className="flex flex-col text-[16px]">
                <span style={{ color: "#333333" }}>Follow up with Client ABC</span>
                <span style={{ color: "#6B7280" }}>Due in 2 hours</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 px-[10px] ">
            <div className="">
              <input
                type="checkbox"
                checked={checkedItems[1]}
                onChange={handleCheckboxChange(1)}
                className="w-[19px] h-[17px] mt-2 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="">
              <div className="flex flex-col text-[16px]">
                <span style={{ color: "#333333" }}>Follow up with Client ABC</span>
                <span style={{ color: "#6B7280" }}>Due in 2 hours</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 px-[10px] ">
            <div className="">
              <input
                type="checkbox"
                checked={checkedItems[2]}
                onChange={handleCheckboxChange(2)}
                className="w-[19px] h-[17px] mt-2 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="">
              <div className="flex flex-col text-[16px]">
                <span style={{ color: "#333333" }}>Follow up with Client ABC</span>
                <span style={{ color: "#6B7280" }}>Due in 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
