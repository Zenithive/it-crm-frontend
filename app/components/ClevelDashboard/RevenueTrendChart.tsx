// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import FilterDropdown from "../CleveldashboardFilter/cleveldashboard.filter";


// const RevenueTrendChart: React.FC = () => {

//   const [showFilter, setShowFilter] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("none");
//   const data = [
//     { month: "Jun", revenue: 100 },
//     { month: "Feb", revenue: 200 },
//     { month: "Mar", revenue: 125 },
//     { month: "Apr", revenue: 50 },
//     { month: "May", revenue: 75 },
//     { month: "Jun", revenue: 175 },
//     { month: "July", revenue: 175 },
//   ];

//   const handleFilterClick = () => {
//     setShowFilter(!showFilter);
//   };

//   const applyFilter = (filterType: string) => {
//     setActiveFilter(filterType);
//     setShowFilter(false);
    
//     // Add filter logic here
//     switch(filterType) {
//       case "yearly":
//         // Example: Filter data for yearly view
//         break;
//       case "half-yearly":
//         // Example: Filter data for half-yearly view
//         break;
//       default:
//         // No filter
//         break;
//     }
//   };
//   const CustomBar = (props: any) => {
//     const { x, y, width, height, fill } = props;
//     return (
//       <g>
//         <rect x={x} y={y} width={width} height={height} fill={fill} />
//         <defs>
//           <filter
//             id="circleShadow"
//             x="-50%"
//             y="-50%"
//             width="200%"
//             height="200%"
//           >
//             <feDropShadow
//               dx="0"
//               dy="2"
//               stdDeviation="3"
//               floodColor="rgba(0.2, 0.2, 0.2, 0.3)"
//             />
//           </filter>
//         </defs>
//         <circle
//           cx={x + width / 2}
//           cy={y}
//           r={9}
//           fill="#4A3AFF"
//           stroke="#ffffff" // White border color
//           strokeWidth={2}
//           filter="url(#circleShadow)"
//         />
//       </g>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-custom p-4 relative z-">
//       <div className="flex justify-between items-center ">
//         <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12 p-3">
//           Revenue Trend
//         </h3>
//         <img src="filter.svg" alt="Filter"   className="cursor-pointer"  onClick={handleFilterClick} ></img>

//         {showFilter && (
//             <div className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg"
           //   style={{ minWidth: '150px' }}">
//               <FilterDropdown
//                 showFilter={showFilter}
//                 toggleFilter={() => setShowFilter(false)}
//                 applyFilter={applyFilter}
//                 activeFilter={activeFilter}
//               />
//             </div>
//           )}
//       </div>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart
//           data={data}
//           margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
//         >
//           <CartesianGrid
//             vertical={false}
//             strokeDasharray="3 3"
//             stroke="#f0f0f0"
//           />
//           <XAxis
//             dataKey="month"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#a0a0a0" }}
//           />
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#a0a0a0" }}
//             domain={[0, 400]}
//           />
//           <Tooltip cursor={{ fill: "transparent" }} />
//           <Bar
//             dataKey="revenue"
//             fill="#C6D2FD"
//             barSize={10}
//             shape={CustomBar}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RevenueTrendChart;
import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FilterDropdown from "../CleveldashboardFilter/cleveldashboard.filter";

const RevenueTrendChart: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("none");
  const filterRef = useRef<HTMLDivElement>(null);

  const data = [
    { month: "Jun", revenue: 100 },
    { month: "Feb", revenue: 200 },
    { month: "Mar", revenue: 125 },
    { month: "Apr", revenue: 50 },
    { month: "May", revenue: 75 },
    { month: "Jun", revenue: 175 },
    { month: "July", revenue: 175 },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling
    console.log('Filter clicked', !showFilter);
    setShowFilter(prevState => !prevState);
  };

  const applyFilter = (filterType: string) => {
    console.log('Applying filter:', filterType);
    setActiveFilter(filterType);
    setShowFilter(false);

    switch(filterType) {
      case "yearly":
        // Example: Filter data for yearly view
        break;
      case "half-yearly":
        // Example: Filter data for half-yearly view
        break;
      default:
        // No filter
        break;
    }
  };

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
          stroke="#ffffff"
          strokeWidth={2}
          filter="url(#circleShadow)"
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-custom p-4 relative">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12 p-3">
          Revenue Trend
        </h3>
        <div 
          ref={filterRef} 
          className="relative"
        >
          <img 
            src="filter.svg" 
            alt="Filter" 
            className="cursor-pointer" 
            onClick={handleFilterClick} 
          />
          {showFilter && (
            <div 
              className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg"
              style={{ minWidth: '150px' }}
            >
              <FilterDropdown
                showFilter={showFilter}
                toggleFilter={() => setShowFilter(false)}
                applyFilter={applyFilter}
                activeFilter={activeFilter}
              />
            </div>
          )}
        </div>
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