import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import FilterDropdown from './FiterDropdown';

export type TimeFilterValue = 'today'|'last7days'|'last15days'|'last30days'|'weekly'|'monthly'|'quarterly'|'yearly'|'half-yearly'|'custom';

interface DateFilterProps {
  onTimeFilterChange: (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => void;
  currentTimeFilter?: string | null;
  defaultTimeFilter: TimeFilterValue;
  className?: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
  onTimeFilterChange,
  currentTimeFilter,
  defaultTimeFilter,
  className
}) => {
  // Filter states
  const [showFilter, setShowFilter] = useState(false);
  const [temporarySelectData, setTemporarySelectData] = useState<string>(currentTimeFilter || "");
  const [startDate, setStartDate] = useState<string>(dayjs().subtract(30, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [filterPosition, setFilterPosition] = useState({ top: 0, right: 0 });
  const [isFilterActive, setIsFilterActive] = useState(!!currentTimeFilter && currentTimeFilter !== defaultTimeFilter);
  
  // Refs for positioning
  const filterIconRef = useRef<HTMLImageElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Update filter position when filter icon is clicked
  useEffect(() => {
    if (showFilter && filterIconRef.current) {
      const rect = filterIconRef.current.getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right - window.scrollX
      });
    }
  }, [showFilter]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current && 
        !filterRef.current.contains(event.target as Node) &&
        filterIconRef.current && 
        !filterIconRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set isFilterActive when currentTimeFilter changes
  useEffect(() => {
    setIsFilterActive(!!currentTimeFilter && currentTimeFilter !== defaultTimeFilter);
    setTemporarySelectData(currentTimeFilter || "");
    
    // Initialize date range based on current filter
    if (currentTimeFilter) {
      const today = dayjs();
      
      switch(currentTimeFilter) {
        case 'today':
          setStartDate(today.format('YYYY-MM-DD'));
          setEndDate(today.format('YYYY-MM-DD'));
          break;
        case 'last7days':
          setStartDate(today.subtract(7, 'day').format('YYYY-MM-DD'));
          setEndDate(today.format('YYYY-MM-DD'));
          break;
        case 'last15days':
          setStartDate(today.subtract(15, 'day').format('YYYY-MM-DD'));
          setEndDate(today.format('YYYY-MM-DD'));
          break;
        case 'last30days':
          setStartDate(today.subtract(30, 'day').format('YYYY-MM-DD'));
          setEndDate(today.format('YYYY-MM-DD'));
          break;
      }
    }
  }, [currentTimeFilter, defaultTimeFilter]);

  // Handle temporary filter selection
  const handleFilterChange = (value: string) => {
    console.log("User selected filter in dropdown:", value);
    setTemporarySelectData(value);
  };

  // Apply filter when Apply button is clicked
  const handleApplyFilter = () => {
    if (temporarySelectData === "Custom") {
      // For custom dates, pass both the filter type and date range
      console.log(`Applying custom date range: ${startDate} to ${endDate}`);
      onTimeFilterChange('custom', startDate, endDate);
    } else {
      // Map the UI filter values to the API service filter values
      let apiFilter: TimeFilterValue;
      switch(temporarySelectData) {
        case "Today":
          apiFilter = "today";
          break;
        case "Last 7 Days":
          apiFilter = "last7days";
          break;
        case "Last 15 Days":
          apiFilter = "last15days";
          break;
        case "Last 30 Days":
          apiFilter = "last30days";
          break;
        case "Weekly":
          apiFilter = "weekly";
          break;
        case "Monthly":
          apiFilter = "monthly";
          break;
        case "Quarterly":
          apiFilter = "quarterly";
          break;
        case "Yearly":
          apiFilter = "yearly";
          break;
        case "Half-Yearly":
          apiFilter = "half-yearly";
          break;
        default:
          apiFilter = defaultTimeFilter;
          break;
      }
      
      console.log("Converted filter value for API:", apiFilter);
      onTimeFilterChange(apiFilter);
    }
    
    setIsFilterActive(temporarySelectData !== defaultTimeFilter);
    setShowFilter(false);
  };

  // Clear filter and reset to default
  const handleClearFilter = () => {
    console.log("Filter cleared, resetting to default:", defaultTimeFilter);
    onTimeFilterChange(defaultTimeFilter);
    setTemporarySelectData("");
    setStartDate(dayjs().subtract(30, 'day').format('YYYY-MM-DD'));
    setEndDate(dayjs().format('YYYY-MM-DD'));
    setIsFilterActive(false);
    setShowFilter(false);
  };

  return (
    <div className={`flex items-center ${className}`}>
      {isFilterActive && (
        <button
          onClick={handleClearFilter}
          className="text-sm text-blue-600 mr-2 hover:text-blue-800"
        >
          Clear Filter
        </button>
      )}
      <img
        ref={filterIconRef}
        src={isFilterActive ? "filterC.svg" : "filterC.svg"}
        alt="filter"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setShowFilter(!showFilter)}
      />
      
      {showFilter && ReactDOM.createPortal(
        <div
          ref={filterRef}
          className="absolute z-50 bg-white shadow-lg rounded-lg p-4"
          style={{ 
            top: `${filterPosition.top}px`, 
            right: `${filterPosition.right}px`,
            width: '20rem' 
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Date Filter</h3>
              <button 
                onClick={() => setShowFilter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <FilterDropdown
              selectData={temporarySelectData}
              setSelectData={handleFilterChange}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              className="w-full"
            />
       
            <div className="flex justify-between pt-2 border-t">
              <button
                onClick={handleClearFilter}
                className="px-4 py-2 text-blue-600 rounded hover:text-blue-800"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DateFilter;