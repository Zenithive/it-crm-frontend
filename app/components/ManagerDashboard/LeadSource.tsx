import React, { useState, useEffect } from "react";
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';
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

interface LeadSource {
  month: string;
  LinkedIn: number;
  UpWork: number;
  Website: number;
  Other: number;
}

interface Lead {
  leadSource: string;
  initialContactDate: string;
}


const LeadSourceChart: React.FC = () => {
  const [chartData, setChartData] = useState<LeadSource[]>([]);
  const { leads, loading } = leadsApiService(1, 1000, true);

  useEffect(() => {
    if (!loading && leads && leads.length > 0) {
      // Create a map to store lead counts by month and source
      const monthlyLeadSourceData: Record<string, Record<string, number>> = {};
      
      // Process each lead to categorize by month and source
      leads.forEach((lead: Lead) => {
        if (lead.initialContactDate) {
          const date = new Date(lead.initialContactDate);
          const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          
          if (!monthlyLeadSourceData[monthYear]) {
            monthlyLeadSourceData[monthYear] = {
              LinkedIn: 0,
              UpWork: 0,
              Website: 0,
              Other: 0
            };
          }
          
          if (lead.leadSource === "linkedin") {
            monthlyLeadSourceData[monthYear].LinkedIn += 1;
          } else if (lead.leadSource === "Social Media") {
            monthlyLeadSourceData[monthYear].UpWork += 1;
          } else if (lead.leadSource === "Website") {
            monthlyLeadSourceData[monthYear].Website += 1;
          } else {
            monthlyLeadSourceData[monthYear].Other += 1;
          }
        }
      });
      

      const sortedMonths = Object.keys(monthlyLeadSourceData).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      });
      
   
      const formattedData: LeadSource[] = sortedMonths.map(month => ({
        month,
        LinkedIn: monthlyLeadSourceData[month].LinkedIn,
        UpWork: monthlyLeadSourceData[month].UpWork,
        Website: monthlyLeadSourceData[month].Website,
        Other: monthlyLeadSourceData[month].Other
      }));
      
      setChartData(formattedData);
    }
  }, [loading, leads]);

  const calculateTotals = () => {
    const totals = {
      LinkedIn: 0,
      UpWork: 0,
      Website: 0,
      Other: 0
    };
    
    chartData.forEach(data => {
      totals.LinkedIn += data.LinkedIn;
      totals.UpWork += data.UpWork;
      totals.Website += data.Website;
      totals.Other += data.Other;
    });
    
    return totals;
  };
  
  const totals = calculateTotals();

  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between p-6">
      <CardTitle className="text-indigo-500">Lead Source</CardTitle>
      <button>
        <img src='filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
      </button>
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
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="month" type="category" width={80} />
          <Tooltip />
          <Bar dataKey="LinkedIn" stackId="a" fill="#3B5998" name="LinkedIn" />
          <Bar dataKey="UpWork" stackId="a" fill="#36C86F" name="UpWork" />
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
            <span className="text-sm font-medium">UpWork</span>
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