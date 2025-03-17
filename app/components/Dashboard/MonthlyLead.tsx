"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { dashboardTotalLeadApi } from "../../api/apiService/dashboardApiService"; // API Service
import { dashboardTotalLeadJson } from "../../api/jsonService/dashboardJsonService"; // JSON Service

const COLORS = {
  Lead: "#6366F1", // Purple
  Prospect: "#EF4444", // Red
  Closed: "#10B981", // Green
  lost: "#374151", // Dark gray
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-sm font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface LeadData {
  name: string;
  value: number;
  color: string;
}

const MonthlyLead = () => {
  const [data, setData] = useState<LeadData[]>([]);
  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = useDummyData
        ? await dashboardTotalLeadApi()
        : await dashboardTotalLeadJson();

      setData(fetchedData || []);
    };

    fetchData();
  }, [useDummyData]);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-bg-blue-12 text-xl font-semibold">Total Leads</h3>
        <button className="text-gray-600">
          <img src="details_logo.svg" alt="details" />
        </button>
      </div>

      <div className="flex-grow flex justify-center">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={0}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3 mt-4 justify-center ml-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex space-x-2 basis-1/3"
          >
            <span
              className="w-4 h-4 rounded-sm"
              style={{ background: item.color }}
            ></span>
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyLead;
