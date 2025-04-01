import React, { useEffect, useRef } from 'react';
import FilterDropdown from '../ManagerExecuteiveDashboard/ManagerExecuteiveDashboardFilter';

interface ViaCampaignProps {
  campaignCountryCounts: Record<string, number>;
  setTimeFilter: (filter: 'today'|'weekly'|'yearly' | 'quarterly' | 'half-yearly' | 'monthly') => void;
  currentTimeFilter: string;
}

const ViaCampaign: React.FC<ViaCampaignProps> = ({ 
  campaignCountryCounts,
  setTimeFilter,
  currentTimeFilter
}) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current && 
        !filterRef.current.contains(event.target as Node) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const applyFilter = (filterType: 'today'|'weekly'|'yearly' | 'quarterly' | 'half-yearly' | 'monthly') => {
    setTimeFilter(filterType);
    setShowFilter(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 relative">
        <div className="flex justify-center items-center" ref={filterRef}>
          <h3 className="text-2xl font-semibold text-bg-blue-12">
            Opportunities via Campaigns
          </h3>
        </div>
        <div ref={dropdownRef} className="relative">
          <button onClick={toggleFilter}>
            <img 
              src="filterC.svg" 
              alt="filter" 
              className="w-7 h-7 text-gray-500" 
            />
          </button>
          <FilterDropdown
            showFilter={showFilter}
            toggleFilter={() => setShowFilter(false)}
            applyFilter={applyFilter}
            activeFilter={currentTimeFilter as 'today'|'weekly'| 'monthly' | 'quarterly' | 'yearly' | 'half-yearly'}
          />
        </div>
      </div>

      {/* Opportunities Container */}
      <div className="bg-white rounded-xl shadow-custom p-4">
        <div className="space-y-4 scrollbar-custom overflow-y-auto max-h-[305px] pr-5 pl-4">
          {Object.entries(campaignCountryCounts || {}).map(([country, count], index) => (
            <div
              key={index}
              className={`flex justify-between pb-2 ${
                index !== Object.entries(campaignCountryCounts || {}).length - 1
                  ? "border-b border-content-border"
                  : ""
              }`}
            >
              <span>{country}</span>
              <span className="text-bg-blue-12 font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViaCampaign;