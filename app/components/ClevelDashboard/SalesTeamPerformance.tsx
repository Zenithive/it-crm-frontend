import React from 'react';

interface SalesTeamPerformance {
  name: string;
  deals: number;
  amount: string;
}

const salesTeamPerformance: SalesTeamPerformance[] = [
  { name: "Prince", deals: 3, amount: "$156.44M" },
  { name: "xyz", deals: 3, amount: "$142.44M" },
  { name: "Prince", deals: 3, amount: "$156.44M" },
  { name: "xyz", deals: 3, amount: "$142.44M" },
  { name: "Prince", deals: 3, amount: "$156.44M" },
  { name: "xyz", deals: 3, amount: "$142.44M" },
  { name: "Prince", deals: 3, amount: "$156.44M" },
  { name: "xyz", deals: 3, amount: "$142.44M" },
];

const SalesTeamPerformance = () => {
  return (
    <div>
      {/* Title Outside the Box */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">
          Sales Team Performance
        </h3>
        <img src="filter.svg" alt="Filter" />
      </div>

      {/* Sales Performance Container */}
      <div className="bg-white rounded-2xl shadow-custom p-4">
        <div className="p-4 space-y-4 scrollbar-custom overflow-y-auto max-h-[450px] pr-5 pl-4">
          {salesTeamPerformance.map((team, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <div className="mb-2">
                <div className="font-semibold">{team.name}</div>
                <div>
                  {team.deals} deals - {team.amount}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-bg-blue-12 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesTeamPerformance;
