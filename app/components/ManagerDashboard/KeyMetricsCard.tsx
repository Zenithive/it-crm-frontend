import React from 'react';
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { MetricCard } from "./MetricCard";
import DateFilter,{TimeFilterValue} from '../../microComponents/DateFilter';

interface MetricCardData {
  title: string;
  displayValue: string;
}

interface KeyMetricsCardProps {
  keyMetrics: MetricCardData[];
  onTimeFilterChange?: (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => void;
  currentTimeFilter?: string | null;
  defaultTimeFilter?: TimeFilterValue;
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({
  keyMetrics,
  onTimeFilterChange,
  currentTimeFilter,
  defaultTimeFilter = 'yearly'
}) => {
  // Handle filter changes
  const handleFilterChange = (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => {
    if (onTimeFilterChange) {
      onTimeFilterChange(filter, customStartDate, customEndDate);
    }
  };

  return (
    <Card className="bg-white shadow-custom rounded-xl overflow-hidden relative">
      <div className="justify-end items-end flex mr-4 mt-2">
        {onTimeFilterChange && (
          <DateFilter
            onTimeFilterChange={handleFilterChange}
            currentTimeFilter={currentTimeFilter}
            defaultTimeFilter={defaultTimeFilter}
          />
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