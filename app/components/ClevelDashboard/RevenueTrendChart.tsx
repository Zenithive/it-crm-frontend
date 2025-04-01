"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FilterDropdown from "../ManagerExecuteiveDashboard/ManagerExecuteiveDashboardFilter";
import { Lead } from "../../api/apiService/leadApiInterface";

interface MonthlyLeadData {
  month: string;
  count: number;
}

interface RevenueTrendChartProps {
  leads: any[];
  loading: boolean;
  setTimeFilter: (filter: string) => void;
  currentTimeFilter: string;
  error?: string | null; 
}

const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({
  leads,
  loading,
  setTimeFilter,
  currentTimeFilter,
  error
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(currentTimeFilter || "yearly");
  const filterRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [monthlyClosedWonLeads, setMonthlyClosedWonLeads] = useState<MonthlyLeadData[]>([]);

  // Process leads to get monthly CLOSED_WON data
  useEffect(() => {
    if (!loading && leads) {
      // Filter leads with CLOSED_WON status
      const closedWonLeads = leads.filter((lead : Lead) => lead.leadStage === "CLOSED_WON");
      
      // Group by month
      const monthlyData: { [key: string]: number } = {};
      
      // Process each lead
      closedWonLeads.forEach((lead : Lead)  => {
        // Extract month from initialContactDate
        if (lead.initialContactDate) {
          const date = new Date(lead.initialContactDate);
          const monthName = date.toLocaleString('default', { month: 'short' });
          
          // Increment count for this month
          if (monthlyData[monthName]) {
            monthlyData[monthName]++;
          } else {
            monthlyData[monthName] = 1;
          }
        }
      });
      
      // Convert to array format for the chart
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const chartData = Object.keys(monthlyData)
        .map(month => ({
          month,
          count: monthlyData[month]
        }))
        .sort((a, b) => {
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });
      
      setMonthlyClosedWonLeads(chartData);
    }
  }, [leads, loading]);

  // Close dropdown if clicked outside
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

  const handleFilterChange = (filter: 'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    setActiveFilter(filter);
    setShowFilter(false);
    setTimeFilter(filter);
  };

  const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} />
        <defs>
          <filter
            id="circleShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="rgba(0.2, 0.2, 0.2, 0.3)"
            />
          </filter>
        </defs>
        <circle
          cx={x + width / 2}
          cy={y}
          r={9}
          fill="#4A3AFF"
          stroke="#ffffff"
          strokeWidth={2}
          filter="url(#circleShadow)"
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-custom p-4 relative">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12 p-3">
        Revenue Trend
        </h3>
        <div 
          ref={filterRef} 
          className="relative"
        >
          <button onClick={toggleFilter}>
            <img 
              src="filterC.svg" 
              alt="filter" 
              className="w-7 h-7 text-gray-500" 
            />
          </button>
          <div ref={dropdownRef}>
            <FilterDropdown
              showFilter={showFilter}
              activeFilter={activeFilter as 'weekly'| 'monthly' | 'quarterly' | 'yearly' | 'half-yearly'}
              applyFilter={handleFilterChange}
              toggleFilter={() => setShowFilter(false)}
            />
          </div>
        </div>
      </div>
      {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : monthlyClosedWonLeads.length === 0 ? (
            <p className="text-center text-gray-500">No Revenue Trend found for the selected period</p>
          ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthlyClosedWonLeads}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a0a0a0" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a0a0a0" }}
            />
            <Tooltip 
              cursor={{ fill: "transparent" }}
              formatter={(value) => [`${value} Leads`, "Closed Won"]}
            />
            <Bar
              dataKey="count"
              fill="#C6D2FD"
              barSize={10}
              shape={CustomBar}
              name="Closed Won Leads"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueTrendChart;