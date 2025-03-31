import React, { useState, useRef, useEffect } from 'react';
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { MetricCard } from "./MetricCard";
import FilterDropdown from '../../microComponents/FiterDropdown';
import ReactDOM from 'react-dom';

interface MetricCardData {
  title: string;
  displayValue: string;
}

interface KeyMetricsCardProps {
  keyMetrics: MetricCardData[];
  onTimeFilterChange?: (filter: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => void;
  currentTimeFilter?: string | null;
  defaultTimeFilter?: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly';
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({
  keyMetrics,
  onTimeFilterChange,
  currentTimeFilter,
  defaultTimeFilter = 'monthly'
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectData, setSelectData] = useState<string>(currentTimeFilter || "");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const filterIconRef = useRef<HTMLImageElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, right: 0 });
  const [isFilterActive, setIsFilterActive] = useState(!!currentTimeFilter && currentTimeFilter !== defaultTimeFilter);
 
  const handleFilterChange = (value: string) => {
    setSelectData(value);
    
    // Map the UI filter values to the API service filter values
    if (onTimeFilterChange) {
      if (value === "Today" || value === "Last 7 Days") {
        onTimeFilterChange("monthly");
      } else if (value === "Last 15 Days") {
        onTimeFilterChange("quarterly");
      } else if (value === "Last 30 Days") {
        onTimeFilterChange("yearly");
      }
    }
  };

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
  }, [currentTimeFilter, defaultTimeFilter]);

  const handleApplyFilter = () => {
    if (onTimeFilterChange) {
      // Map your selectData to the appropriate filter type
      if (selectData) {
        onTimeFilterChange(selectData as any);
        setIsFilterActive(selectData !== defaultTimeFilter);
      }
    }
    setShowFilter(false);
  };

  const handleClearFilter = () => {
    if (onTimeFilterChange) {
      onTimeFilterChange(defaultTimeFilter);
    }
    setSelectData("");
    setStartDate("");
    setEndDate("");
    setIsFilterActive(false);
    setShowFilter(false);
  };

  return (
    <Card className="bg-white shadow-custom rounded-xl overflow-hidden relative">
      <div className="justify-end items-end flex mr-4 mt-2">
        <div className="flex items-center">
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
        </div>
      </div>
      
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
              selectData={selectData}
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
      
      <div className="flex">
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className={`relative flex-1 px-4 pb-4 ${
              index !== 0
                ? "after:content-[''] after:absolute after:top-8 after:bottom-8 after:left-0 after:w-px after:bg-content-border"
                : ""
            }`}
          >
            <MetricCard
              title={metric.title}
              displayValue={metric.displayValue}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default KeyMetricsCard;