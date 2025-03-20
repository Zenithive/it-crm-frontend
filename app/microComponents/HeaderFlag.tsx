import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { IN, US, GB, AU, JP, CA, DE, FR, BR, CN, ZA, RU } from "country-flag-icons/react/3x2";

const HeaderFlag = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility
  const [selectedFlag, setSelectedFlag] = useState("in"); // Default selected flag (India country code)
  const [selectedZone, setSelectedZone] = useState("Asia/Kolkata"); // Default time zone (India)
  const [currentTime, setCurrentTime] = useState(""); // State for current time

  // Array of flag options with time zones and country codes
  const flagOptions = [
    { id: "india", code: "in", component: IN, label: "India", zone: "Asia/Kolkata" },
    { id: "usa", code: "us", component: US, label: "USA", zone: "America/New_York" },
    { id: "uk", code: "gb", component: GB, label: "UK", zone: "Europe/London" },
    { id: "australia", code: "au", component: AU, label: "Australia", zone: "Australia/Sydney" },
    { id: "japan", code: "jp", component: JP, label: "Japan", zone: "Asia/Tokyo" },
    { id: "canada", code: "ca", component: CA, label: "Canada", zone: "America/Toronto" },
    { id: "germany", code: "de", component: DE, label: "Germany", zone: "Europe/Berlin" },
    { id: "france", code: "fr", component: FR, label: "France", zone: "Europe/Paris" },
    { id: "brazil", code: "br", component: BR, label: "Brazil", zone: "America/Sao_Paulo" },
    { id: "china", code: "cn", component: CN, label: "China", zone: "Asia/Shanghai" },
    { id: "south_africa", code: "za", component: ZA, label: "South Africa", zone: "Africa/Johannesburg" },
    { id: "russia", code: "ru", component: RU, label: "Russia", zone: "Europe/Moscow" },
  ];

  // Update time based on selected time zone
  useEffect(() => {
    const updateTime = () => {
      const time = moment().tz(selectedZone).format("hh:mm A"); // 12-hour format with AM/PM
      setCurrentTime(time);
    };
    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedZone]);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle flag and time zone selection
  const handleFlagSelect = (code: string, zone: string) => {
    setSelectedFlag(code);
    setSelectedZone(zone);
    setIsOpen(false); // Close dropdown after selection
  };

  // Find the selected flag component
  const SelectedFlagComponent = flagOptions.find((flag) => flag.code === selectedFlag)?.component;

  return (
    <div>
      <div className="bg-white flex p-4 rounded-xl h-12 space-x-4 shadow-custom relative">
        <button className="flex items-center" onClick={toggleDropdown}>
          {/* Selected Flag */}
          {SelectedFlagComponent && <SelectedFlagComponent className="mr-1 h-10 w-10" />}

          {/* Dropdown Toggle Button */}
          <img
            src="/vector(1).svg"
            alt="dropdown"
            className="h-4 w-4 text-gray-500 ml-3"
          />

          {/* Divider */}
          <div className="h-6 w-px bg-bg-blue-11 ml-3"></div>
        </button>

        {/* Time Display */}
        <div className="text-gray-600 flex justify-center items-center">
          {currentTime}
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
       <div className="absolute top-[50px] left-0 bg-white rounded-lg shadow-lg py-2 px-2 w-44 z-10">
            <div className="max-h-[200px] overflow-y-auto scroll  scrollbar-custom ">
            {flagOptions.map((flag) => (
              <div
                key={flag.id}
                onClick={() => handleFlagSelect(flag.code, flag.zone)}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded pr-4"
              >
                <flag.component className="h-8 w-8 mr-2" />
                <span className="text-sm text-gray-700">{flag.label}</span>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderFlag;