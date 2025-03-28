import React, { useState, useRef, useEffect } from 'react';
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { MetricCard } from "./MetricCard";
import FilterDropdown from '../ManagerExecuteiveDashboard/ManagerExecuteiveDashboardFilter';

interface MetricCardData {
  title: string;
  displayValue: string;
}

interface KeyMetricsCardProps {
  keyMetrics: MetricCardData[];
  onFilterChange: (filter: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => void;
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({
  keyMetrics,
  onFilterChange
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'monthly' | 'quarterly' | 'yearly' | 'half-yearly'>('yearly');
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside of filter dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node) &&
        filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFilter = () => setShowFilter(prevShow => !prevShow);

  const applyFilter = (filterType: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    // Set active filter locally
    setActiveFilter(filterType);
    setShowFilter(false);

    // Call the onFilterChange prop
    onFilterChange(filterType);
  };

  return (
    <Card className="bg-white shadow-custom rounded-xl overflow-hidden relative h-[210px]">
      <div className="justify-end items-end flex mr-4 mt-2 relative">
        <button
          ref={filterButtonRef}
          onClick={toggleFilter}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <img
            src="filterC.svg"
            alt="filter"
            className="w-6 h-6"
          />
        </button>
        {showFilter && (
          <div ref={filterDropdownRef}>
            <FilterDropdown
              showFilter={showFilter}
              activeFilter={activeFilter}
              toggleFilter={toggleFilter}
              applyFilter={applyFilter}
            />
          </div>
        )}
      </div>

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