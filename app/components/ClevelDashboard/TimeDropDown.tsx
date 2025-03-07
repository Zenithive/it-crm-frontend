import { useState } from "react";

const TimeDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Month");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Day", "Week", "Month", "Year"];

  return (
    <div className="relative bg-white shadow-custom rounded-2xl mr-8 cursor-pointer z-50">
      <div className="p-3 flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <span className="ml-3 text-gray-text-color">{selectedOption}</span>
        <img src="dropdown_black.svg" alt="Dropdown" className="ml-8" />
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-white shadow-custom rounded-lg z-50">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer text-gray-text-color"
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;
