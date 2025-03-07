import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { dashboardTotalLeadLineApi } from "../../api/apiService/dashboardApiService";  // API Service
import { dashboardTotalLeadLineJson } from "../../api/jsonService/dashboardJsonService"; // JSON Service

const TotalLeadLine = () => {
  const [chartData, setChartData] = useState([]);
  const [mounted, setMounted] = useState(false);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      const fetchedData = useDummyData
        ? await dashboardTotalLeadLineApi()
        : await dashboardTotalLeadLineJson();

      setChartData(fetchedData || []);
    };

    fetchData();
  }, [useDummyData]);

  const DynamicChart = dynamic(
    () =>
      import("recharts").then((recharts) => {
        const { LineChart, Line, XAxis, YAxis, ResponsiveContainer } = recharts;
        return function Chart({ data }: { data: any }) {
          return (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
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
            </ResponsiveContainer>
          );
        };
      }),
    { ssr: false }
  );

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-custom">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="font-semibold text-bg-blue-12 text-lg md:text-xl">
            Total Lead Sources
          </h3>
          <button>
            <img src="details_logo.svg" alt="details" />
          </button>
        </div>
        <div className="h-40 md:h-56">
          {mounted && <DynamicChart data={chartData} />}
        </div>
        <div className="position_linechart">
          {[
            { label: "LinkedIn", color: "#6366F1" },
            { label: "Upwork", color: "#22C55E" },
            { label: "Website Form", color: "#94A3B8" },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 rounded-sm mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs md:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalLeadLine;
