import React, { useState, useEffect } from "react";
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';
import FilterDropdown from "../ManagerExecuteiveDashboard/ManagerExecuteiveDashboardFilter";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import leadsApiService from "../../api/apiService/leadsApiService";
import { Lead } from "../../api/apiService/leadApiInterface";

interface LeadSource {
  month: string;
  LinkedIn: number;
  Social: number;
  Website: number;
  Other: number;
}

const LeadSourceChart: React.FC = () => {
  const [chartData, setChartData] = useState<LeadSource[]>([]);
  const [timeFilter, setTimeFilter] = useState<'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly'>('yearly');
  const [showFilter, setShowFilter] = useState(false);

  // Updated to match the leadsApiService signature
  const { 
    leads, 
    loading, 
    getTargetedLeadSources 
  } = leadsApiService(1, 1000, true, undefined, undefined, timeFilter);

  useEffect(() => {
    if (!loading && leads && leads.length > 0) {
      const groupedLeads: { [key: string]: number[] } = {};
      
      leads.forEach((lead :Lead) => {
        if (lead.initialContactDate) {
          const date = new Date(lead.initialContactDate);
          let periodKey: string;

          switch(timeFilter) {
            case 'monthly':
              periodKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
              break;
            case 'quarterly':
              const quarter = Math.floor(date.getMonth() / 3) + 1;
              periodKey = `Q${quarter} ${date.getFullYear()}`;
              break;
            case 'half-yearly':
              const halfYear = date.getMonth() < 6 ? 'H1' : 'H2';
              periodKey = `${halfYear} ${date.getFullYear()}`;
              break;
            case 'yearly':
            default:
              periodKey = date.getFullYear().toString();
              break;
          }

          if (!groupedLeads[periodKey]) {
            groupedLeads[periodKey] = [0, 0, 0, 0];
          }

          switch(lead.leadSource) {
            case 'linkedin':
              groupedLeads[periodKey][0]++;
              break;
            case 'Social Media':
              groupedLeads[periodKey][1]++;
              break;
            case 'Website':
              groupedLeads[periodKey][2]++;
              break;
            default:
              groupedLeads[periodKey][3]++;
              break;
          }
        }
      });

      // Convert grouped leads to chart data
      const formattedData: LeadSource[] = Object.entries(groupedLeads)
        .map(([month, counts]) => ({
          month,
          LinkedIn: counts[0],
          Social: counts[1],
          Website: counts[2],
          Other: counts[3]
        }))
        .sort((a, b) => {
          // Sort chronologically based on time filter
          const parseMonth = (monthStr: string) => {
            if (timeFilter === 'yearly') return parseInt(monthStr);
            if (timeFilter === 'quarterly') return parseInt(monthStr.split(' ')[0].slice(1)) * 3;
            if (timeFilter === 'half-yearly') return monthStr.includes('H1') ? 1 : 7;
            return 0;
          };

          const yearExtractor = (monthStr: string) => {
            const yearMatch = monthStr.match(/\d{4}/);
            return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
          };

          const yearA = yearExtractor(a.month);
          const yearB = yearExtractor(b.month);
          
          if (yearA !== yearB) return yearA - yearB;
          return parseMonth(a.month) - parseMonth(b.month);
        });

      setChartData(formattedData);
    }
  }, [loading, leads, timeFilter]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (filter: 'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    setTimeFilter(filter);
    setShowFilter(false);
  };

  // Calculate totals from the chart data or use getTargetedLeadSources
  const totals = getTargetedLeadSources();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6 relative">
        <CardTitle className="text-indigo-500">Lead Source</CardTitle>
        <div className="relative">
          <button onClick={toggleFilter}>
            <img src='filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
          </button>
          <FilterDropdown
            showFilter={showFilter}
            activeFilter={timeFilter}
            applyFilter={handleFilterChange}
            toggleFilter={() => setShowFilter(!showFilter)}
          />
        </div>
      </CardHeader>
      <div className='border-b border-content-border ml-5 mr-5 mb-4'></div>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={chartData} 
            layout="vertical" 
            barCategoryGap={16}
            barSize={24}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 'dataMax']} />
            <YAxis dataKey="month" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="LinkedIn" stackId="a" fill="#3B5998" name="LinkedIn" />
            <Bar dataKey="Social" stackId="a" fill="#36C86F" name="Social Media" />
            <Bar dataKey="Website" stackId="a" fill="#FF6F61" name="Website" />
            <Bar dataKey="Other" stackId="a" fill="#8E44AD" name="Other" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 flex justify-center gap-5">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-[#3B5998] rounded-sm"></div>
              <span className="text-sm font-medium">LinkedIn</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-[#36C86F] rounded-sm"></div>
              <span className="text-sm font-medium">Social Media</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-[#FF6F61] rounded-sm"></div>
              <span className="text-sm font-medium">Website</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-[#8E44AD] rounded-sm"></div>
              <span className="text-sm font-medium">Other</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadSourceChart;