import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface CircularProgressProps {
  value: number;
  title: string;
  isCurrency?: boolean; 
  img: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, title, isCurrency = false ,img}) => {
  const isActiveLeads = title === "Active Leads"; 
  const safeValue = isCurrency ? value : Math.min(value, 100); 
  const displayValue = isCurrency ? `$${value.toLocaleString()}` : `${safeValue}%`; 

  const data = [
    { name: "Completed", value: safeValue },
    { name: "Remaining", value: isCurrency ? 0 : 100 - safeValue },
  ];

  const COLORS = ["#6158FF", "#E5E7EB"];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-2">
        <div className='flex justify-center items-center'>
        <img src={img} alt='Image' className="w-5 h-5 " ></img>
        <span className="text-2xl font-semibold text-bg-blue-12 ml-4">{title}</span>
        </div>
       <img src="filter.svg" alt="Filter"></img>
         
      </div>

      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx={60}
            cy={60}
            innerRadius={40}
            outerRadius={55}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>

      
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900">
          {isActiveLeads ? value : displayValue}  
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
