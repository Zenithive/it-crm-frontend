import React from "react";
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
} from "recharts";

interface LeadSource {
  month: string;
  LinkedIn: number;
  UpWork: number;
  Contact: number;
  Direct?: number;
  Other: number;
}

interface LeadSourceChartProps {
  data: LeadSource[];
}

const   LeadSourceChart: React.FC<LeadSourceChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-indigo-500">Lead Source</CardTitle>
        <button>
        <img src='filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
        </button>
      </CardHeader>
      <div className='border-b border-content-border ml-5 mr-5 mb-4 '></div>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout="vertical" barCategoryGap={8}>
            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
            <XAxis type="number" />
            <YAxis dataKey="month" type="category" />
            <Tooltip />
            <Bar dataKey="LinkedIn" stackId="a" fill="#3B5998" />
            <Bar dataKey="UpWork" stackId="a" fill="#36C86F" />
            <Bar dataKey="Contact" stackId="a" fill="#FF6F61" />
            <Bar dataKey="Other" stackId="a" fill="#8E44AD" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-5 flex-wrap">
          <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-3 bg-lead-source-blue rounded-sm"></div>
            <span className="text-sm font-medium">LinkedIn</span>
          </div>

          <div className="flex items-center gap-3 ">
            <div className="w-8 h-3 bg-lead-source-green rounded-sm"></div>
            <span className="text-sm font-medium">UpWork</span>
          </div>
          </div>

          <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-3 bg-lead-source-orange rounded-sm"></div>
            <span className="text-sm font-medium">Contact</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-3 bg-lead-source-purple rounded-sm"></div>
            <span className="text-sm font-medium">Other</span>
          </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadSourceChart;
