"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";
import { dashboardTotalLeadJson } from "../../api/jsonService/dashboardJsonService"; // Keep JSON Service for fallback

const COLORS = {
  NEW: "#6366F1", // Purple
  FOLLOW_UP: "#EF4444", // Red
  CLOSED_LOST: "#10B981", // Green
  IN_PROGRESS: "#374151", // Dark gray
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
  const [page] = useState(1);
  const [pageSize] = useState(100); // Fetch enough leads to generate meaningful chart
  const [searchQuery] = useState("");
  
  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  // Use the new hook to fetch lead data
  const { leads, loading, error } = useOverallLeadsData(page, pageSize, searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      if (useDummyData) {
        // Use JSON data if dummy mode is enabled
        const jsonData = await dashboardTotalLeadJson();
        setData(jsonData || []);
        return;
      }

      if (leads && leads.length > 0) {
        // Process the leads data to create chart data
        const stageCount: Record<string, number> = {};
        
        // Count leads by leadStage
        leads.forEach((lead: { leadStage: string; }) => {
          const stage = lead.leadStage || "Unknown";
          stageCount[stage] = (stageCount[stage] || 0) + 1;
        });
        
        // Transform into chart data format
        const chartData: LeadData[] = Object.entries(stageCount).map(([name, value]) => ({
          name,
          value,
          color: COLORS[name as keyof typeof COLORS] || "#9CA3AF" // Default color for undefined stages
        }));
        
        setData(chartData);
      }
    };

    fetchData();
  }, [leads, useDummyData]);

  // Show loading state
  if (loading && !useDummyData) {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">Loading lead data...</p>
      </div>
    );
  }

  // Show error state
  if (error && !useDummyData) {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col items-center justify-center h-64">
        <p className="text-red-500">Error loading lead data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-bg-blue-12 text-xl font-semibold">Total Leads</h3>
        <button className="text-gray-600">
          <img src="details_logo.svg" alt="details" />
        </button>
      </div>

      <div className="flex-grow flex justify-center">
        {data.length > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">No lead data available</p>
          </div>
        )}
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


// "use client";

// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";
// import { dashboardTotalLeadJson } from "../../api/jsonService/dashboardJsonService"; // Keep JSON Service for fallback
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";

// const COLORS = {
//   NEW: "#6366F1", // Purple
//   FOLLOW_UP: "#EF4444", // Red
//   CLOSED_LOST: "#10B981", // Green
//   IN_PROGRESS: "#374151", // Dark gray
// };

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: {
//   cx: number;
//   cy: number;
//   midAngle: number;
//   innerRadius: number;
//   outerRadius: number;
//   percent: number;
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor="middle"
//       dominantBaseline="central"
//       className="text-sm font-semibold"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// interface LeadData {
//   name: string;
//   value: number;
//   color: string;
// }

// const MonthlyLead = () => {
//   const [data, setData] = useState<LeadData[]>([]);
//   const [page] = useState(1);
//   const [pageSize] = useState(100); // Fetch enough leads to generate meaningful chart
//   const [searchQuery] = useState("");
//   const { name: userName } = useSelector((state: RootState) => state.auth);
  
//   const useDummyData =
//     process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

//   // Use the hook to fetch lead data for the current user
//   const { leads, loading, error } = useOverallLeadsData(page, pageSize, searchQuery);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (useDummyData) {
//         // Use JSON data if dummy mode is enabled
//         const jsonData = await dashboardTotalLeadJson();
//         setData(jsonData || []);
//         return;
//       }

//       if (leads && leads.length > 0) {
//         console.log('leads',leads);
//         // Process the leads data to create chart data
//         const stageCount: Record<string, number> = {};
        
//         // Count leads by leadStage
//         leads.forEach((lead: { leadStage: string; }) => {
//           const stage = lead.leadStage || "Unknown";
//           stageCount[stage] = (stageCount[stage] || 0) + 1;
//         });
        
//         // Transform into chart data format
//         const chartData: LeadData[] = Object.entries(stageCount).map(([name, value]) => ({
//           name,
//           value,
//           color: COLORS[name as keyof typeof COLORS] || "#9CA3AF" // Default color for undefined stages
//         }));
//         console.log("chartData",chartData);
//         setData(chartData);
//       }
//     };

//     fetchData();
//   }, [leads, useDummyData]);

//   // Calculate total leads
//   const totalLeads = data.reduce((sum, item) => sum + item.value, 0);

//   // Show loading state
//   if (loading && !useDummyData) {
//     return (
//       <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col items-center justify-center h-64">
//         <p className="text-gray-500">Loading lead data...</p>
//       </div>
//     );
//   }

//   // Show error state
//   if (error && !useDummyData) {
//     return (
//       <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col items-center justify-center h-64">
//         <p className="text-red-500">Error loading lead data</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-[20px] p-6 shadow-custom w-full flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-bg-blue-12 text-xl font-semibold">
//           {userName}'s Leads ({totalLeads})
//         </h3>
//         <button className="text-gray-600">
//           <img src="details_logo.svg" alt="details" />
//         </button>
//       </div>

//       <div className="flex-grow flex justify-center">
//         {data.length > 0 ? (
//           <ResponsiveContainer width="100%" height={140}>
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={70}
//                 innerRadius={0}
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={-270}
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="flex items-center justify-center h-32">
//             <p className="text-gray-500">No lead data available</p>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-wrap gap-3 mt-4 justify-center ml-6">
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className="flex space-x-2 basis-1/3"
//           >
//             <span
//               className="w-4 h-4 rounded-sm"
//               style={{ background: item.color }}
//             ></span>
//             <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MonthlyLead;