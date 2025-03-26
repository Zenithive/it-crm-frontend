import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueTrendChart: React.FC = () => {
  const data = [
    { month: "Jun", revenue: 100 },
    { month: "Feb", revenue: 200 },
    { month: "Mar", revenue: 125 },
    { month: "Apr", revenue: 50 },
    { month: "May", revenue: 75 },
    { month: "Jun", revenue: 175 },
    { month: "July", revenue: 175 },
  ];

  const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} />
        <defs>
          <filter
            id="circleShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="rgba(0.2, 0.2, 0.2, 0.3)"
            />
          </filter>
        </defs>
        <circle
          cx={x + width / 2}
          cy={y}
          r={9}
          fill="#4A3AFF"
          stroke="#ffffff" // White border color
          strokeWidth={2}
          filter="url(#circleShadow)"
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-custom p-4 z-100">
      <div className="flex justify-between items-center ">
        <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12 p-3">
          Revenue Trend
        </h3>
        <img src="filter.svg" alt="Filter"></img>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a0a0a0" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a0a0a0" }}
            domain={[0, 400]}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="revenue"
            fill="#C6D2FD"
            barSize={10}
            shape={CustomBar}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueTrendChart;
