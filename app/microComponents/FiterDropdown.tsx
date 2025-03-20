


import React from 'react';

// Define interfaces for the component props and options
interface OptionType {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  selectData?: string;
//   setSelectData: (value: string) => void;
setSelectData?: (value: string) => void;
// Add showRangeDropdown to control visibility
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
        {/* Start Date dropdown */}
        <div className="relative flex-1">
          <select
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
          >
            <option value="" disabled>Start Date</option>
            {startOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <img src="dropdownFilter.svg" className="text-indigo-600" />
          </div>
        </div>

        {/* Rotate icon in the middle */}
        <div className="flex items-center justify-center">
          <img src="swap.svg" className="h-5 w-5 text-white" />
        </div>

        {/* End Date dropdown */}
        <div className="relative flex-1">
          <select
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 pl-4 pr-10 bg-white text-gray-600 border rounded-xl border-bg-blue-12 appearance-none focus:outline-none"
          >
            <option value="" disabled>End Date</option>
            {endOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <img src="dropdownFilter.svg" className="text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;