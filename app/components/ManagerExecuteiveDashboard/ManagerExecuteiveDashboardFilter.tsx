import React from 'react';

interface FilterDropdownProps {
  showFilter: boolean;
  activeFilter: 'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly';
  toggleFilter: () => void;
  applyFilter: (filter: 'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => void;
  resetToGlobal?: () => void;
  isUsingLocalFilter?: boolean;
  globalFilter?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  showFilter,
  activeFilter,
  applyFilter
}) => {
  const filterOptions: Array<'monthly' | 'quarterly' | 'yearly' | 'half-yearly'> = [
    'monthly', 'quarterly', 'yearly', 'half-yearly'
  ];

  if (!showFilter) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-50 w-40"
      style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
      }}
    >
      <div className="py-1">
        {filterOptions.map(filter => (
          <button
            key={filter}
            onClick={() => applyFilter(filter)}
            className={`
              block w-full text-left px-4 py-2 text-sm 
              ${activeFilter === filter 
                ? 'bg-blue-50 text-blue-700 font-semibold' 
                : 'hover:bg-gray-100 text-gray-700'}
            `}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;