"use client"
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSalesTeamData } from '../../api/apiService/salesTeamService';
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';
import { subYears, subMonths, format, subWeeks, subDays } from 'date-fns';

interface SaleTeamProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}


const SalesTeamPerformance:React.FC<SaleTeamProps> = ({ activeFilter, setActiveFilter }) => {
  const pageSize = 1000;
  const page = 1;
  
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [dateFilter, setDateFilter] = useState<{
       dealStartDateMin?: string;
       dealStartDateMax?: string;
     }>({});
     const { salesTeamData, isLoading, error } = useSalesTeamData(page, pageSize,dateFilter);

     const getDateRange = (period: string) => {
      const now = new Date();
  
      switch (period) {
        case 'today':
          return { dealStartDateMin: format(now, 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        case 'weekly':
          return { dealStartDateMin: format(subDays(now, 7), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        case 'monthly':
          return { dealStartDateMin: format(subMonths(now, 1), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        case 'quarterly':
          return { dealStartDateMin: format(subMonths(now, 3), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        case 'half-yearly':
          return { dealStartDateMin: format(subMonths(now, 6), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        case 'yearly':
          return { dealStartDateMin: format(subYears(now, 1), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        default:
          return {};
      }
    };


  useEffect(() => {
     setDateFilter(getDateRange(activeFilter));
   }, [activeFilter]);
 
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
         setShowFilter(false);
       }
     };
     document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);
 
   const handleFilterClick = (e: React.MouseEvent) => {
     e.stopPropagation();
     setShowFilter((prevState) => !prevState);
   };
 
   const applyFilter = (filterType: string) => {
     setActiveFilter(filterType); // Update filter in parent
     setShowFilter(false);
   };

  // Memoize the calculateProgress function
  const calculateProgress = useCallback((amount: string) => {
    const cleanAmount = amount.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanAmount) || 0;
    const maxAmount = Math.max(...salesTeamData.map((team) => parseFloat(team.amount.replace(/[^0-9.]/g, '')) || 0));
    return Math.min(Math.round((numericValue / (maxAmount || 1)) * 100), 100);
  }, [salesTeamData]);


 
  // Render loading or error states
  if (isLoading) return <div>Loading sales team data...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4 relative" ref={filterRef}>
        <h3 className="text-2xl font-semibold text-bg-blue-12">Sales Team Performance</h3>

        <img 
          src="filterC.svg" 
          alt="Filter" 
          className="cursor-pointer" 
          onClick={handleFilterClick} 
        />
        {showFilter && (
            <FilterDropdown
              showFilter={showFilter}
              toggleFilter={() => setShowFilter(false)}
              applyFilter={applyFilter}
              activeFilter={activeFilter as  'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly'} 
            />
       
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