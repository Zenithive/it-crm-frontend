import React, { useEffect, useRef, useState } from 'react';
import leadsApiService from '../../api/apiService/leadsApiService';
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';

interface Opportunity {
  country: string;
  count: number;
}

const opportunities: Opportunity[] = [
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
];
 
const ViaCampaign = () => {

   const [showFilter, setShowFilter] = useState(false);
    const [activeFilter, setActiveFilter] = useState("none");
    const filterRef = useRef<HTMLDivElement>(null);

  const { campaignCountryCounts } = leadsApiService(1, 10, true);

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
  return (
  <div>
      {/* Title Outside the Box */}
      <div className="flex justify-between items-center mb-4 relative" ref={filterRef} >
        <h3 className="text-2xl font-semibold text-bg-blue-12">
          Opportunities via Campaigns
        </h3>
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

      {/* Opportunities Container */}
      <div className="bg-white rounded-xl shadow-custom p-4">
        <div className="space-y-4 scrollbar-custom overflow-y-auto max-h-[305px] pr-5 pl-4">
          {Object.entries(campaignCountryCounts).map(([country, count], index) => (
            <div
              key={index}
              className={`flex justify-between pb-2 ${
                index !== Object.entries(campaignCountryCounts).length - 1
                  ? "border-b border-c ontent-border"
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
