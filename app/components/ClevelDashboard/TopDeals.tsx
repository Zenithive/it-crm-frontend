import React from 'react';

interface TopDeal {
  name: string;
  status: "In Progress" | "Closed" | "final";
  amount: number;
  type: string;
}

const topDeals: TopDeal[] = [
  {
    name: "Enterprise Solution",
    status: "In Progress",
    amount: 850000,
    type: "Negotiable",
  },
  {
    name: "Enterprise Solution",
    status: "Closed",
    amount: 850000,
    type: "Negotiable",
  },
  {
    name: "Enterprise Solution",
    status: "final",
    amount: 850000,
    type: "Negotiable",
  },
  {
    name: "Enterprise Solution",
    status: "In Progress",
    amount: 850000,
    type: "Negotiable",
  },
  {
    name: "Enterprise Solution",
    status: "final",
    amount: 850000,
    type: "Negotiable",
  },
];

const TopDeals = () => {
  return (
    <div>
      {/* Title Outside the Box */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">Top Deals</h3>
        <img src="filter.svg" alt="Filter" />
      </div>

      {/* Deals Container */}
      <div className="bg-white rounded-2xl shadow-custom p-4">
        <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
          {topDeals.map((deal, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
              {/* Deal Name & Type */}
              <div>
                <p className="font-medium text-lg text-bg-blue-12">
                  {deal.name}
                </p>
                <p className="text-sm text-black mt-1">{deal.type}</p>
              </div>

              {/* Amount & Status */}
              <div className="flex flex-col items-end min-w-[100px]">
                <div className="font-bold">${deal.amount.toLocaleString()}</div>
                <div
                  className={`text-sm font-semibold text-black py-1 px-3 rounded-md mt-1 w-fit
                  ${deal.status === "final" ? "bg-shadow-green" : "bg-bg-blue-16"}`}
                >
                  {deal.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
