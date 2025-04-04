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
  const [timeFilter, setTimeFilter] = useState<'today'|'last7days'|'last15days'|'last30days'|'weekly'|'monthly'|'quarterly'|'yearly'|'half-yearly'|'custom'>('monthly');
  
  // State for pipeline map filter - separate from main filter
  const [pipelineMapFilter, setPipelineMapFilter] = useState<'today'|'last7days'|'last15days'|'last30days'|'weekly'|'monthly'|'quarterly'|'yearly'|'half-yearly'|'custom'>('monthly');

  // Main dashboard API service
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

  // Separate API service for pipeline map
  const {
    countryLeadStats: pipelineCountryLeadStats,
    loading: pipelineLoading,
    error: pipelineError,
    setTimeFilter: pipelineApiSetTimeFilter,
  } = leadsApiService(1, 10, true, undefined, undefined, pipelineMapFilter);

  const handleTimeFilterChange = (
    filter: 'today'|'last7days'|'last15days'|'last30days'|'weekly'|'monthly'|'quarterly'|'yearly'|'half-yearly'|'custom',
    customStartDate?: string,
    customEndDate?: string
  ) => {
    console.log("Main dashboard filter changed to:", filter);
    
    setTimeFilter(filter);
    if (apiSetTimeFilter) {
      if (filter === 'custom' && customStartDate && customEndDate) {
        apiSetTimeFilter(filter, customStartDate, customEndDate);
        console.log(`Custom date range API filter: ${customStartDate} to ${customEndDate}`);
      } else {
        apiSetTimeFilter(filter);
        console.log("Standard API time filter updated");
      }
    }
  };
  
  const handlePipelineMapFilterChange = (
    filter: 'today'|'last7days'|'last15days'|'last30days'|'weekly'|'monthly'|'quarterly'|'yearly'|'half-yearly'|'custom',
    customStartDate?: string,
    customEndDate?: string
  ) => {
    console.log("Pipeline map filter changed to:", filter);
    setPipelineMapFilter(filter);
    
    if (pipelineApiSetTimeFilter) {
      if (filter === 'custom' && customStartDate && customEndDate) {
        pipelineApiSetTimeFilter(filter, customStartDate, customEndDate);
      } else {
        pipelineApiSetTimeFilter(filter);
      }
      console.log("Pipeline API time filter updated");
    }
  };

  useEffect(() => {
    if (!loading) {
      console.log("API returned data for filter:", currentTimeFilter);
      console.log("Lead performance metrics:", leadPerformanceMetrics);
      console.log("Country lead stats:", countryLeadStats);
      console.log("Team performance:", teamPerformance);
      console.log("Lead source counts:", leadSourceCounts);
    }
  }, [loading, leadPerformanceMetrics, countryLeadStats, teamPerformance, leadSourceCounts, currentTimeFilter]);
  
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
            {/* Pipeline Map with its own filter and data source */}
            <PipelineMap 
              countryLeadStats={pipelineCountryLeadStats} 
              onTimeFilterChange={handlePipelineMapFilterChange}
              currentTimeFilter={pipelineMapFilter}
            />
            
            {/* Lead Source Chart */}
            <LeadSourceChart />
          </div>
          
          {/* Team Performance Table Component */}
          <TeamPerformanceTable />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;