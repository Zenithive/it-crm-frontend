


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'; 

interface OptionType {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  selectData?: string;
  setSelectData?: (value: string) => void;
  showRangeDropdown?: boolean;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  startDateOptions?: OptionType[];
  endDateOptions?: OptionType[];
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectData,
  setSelectData,
  startDate,
  showRangeDropdown = true,
  setStartDate,
  endDate,
  setEndDate,
  startDateOptions,
  endDateOptions,
  className
}) => {
  // Local state to manage calendar visibility
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  // Default options if not provided
  const defaultRangeOptions: OptionType[] = [
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "Last 90 Days", label: "Last 90 Days" },
    { value: "Custom", label: "Custom" }
  ];

  const defaultStartOptions: OptionType[] = [
    { value: "2025-03-01", label: "Mar 1, 2025" },
    { value: "2025-03-10", label: "Mar 10, 2025" },
    { value: "2025-03-15", label: "Mar 15, 2025" }
  ];

  const defaultEndOptions: OptionType[] = [
    { value: "2025-03-15", label: "Mar 15, 2025" },
    { value: "2025-03-20", label: "Mar 20, 2025" },
    { value: "2025-03-31", label: "Mar 31, 2025" }
  ];

  // Use provided options or defaults
  const rangeOptions = defaultRangeOptions;
  const startOptions = startDateOptions || defaultStartOptions;
  const endOptions = endDateOptions || defaultEndOptions;

  

  const handleSelectStartDate = (date: Date) => {
    const localDate = dayjs(date).startOf('day'); // Ensure date is at the start of the day
    setStartDate(localDate.format('YYYY-MM-DD')); // Format as 'YYYY-MM-DD'
    setShowStartCalendar(false);
  };

  // Handle selecting end date
  const handleSelectEndDate = (date: Date) => {
    const localDate = dayjs(date).startOf('day'); // Ensure date is at the start of the day
    setEndDate(localDate.format('YYYY-MM-DD')); // Format as 'YYYY-MM-DD'
    setShowEndCalendar(false);
  };

  
  return (
    <div className={`flex flex-col gap-4 max-w-lg mx-auto ${className || ''}`}>
      {showRangeDropdown && selectData !== undefined && setSelectData && (
        <div className="relative">
          <select
            value={selectData}
            onChange={(e) => setSelectData(e.target.value)}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
          >
            {rangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <img src="dropdownFilter.svg" className="text-indigo-600" />
          </div>
        </div>
      )}

      {/* Start Date and End Date section */}
      <div className="flex items-center gap-2">
        {/* Start Date input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={startDate}
            onFocus={() => setShowStartCalendar(true)} // Show calendar when the input is focused
            onChange={() => {}}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
            placeholder="Start Date"
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <img src="dropdownFilter.svg" className="text-indigo-600 cursor-pointer" />
          </div>
        </div>

        {/* Rotate icon in the middle */}
        <div className="flex items-center justify-center">
          <img src="swap.svg" className="h-5 w-5 text-white" />
        </div>

        {/* End Date input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={endDate}
            onFocus={() => setShowEndCalendar(true)} // Show calendar when the input is focused
            onChange={() => {}}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
            placeholder="End Date"
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <img src="dropdownFilter.svg" className="text-indigo-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Show calendar when the input is focused */}
      {showStartCalendar && (
        <div className="absolute z-10 mt-2 p-4 bg-white rounded-xl shadow-lg ">
          <Calendar
            onChange={handleSelectStartDate}
            value={startDate ? new Date(startDate) : new Date()}
            className="w-56 text-sm " 
          />
        </div>
      )}

      {showEndCalendar && (
        <div className="absolute z-10 mt-2 p-4 bg-white rounded-xl shadow-lg">
          <Calendar
            onChange={handleSelectEndDate}
            className="w-56 text-sm " 
           
          />
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
