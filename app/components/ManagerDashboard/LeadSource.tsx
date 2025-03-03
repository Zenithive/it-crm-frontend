import React from "react";
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';
import { SlidersHorizontal } from "lucide-react";
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
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-indigo-500">Lead Source</CardTitle>
        <SlidersHorizontal className="w-5 h-5 text-gray-500" />
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout="vertical" barCategoryGap={8}>
            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
            <XAxis type="number" />
            <YAxis dataKey="month" type="category" />
            <Tooltip />
            <Bar dataKey="LinkedIn" stackId="a" fill="#374151" />
            <Bar dataKey="UpWork" stackId="a" fill="#10B981" />
            <Bar dataKey="Contact" stackId="a" fill="#F97316" />
            <Bar dataKey="Other" stackId="a" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-800"></div>
            <span className="text-xs">LinkedIn</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500"></div>
            <span className="text-xs">UpWork</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500"></div>
            <span className="text-xs">Contact</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500"></div>
            <span className="text-xs">Other</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadSourceChart;
