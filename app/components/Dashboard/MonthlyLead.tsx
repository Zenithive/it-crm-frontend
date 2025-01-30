"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "Closed", value: 60, color: "#6366F1" },
  { name: "Prospect", value: 25, color: "#8B5CF6" },
  { name: "Lead", value: 15, color: "#333" },
];

const MonthlyLead = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Total Monthly Lead</h3>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-sm font-bold"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Legends */}
      {/* <div className="mt-6 flex justify-between px-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ background: item.color }} />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MonthlyLead;
