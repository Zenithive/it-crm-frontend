import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import leadsApiService from "../../api/apiService/leadsApiService";
import DateFilter, { TimeFilterValue } from "../../microComponents/DateFilter";

interface ChartDataPoint {
  name: string;
  linkedin: number;
  socialMedia: number;
  website: number;
}

interface TotalLeadLineProps {
  onTimeFilterChange?: (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => void;
  currentTimeFilter?: string | null;
  defaultTimeFilter?: TimeFilterValue;
}

const TotalLeadLine: React.FC<TotalLeadLineProps> = ({
  onTimeFilterChange,
  currentTimeFilter,
  defaultTimeFilter = 'yearly'
}) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [mounted, setMounted] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilterValue>(defaultTimeFilter);
  
  const { 
    leadSourceCounts, 
    getTargetedLeadSources, 
    loading,
    setTimeFilter: apiSetTimeFilter 
  } = leadsApiService(1, 1000, true, undefined, undefined, timeFilter);
  
  // Handle local filter changes
  const handleFilterChange = (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => {
    console.log("TotalLeadLine filter changed to:", filter);
    setTimeFilter(filter);
    
    // Update API filter
    if (apiSetTimeFilter) {
      if (filter === 'custom' && customStartDate && customEndDate) {
        apiSetTimeFilter(filter, customStartDate, customEndDate);
        console.log(`Custom date range API filter: ${customStartDate} to ${customEndDate}`);
      } else {
        apiSetTimeFilter(filter);
        console.log("TotalLeadLine API time filter updated");
      }
    }
    
    // Propagate filter change to parent if callback provided
    if (onTimeFilterChange) {
      onTimeFilterChange(filter, customStartDate, customEndDate);
    }
  };
  
  useEffect(() => {
    setMounted(true);
    
    if (!loading && leadSourceCounts) {
      console.log("leadSourceCounts", leadSourceCounts);
      const { linkedin, socialMedia, website } = getTargetedLeadSources();
      console.log("Targeted lead sources:", { linkedin, socialMedia, website });
      
      const formattedData: ChartDataPoint[] = [
        {
          name: "Previous Period",
          linkedin: 0, 
          socialMedia: 0, 
          website: 0 
        },
        {
          name: "Current Period",
          linkedin: linkedin,
          socialMedia: socialMedia, 
          website: website
        }
      ];
      
      console.log("Formatted chart data:", formattedData);
      setChartData(formattedData);
    }
  }, [loading, leadSourceCounts]);

  const DynamicChart = dynamic(
    () =>
      import("recharts").then((recharts) => {
        const { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } = recharts;
        return function Chart({ data }: { data: ChartDataPoint[] }) {
          return (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    const nameMap: {[key: string]: string} = {
                      linkedin: "LinkedIn",
                      socialMedia: "Up Work",
                      website: "Website"
                    };
                    return [value, nameMap[name] || name];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="linkedin"
                  name="LinkedIn"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="socialMedia"
                  name="Up Work"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="website"
                  name="Website"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          );
        };
      }),
    { ssr: false }
  );
  
  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-custom min-h-[370px]">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="font-semibold text-bg-blue-12 text-lg md:text-xl">
            Total Lead Sources
          </h3>
          <div className="flex items-center">
            {/* Add DateFilter component */}
            <DateFilter
              onTimeFilterChange={handleFilterChange}
              currentTimeFilter={currentTimeFilter || timeFilter}
              defaultTimeFilter={defaultTimeFilter}
            />
          </div>
        </div>
        <div className="h-40 md:h-56">
          {mounted && !loading && chartData.length > 0 && <DynamicChart data={chartData} />}
        </div>
        <div className="position_linechart">
          {[
            { label: "LinkedIn", color: "#6366F1", count: getTargetedLeadSources?.()?.linkedin || 0 },
            { label: "Up Work", color: "#22C55E", count: getTargetedLeadSources?.()?.socialMedia || 0 },
            { label: "Website", color: "#94A3B8", count: getTargetedLeadSources?.()?.website || 0 },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 rounded-sm mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs md:text-sm">{item.label}: {item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalLeadLine;