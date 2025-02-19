"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { dashboardTotalLeadApi } from "../../api/apiService/dashboardApiService";  // API Service
import { dashboardTotalLeadJson } from "../../api/jsonService/dashboardJsonService"; // JSON Service

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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

const MonthlyLead = () => {
  const [data, setData] = useState([]);
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
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-bg-blue-12 text-lg md:text-xl font-semibold">
          Total Monthly Lead
        </h3>
        <button>
          <img src="details_logo.svg" alt="details" />
        </button>
      </div>

      <div className="flex-grow flex justify-center">
        <ResponsiveContainer width="100%" height={205}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ background: item.color }}></span>
            <span className="text-xs md:text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyLead;
