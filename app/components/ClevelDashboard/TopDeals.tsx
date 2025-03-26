import React from 'react';
import useDealsApiService from '../../api/apiService/dealsApiService';
import { Deal } from '../../api/apiService/dealsApiService';
import "../Dashboard/Dashboard.css"
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
  const { deals, loading, error } = useDealsApiService();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">Top Deals</h3>
        <img src="filter.svg" alt="Filter" />
      </div>
      <div className="bg-white rounded-xl shadow-custom p-4">
        <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
          {deals.map((deal:Deal, index:number) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
              <div>
                <p className="font-medium text-lg text-bg-blue-12">
                  {deal.dealName}
                </p>
                {/* <p className="text-sm text-black mt-1">{deal.projectRequirements}</p> */}
              </div>
              <div className="flex flex-col items-end min-w-[100px]">
              <div className="font-bold">{`$${Math.floor(Number(deal.dealAmount)).toLocaleString()}`}</div>
                <div
                  className={`text-sm font-semibold text-black py-1 px-3 rounded-md mt-1 w-fit
                  ${deal.dealStatus === "final" ? "bg-shadow-green" : "bg-bg-blue-16"}`}
                >
                  {deal.dealStatus}
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