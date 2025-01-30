import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { chartData } from "../Path/TaskData";
import dynamic from "next/dynamic";

const TotalLeadLine = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const DynamicChart = dynamic(
    () =>
      import("recharts").then((recharts) => {
        const { LineChart, Line, XAxis, YAxis } = recharts;
        return function Chart({ data }) {
          return (
            <LineChart width={640} height={200} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="linkedin"
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="upwork"
                stroke="#22C55E"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="webform"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          );
        };
      }),
    { ssr: false }
  );

  return (
    <div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-800">Total Monthly Lead</h3>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
        <div className="h-48">
          {mounted && <DynamicChart data={chartData} />}
        </div>
        <div className="mt-4 flex justify-between px-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#6366F1] rounded-full mr-2" />
            <span className="text-sm">LinkedIn</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#22C55E] rounded-full mr-2" />
            <span className="text-sm">Upwork</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#94A3B8] rounded-full mr-2" />
            <span className="text-sm">Website Form</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalLeadLine;
