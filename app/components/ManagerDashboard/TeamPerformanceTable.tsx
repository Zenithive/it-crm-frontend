"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { CardContent } from "../../microComponents/CardContent";
import { CardHeader } from "../../microComponents/CardHeader";
import { CardTitle } from "../../microComponents/CardTitle";
import FilterDropdown from "../../microComponents/FiterDropdown";
import ReactDOM from "react-dom";
import leadsApiService from "../../api/apiService/leadsApiService";

interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

const TeamPerformanceTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [showFilter, setShowFilter] = useState(false);
  const [selectData, setSelectData] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'quarterly' | 'yearly' | 'half-yearly'>('monthly');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const filterIconRef = useRef<HTMLImageElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, right: 0 });

  const { 
    teamPerformance, 
    loading, 
    error,
    setTimeFilter: apiSetTimeFilter 
  } = leadsApiService(currentPage, itemsPerPage, true, undefined, undefined, timeFilter);
  
  const handleFilterChange = (value: string) => {
    setSelectData(value);
    
    // Map the UI filter values to the API service filter values
    if (value === "Today" || value === "Last 7 Days") {
      setTimeFilter("monthly");
    } else if (value === "Last 15 Days") {
      setTimeFilter("quarterly");
    } else if (value === "Last 30 Days") {
      setTimeFilter("yearly");
    } else if (value === "Custom Range") {
 
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

  const handleApplyFilter = () => {
    if (apiSetTimeFilter) {
      apiSetTimeFilter(timeFilter);
    }
    setIsFilterActive(true);
    setShowFilter(false);
  };

  const handleClearFilter = () => {
    setTimeFilter('monthly');
    if (apiSetTimeFilter) {
      apiSetTimeFilter('monthly');
    }
    setSelectData("");
    setStartDate("");
    setEndDate("");
    setIsFilterActive(false);
    setShowFilter(false);
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
          <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p>Loading team performance data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
          <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p>Error loading team data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
        <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
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
            className="w-7 h-7 cursor-pointer mr-4"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
      </CardHeader>

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

      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full rounded-xl overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-bg-blue-12 text-white">
                <th className="p-4 text-left font-medium">Employee Name</th>
                <th className="p-4 text-left font-medium">Total Lead</th>
                <th className="p-4 text-left font-medium">Total Won</th>
                <th className="p-4 text-left font-medium">Total Lost</th>
                <th className="p-4 text-left font-medium">
                  Average Close Rate
                </th>
                <th className="p-2 text-left font-medium">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="border-spacing-y-5 border-separate">
              {teamPerformance.map((member, index) => (
                <tr key={index} className="bg-white">
                  <td className="p-4 border-t rounded-l-lg">{member.name}</td>
                  <td className="p-4 border-t">{member.totalLead}</td>
                  <td className="p-4 border-t">{member.totalWon}</td>
                  <td className="p-4 border-t">{member.totalLost}</td>
                  <td className="p-4 border-t">{member.averageCloseRate}</td>
                  <td className="p-4 border-t rounded-r-lg">
                    {member.totalRevenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceTable;