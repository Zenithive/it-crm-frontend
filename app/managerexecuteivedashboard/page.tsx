"use client";
import React, { useState, useMemo } from "react";
import KeyMetricsCard from "../components/ManagerDashboard/KeyMetricsCard";
import PipelineMap from "../components/ManagerDashboard/PipelineMap";
import LeadSourceChart from "../components/ManagerDashboard/LeadSource";
import TeamPerformanceTable from "../components/ManagerDashboard/TeamPerformanceTable";
import leadsApiService from "../api/apiService/leadsApiService";

// Utility function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};

// Utility function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number): { change: string, isPositive: boolean } => {
  if (previous === 0) return { change: 'N/A', isPositive: true };
  
  const change = ((current - previous) / previous) * 100;
  return {
    change: `${Math.abs(change).toFixed(1)}%`,
    isPositive: change >= 0
  };
};

const SalesDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'quarterly' | 'yearly' | 'half-yearly'>('yearly');

  // Use leadsApiService to fetch data
  const {
    countryLeadStats,
    loading,
    error,
    leadPerformanceMetrics,
    teamPerformance,
    leadSourceCounts,
    setTimeFilter: updateApiTimeFilter
  } = leadsApiService(1, 10, true, undefined, undefined, timeFilter);

  // Hardcoded previous metrics for comparison (consider fetching these dynamically)
  const previousMetrics = useMemo(() => ({
    totalSales: 800000, 
    winRate: 12,
    pipelineValue: 800000,
    avgDaysToClose: 55
  }), []);

  const handleFilterChange = (filter: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    setTimeFilter(filter);
    updateApiTimeFilter(filter);
  };

  const keyMetrics = useMemo(() => [
    {
      title: "Total Sales",
      displayValue: formatCurrency(leadPerformanceMetrics.totalSales),
      ...calculatePercentageChange(
        leadPerformanceMetrics.totalSales, 
        previousMetrics.totalSales
      )
    },
    {
      title: "Win Rate",
      displayValue: `${leadPerformanceMetrics.winRate.toFixed(1)}%`,
      ...calculatePercentageChange(
        leadPerformanceMetrics.winRate, 
        previousMetrics.winRate
      )
    },
    {
      title: "Pipeline Value",
      displayValue: formatCurrency(leadPerformanceMetrics.totalSales),
      ...calculatePercentageChange(
        leadPerformanceMetrics.totalSales, 
        previousMetrics.totalSales
      )
    },
    {
      title: "Avg. Days to Close",
      displayValue: leadPerformanceMetrics.avgDaysToClose.toFixed(1),
      ...calculatePercentageChange(
        leadPerformanceMetrics.avgDaysToClose, 
        previousMetrics.avgDaysToClose
      ),
      isPositive: false
    }
  ], [leadPerformanceMetrics, previousMetrics]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <div className="bg-blue-background">
        <div className="flex flex-col w-full gap-4 p-4 ">
          {/* Key Metrics Card */}
          <KeyMetricsCard 
            keyMetrics={keyMetrics} 
            onFilterChange={handleFilterChange} 
          />

          {/* Charts and Map Section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {/* Pipeline Map */}
            <PipelineMap countryLeadStats={countryLeadStats} />
            
            {/* Lead Source Chart */}
            <LeadSourceChart />
          </div>

          {/* Team Performance Table Component */}
          <TeamPerformanceTable  />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;