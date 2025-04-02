"use client";
import { useState, useEffect } from "react";

type TimeFilterType = 'today' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'half-yearly';

interface TimeDropDownProps {
  onChange: (filter: TimeFilterType) => void;
  currentFilter: TimeFilterType;
}


const TimeDropdown: React.FC<TimeDropDownProps>  = ({ onChange, currentFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Map display names to filter values used by the API
  const options = [
    {display:"Today",value:"today"},
    {display:"Weekly",value:"weekly"},
    { display: "Monthly", value: "monthly" },
    { display: "Yearly", value: "yearly" }
  ];
  
  // Find the currently selected option for display
  const getSelectedDisplay = () => {
    const selected = options.find(opt => opt.value === currentFilter);
    return selected ? selected.display : "Yearly"; // Default display
  };

  return (
    <div className="relative bg-white shadow-custom rounded-xl mr-8 cursor-pointer z-50">
      <div className="p-3 flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <span className="ml-3 text-gray-text-color">{getSelectedDisplay()}</span>
        <img src="/dropdown_black.svg" alt="Dropdown" className="ml-8" />
      </div>
      
      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-white shadow-custom rounded-lg z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-gray-200 cursor-pointer text-gray-text-color"
              onClick={() => {
                onChange(option.value as TimeFilterType);
                setIsOpen(false);
              }}
            >
              {option.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;