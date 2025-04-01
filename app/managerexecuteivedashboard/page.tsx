"use client";
import React, { useState, useMemo, useEffect } from "react";
import KeyMetricsCard from "../components/ManagerDashboard/KeyMetricsCard";
import PipelineMap from "../components/ManagerDashboard/PipelineMap";
import LeadSourceChart from "../components/ManagerDashboard/LeadSource";
import TeamPerformanceTable from "../components/ManagerDashboard/TeamPerformanceTable";
import leadsApiService from "../api/apiService/leadsApiService";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};

const calculatePercentageChange = (current: number, previous: number): { change: string, isPositive: boolean } => {
  if (previous === 0) return { change: 'N/A', isPositive: true };
  
  const change = ((current - previous) / previous) * 100;
  return {
    change: `${Math.abs(change).toFixed(1)}%`,
    isPositive: change >= 0
  };
};

const SalesDashboard: React.FC = () => {
  // State for tracking previous metrics
  const [previousMetrics, setPreviousMetrics] = useState({
    totalSales: 800000,
    winRate: 12,
    pipelineValue: 800000,
    avgDaysToClose: 55
  });
  
  // State for tracking selected time filter for main dashboard
  const [timeFilter, setTimeFilter] = useState<'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly'>('monthly');
  
  // State for pipeline map filter - separate from main filter
  const [pipelineMapFilter, setPipelineMapFilter] = useState<'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly'>('monthly');

  // Only use the main dashboard filter for API calls
  const {
    countryLeadStats,
    loading,
    error,
    leadPerformanceMetrics,
    teamPerformance,
    leadSourceCounts,
    setTimeFilter: apiSetTimeFilter,
    currentTimeFilter,
  } = leadsApiService(1, 10, true, undefined, undefined, timeFilter);

  // Handle time filter changes for main dashboard
  const handleTimeFilterChange = (filter: 'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    setTimeFilter(filter);
    if (apiSetTimeFilter) {
      apiSetTimeFilter(filter);
    }
  };

  // Handle time filter changes specifically for the pipeline map
  // This only updates the local state without triggering API calls
  const handlePipelineMapFilterChange = (filter: 'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    setPipelineMapFilter(filter);
  };
  
  // Filter country lead stats based on pipelineMapFilter if needed
  const filteredCountryLeadStats = useMemo(() => {
    // If filters match, no need to filter
    if (pipelineMapFilter === timeFilter) {
      return countryLeadStats;
    }
    return countryLeadStats;
    
  }, [countryLeadStats, pipelineMapFilter, timeFilter]);
  
  useEffect(() => {
    // Save current metrics as previous before they update
    if (!loading && leadPerformanceMetrics) {
      setPreviousMetrics({
        totalSales: leadPerformanceMetrics.totalSales,
        winRate: leadPerformanceMetrics.winRate,
        pipelineValue: leadPerformanceMetrics.totalSales, 
        avgDaysToClose: leadPerformanceMetrics.avgDaysToClose
      });
    }
  }, [timeFilter]);

  // Create key metrics with percentage changes
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
        previousMetrics.pipelineValue
      )
    },
    {
      title: "Avg. Days to Close",
      displayValue: leadPerformanceMetrics.avgDaysToClose.toFixed(1),
      ...calculatePercentageChange(
        previousMetrics.avgDaysToClose,
        leadPerformanceMetrics.avgDaysToClose
      ),
      isPositive: leadPerformanceMetrics.avgDaysToClose <= previousMetrics.avgDaysToClose
    }
  ], [leadPerformanceMetrics, previousMetrics]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="bg-blue-background">
        <div className="flex flex-col w-full gap-4 p-4">
          {/* Key Metrics Card with filter capability */}
          <KeyMetricsCard 
            keyMetrics={keyMetrics}
            onTimeFilterChange={handleTimeFilterChange}
            currentTimeFilter={timeFilter}
          />
          
          {/* Charts and Map Section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Pipeline Map with its own filter */}
            <PipelineMap 
              countryLeadStats={filteredCountryLeadStats} 
              onTimeFilterChange={handlePipelineMapFilterChange}
              currentTimeFilter={pipelineMapFilter}
            />
            
            {/* Lead Source Chart */}
            <LeadSourceChart  />
          </div>
          
          {/* Team Performance Table Component */}
          <TeamPerformanceTable />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;