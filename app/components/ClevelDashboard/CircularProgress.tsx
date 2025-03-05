import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface CircularProgressProps {
  value: number;
  title: string;

}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, title }) => {
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: 100 - value }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-custom  p-6 flex flex-col items-center">
      {/* Title & Options */}
      <div className="flex justify-between items-center w-full mb-2">
        {/* <img src={img} alt='Image' className="w-8 h-8 object-contain" ></img> */}
        <span className="text-2xl font-semibold text-bg-blue-12">{title}</span>
       <img src="filter.svg" alt="Filter"></img>
         
      </div>

      {/* Circular Progress with Value */}
      <div className="relative p-5">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx={60}
            cy={60}
            innerRadius={45}
            outerRadius={55}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            <Cell key="completed" fill="#6158FF" />
            <Cell key="remaining" fill="#ffffff" />
          </Pie>
        </PieChart>
        
        {/* Centered Value */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-800">
          {value}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
