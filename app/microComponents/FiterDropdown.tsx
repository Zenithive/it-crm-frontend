


// import React from 'react';

// // Define interfaces for the component props and options
// interface OptionType {
//   value: string;
//   label: string;
// }

// interface FilterDropdownProps {
//   selectData?: string;
// //   setSelectData: (value: string) => void;
// setSelectData?: (value: string) => void;
// // Add showRangeDropdown to control visibility
// showRangeDropdown?: boolean;
//   startDate: string;
//   setStartDate: (value: string) => void;
//   endDate: string;
//   setEndDate: (value: string) => void;
//   startDateOptions?: OptionType[];
//   endDateOptions?: OptionType[];
//   className?: string;
// }

// const FilterDropdown: React.FC<FilterDropdownProps> = ({
//   selectData,
//   setSelectData,
//   startDate,
//   showRangeDropdown = true,
//   setStartDate,
//   endDate,
//   setEndDate,
//   startDateOptions,
//   endDateOptions,
//   className
// }) => {
//   // Default options if not provided
//   const defaultRangeOptions: OptionType[] = [
//     { value: "Last 7 Days", label: "Last 7 Days" },
//     { value: "Last 30 Days", label: "Last 30 Days" },
//     { value: "Last 90 Days", label: "Last 90 Days" },
//     { value: "Custom", label: "Custom" }
//   ];

//   const defaultStartOptions: OptionType[] = [
//     { value: "2025-03-01", label: "Mar 1, 2025" },
//     { value: "2025-03-10", label: "Mar 10, 2025" },
//     { value: "2025-03-15", label: "Mar 15, 2025" }
//   ];

//   const defaultEndOptions: OptionType[] = [
//     { value: "2025-03-15", label: "Mar 15, 2025" },
//     { value: "2025-03-20", label: "Mar 20, 2025" },
//     { value: "2025-03-31", label: "Mar 31, 2025" }
//   ];

//   // Use provided options or defaults
//   const rangeOptions = defaultRangeOptions;
//   const startOptions = startDateOptions || defaultStartOptions;
//   const endOptions = endDateOptions || defaultEndOptions;

  


// return (
//     <div className={`flex flex-col gap-4 max-w-lg mx-auto ${className || ''}`}>
     
//       {showRangeDropdown && selectData !== undefined && setSelectData && (
//         <div className="relative">
//           <select
//             value={selectData}
//             onChange={(e) => setSelectData(e.target.value)}
//             className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
//           >
//             {rangeOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <img src="dropdownFilter.svg" className="text-indigo-600" />
//           </div>


          
//         </div>
//       )}

//       {/* Start Date and End Date section */}
//       <div className="flex items-center gap-2">
//         {/* Start Date dropdown */}
//         <div className="relative flex-1">
//           <select
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
//           >
//             <option value="" disabled>Start Date</option>
//             {startOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <img src="dropdownFilter.svg" className="text-indigo-600" />
//           </div>
//         </div>

//         {/* Rotate icon in the middle */}
//         <div className="flex items-center justify-center">
//           <img src="swap.svg" className="h-5 w-5 text-white" />
//         </div>

//         {/* End Date dropdown */}
//         <div className="relative flex-1">
//           <select
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
//           >
//             <option value="" disabled>End Date</option>
//             {endOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <img src="dropdownFilter.svg" className="text-indigo-600" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterDropdown;



import React, { useState } from 'react';

// Define interfaces for the component props and options
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
  // States to control calendar popups
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  // Default options if not provided
  const defaultRangeOptions: OptionType[] = [
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "Last 90 Days", label: "Last 90 Days" },
    { value: "Custom", label: "Custom" }
  ];

  // Format date for display (YYYY-MM-DD to Month D, YYYY)
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "Select Date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, isStartDate: boolean) => {
    const newDate = e.target.value;
    if (isStartDate) {
      setStartDate(newDate);
      setStartCalendarOpen(false);
    } else {
      setEndDate(newDate);
      setEndCalendarOpen(false);
    }
  };

  // Toggle calendar visibility
  const toggleCalendar = (isStartDate: boolean) => {
    if (isStartDate) {
      setStartCalendarOpen(!startCalendarOpen);
      setEndCalendarOpen(false);
    } else {
      setEndCalendarOpen(!endCalendarOpen);
      setStartCalendarOpen(false);
    }
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
            {defaultRangeOptions.map(option => (
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
        {/* Start Date calendar */}
        <div className="relative flex-1">
          <div 
            onClick={() => toggleCalendar(true)}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 cursor-pointer flex justify-between items-center"
          >
            <span>{formatDateForDisplay(startDate)}</span>
            <div className="pointer-events-none">
              <img src="dropdownFilter.svg" className="text-indigo-600" />
            </div>
          </div>
          
          {startCalendarOpen && (
            <div className="absolute mt-1 bg-white border rounded-lg shadow-lg z-10 p-2">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => handleDateChange(e, true)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Rotate icon in the middle */}
        <div className="flex items-center justify-center">
          <img src="swap.svg" className="h-5 w-5 text-white" />
        </div>

        {/* End Date calendar */}
        <div className="relative flex-1 ">
          <div 
            onClick={() => toggleCalendar(false)}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 cursor-pointer flex justify-between items-center"
          >
            <span>{formatDateForDisplay(endDate)}</span>
            <div className="pointer-events-none">
              <img src="dropdownFilter.svg" className="text-indigo-600" />
            </div>
          </div>
          
          {endCalendarOpen && (
            <div className="absolute mt-1 bg-white border rounded-lg shadow-lg z-10 p-2">
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => handleDateChange(e, false)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;