








import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'; 

interface OptionType {
  value: string;
  label: string;
}
type CalendarValue = Date | Date[] | null;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
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
  pageType?:string
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
  className,
  pageType='other'
}) => {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  // Default options with dynamic date calculation
  const defaultRangeOptions: OptionType[] = [
    { value: "", label: "Select Range" },
    { value: "Today", label: "Today" },
   
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "Last 15 Days", label: "Last 15 Days" },
    { value: "Last 30 Days", label: "Last 30 Days" },
  
  ];

  // Function to calculate dates based on selected range
  const calculateDateRange = (range: string) => {
    // Skip calculation for todo page type
    if (pageType === 'todo') return;

    const today = dayjs();
    let startDateCalc, endDateCalc;

    switch (range) {
      case "Today":
        startDateCalc = today;
        endDateCalc = today;
        break;

        
      case "Last 7 Days":
        startDateCalc = today.subtract(7, 'day');
        endDateCalc = today;
        break;
      case "Last 15 Days":
        startDateCalc = today.subtract(15, 'day');
        endDateCalc = today;
        break;
      case "Last 30 Days":
        startDateCalc = today.subtract(30, 'day');
        endDateCalc = today;
        break;
      default:
        return;
    }

    // Update start and end dates
    setStartDate(startDateCalc.format('YYYY-MM-DD'));
    setEndDate(endDateCalc.format('YYYY-MM-DD'));
  };

  // Effect to handle range selection
  useEffect(() => {
    if (selectData && selectData !== "Custom" && pageType !== 'todo') {
      calculateDateRange(selectData);
    }
  }, [selectData, pageType]);

  const handleSelectStartDate = (value: Value) => {
    if (value instanceof Date) {
      const localDate = dayjs(value).startOf('day');
      setStartDate(localDate.format('YYYY-MM-DD'));
      
      // If end date is before start date, update end date
      if (dayjs(endDate).isBefore(localDate)) {
        setEndDate(localDate.format('YYYY-MM-DD'));
      }
      
      // Change dropdown to Custom when manually selecting
      if (setSelectData) {
        setSelectData("Custom");
      }
    }
    setShowStartCalendar(false);
  };
  
  const handleSelectEndDate = (value: Value) => {
    if (value instanceof Date) {
      const localDate = dayjs(value).startOf('day');
      
      // Ensure end date is not before start date
      const effectiveEndDate = dayjs(startDate).isAfter(localDate) 
        ? dayjs(startDate).format('YYYY-MM-DD')
        : localDate.format('YYYY-MM-DD');
      
      setEndDate(effectiveEndDate);
      
      // Change dropdown to Custom when manually selecting
      if (setSelectData) {
        setSelectData("Custom");
      }
    }
    setShowEndCalendar(false);
  };


  
  return (
    <div className={`flex flex-col gap-4 max-w-lg mx-auto ${className || ''}`}>
      {showRangeDropdown && selectData !== undefined && setSelectData && (
        <div className="relative">
          <select
            // value={selectData || ""}
            // onChange={(e) => setSelectData(e.target.value)}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectData(selectedValue);
              
              // Only calculate date range if a specific range is selected
              if (selectedValue && selectedValue !== "Custom") {
                calculateDateRange(selectedValue);
              }
            }}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
          >
            {defaultRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <img src="dropdownFilter.svg" className="text-bg-blue-12" />
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
            <img src="dropdownFilter.svg" className="text-bg-blue-12 cursor-pointer" />
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
            <img src="dropdownFilter.svg" className="text-bg-blue-12 cursor-pointer" />
          </div>
        </div>
      </div>

      {showStartCalendar && (
  <div className="absolute z-10 mt-2 p-4 bg-white rounded-xl shadow-lg ">
    <Calendar
      onChange={(value) => handleSelectStartDate(value)}
      value={startDate ? new Date(startDate) : new Date()}
      className="w-56 text-sm " 
    />
  </div>
)}

{showEndCalendar && (
  <div className="absolute z-10 mt-2 p-4 bg-white rounded-xl shadow-lg">
    <Calendar
      onChange={(value) => handleSelectEndDate(value)}
      value={endDate ? new Date(endDate) : new Date()}
      className="w-56 text-sm " 
    />
  </div>
)}
    </div>
  );
};

export default FilterDropdown;
