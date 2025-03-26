import React, { useEffect, useRef, useState } from 'react';
import { useSalesTeamData } from '../../api/apiService/salesTeamService';
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';

const SalesTeamPerformance = () => {
  
  const pageSize = 1000; 
  const page = 1;

  const { salesTeamData, isLoading, error } = useSalesTeamData(page, pageSize);
   const [showFilter, setShowFilter] = useState(false);
      const [activeFilter, setActiveFilter] = useState("none");
      const filterRef = useRef<HTMLDivElement>(null);
  
  
      
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling
    console.log('Filter clicked', !showFilter);
    setShowFilter(prevState => !prevState);
  };
  
  const applyFilter = (filterType: string) => {
    console.log('Applying filter:', filterType);
    setActiveFilter(filterType);
    setShowFilter(false);
  
    switch(filterType) {
      case "yearly":
        // Example: Filter data for yearly view
        break;
      case "half-yearly":
        // Example: Filter data for half-yearly view
        break;
      default:
        // No filter
        break;
    }
  };

  const calculateProgress = (amount: string) => {
    const cleanAmount = amount.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanAmount) || 0;
    const maxAmount = Math.max(...salesTeamData.map((team) => parseFloat(team.amount.replace(/[^0-9.]/g, '')) || 0));
    
    return Math.min(Math.round((numericValue / (maxAmount || 1)) * 100), 100);
  };

  if (isLoading) return <div>Loading sales team data...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4 relative" ref={filterRef}>
        <h3 className="text-2xl font-semibold text-bg-blue-12">Sales Team Performance</h3>
        <img 
            src="filter.svg" 
            alt="Filter" 
            className="cursor-pointer" 
            onClick={handleFilterClick} 
          />
          {showFilter && (
            <div 
              className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg"
              style={{ minWidth: '150px' }}
            >
              <FilterDropdown
                showFilter={showFilter}
                toggleFilter={() => setShowFilter(false)}
                applyFilter={applyFilter}
                activeFilter={activeFilter}
              />
            </div>
          )}
      </div>

      <div className="bg-white rounded-xl shadow-custom p-4">
        <div className="p-4 space-y-4 scrollbar-custom overflow-y-auto max-h-[450px] pr-5 pl-4">
          {salesTeamData.length > 0 ? (
            salesTeamData.map((team, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <div className="mb-2">
                  <div className="font-semibold">{team.name}</div>
                  <div>
                    {team.deals} deals - {team.amount}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-bg-blue-12 h-2.5 rounded-full"
                    style={{ width: `${calculateProgress(team.amount)}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No sales data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesTeamPerformance;