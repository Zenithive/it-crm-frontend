import React, { useEffect, useRef, useState } from 'react';
import useDealsApiService from '../../api/apiService/dealsApiService';
import { Deal } from '../../api/apiService/dealsApiService';
import "../Dashboard/Dashboard.css";
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';
import { subYears, subMonths, format, subWeeks, subDays } from 'date-fns';

interface TopDealsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const TopDeals: React.FC<TopDealsProps> = ({ activeFilter, setActiveFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [dateFilter, setDateFilter] = useState<{ dealStartDateMin?: string; dealStartDateMax?: string }>({});

  const getDateRange = (period: string) => {
    const now = new Date();
    switch (period) {

      case 'today': 
        return { dealStartDateMin: format(now, 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
        case 'weekly':
          return { 
            dealStartDateMin: format(subDays(now, 7), 'yyyy-MM-dd'), 
            dealStartDateMax: format(now, 'yyyy-MM-dd') 
          };
      case 'yearly':
        return { dealStartDateMin: format(subYears(now, 1), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'half-yearly':
        return { dealStartDateMin: format(subMonths(now, 6), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'quarterly':
        return { dealStartDateMin: format(subMonths(now, 3), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'monthly':
        return { dealStartDateMin: format(subMonths(now, 1), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
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

  const { deals, loading, error } = useDealsApiService(dateFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 relative" ref={filterRef}>
        <h3 className="text-2xl font-semibold text-bg-blue-12">
          Top Deals {activeFilter !== 'none' && `(${activeFilter})`}
        </h3>
        <img src="filterC.svg" alt="Filter" className="cursor-pointer" onClick={handleFilterClick} />
        {showFilter && (
          <FilterDropdown showFilter={showFilter} toggleFilter={() => setShowFilter(false)} applyFilter={applyFilter} activeFilter={activeFilter} />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-custom p-4">
        <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : deals.length === 0 ? (
            <p className="text-center text-gray-500">No deals found for the selected period</p>
          ) : (
            deals.map((deal: Deal, index: number) => (
              <div key={index} className="flex justify-between items-center p-4 border-b last:border-none">
                <div>
                  <p className="font-medium text-lg text-bg-blue-12">{deal.dealName}</p>
                </div>
                <div className="flex flex-col items-end min-w-[100px]">
                  <div className="font-bold">{`$${Math.floor(Number(deal.dealAmount)).toLocaleString()}`}</div>
                  <div className={`text-sm font-semibold text-black py-1 px-3 rounded-md mt-1 w-fit ${deal.dealStatus === "final" ? "bg-shadow-green" : "bg-bg-blue-16"}`}>
                    {deal.dealStatus}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
