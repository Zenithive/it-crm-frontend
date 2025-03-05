"use client";
import React from "react";
import CircularProgress from "../components/ClevelDashboard/CircularProgress";
import RevenueTrendChart from "./ClevelDashboard/RevenueTrendChart";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import worldTopo from "../../public/world-topo.json";
// Types for data
interface KPICardProps {
  title: string;
  value: number | string;
  percentage?: number;
}

interface TopDeal {
  name: string;
  status: "In Progress" | "Closed" | "final";
  amount: number;
  type: string;
}

interface SalesTeamPerformance {
  name: string;
  deals: number;
  amount: string;
}

interface Opportunity {
  country: string;
  count: number;
}

const ClevelDashboard: React.FC = () => {
  // Sample data (you would replace this with actual data from your backend)
  const revenueData = [
    { month: "Jun", revenue: 180 },
    { month: "Feb", revenue: 250 },
    { month: "Mar", revenue: 100 },
    { month: "Apr", revenue: 80 },
    { month: "May", revenue: 150 },
    { month: "Jul", revenue: 200 },
  ];

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

  const opportunities: Opportunity[] = [
    { country: "United States", count: 120 },
    { country: "UK", count: 60 },
    { country: "Ahmedabad", count: 40 },
    { country: "United States", count: 120 },
    { country: "UK", count: 60 },
    { country: "Ahmedabad", count: 40 },
    { country: "United States", count: 120 },
    { country: "UK", count: 60 },
    { country: "Ahmedabad", count: 40 },
    { country: "United States", count: 120 },
    { country: "UK", count: 60 },
    { country: "Ahmedabad", count: 40 },
    { country: "United States", count: 120 },
    { country: "UK", count: 60 },
    { country: "Ahmedabad", count: 40 },
    { country: "United States", count: 120 },
    { country: "UK", count: 60 },
    { country: "Ahmedabad", count: 40 },
  ];

  const KPICard: React.FC<KPICardProps> = ({ title, value, percentage }) => (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-sm">{title}</p>
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-purple-200 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        {percentage !== undefined && (
          <span className="text-green-500 text-sm">+{percentage}%</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <CircularProgress value={75} title="Active Lead" />
            <CircularProgress value={85} title="Deal Closed" />
            <CircularProgress value={60} title="Conversion Rate" />
            <CircularProgress value={90} title="Total Revenue" />
          </div>
          <RevenueTrendChart />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-custom  p-4 h-auto flex flex-col">
            <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12">
              Territory Wise Opportunity Count
            </h3>
            <img src="filter.svg" alt="Filter" className="mb-4"></img>
            </div>
            <div className="flex-grow flex justify-center items-center">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 90, center: [0, 50] }}
                width={900}
                height={400}
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Geographies geography={worldTopo}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none", fill: "#E0E7F4" },
                          hover: {
                            fill: "#FFAB48",
                            outline: "none",
                            cursor: "pointer",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-custom  p-4">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12">
            Opportunities via Campaigns
            </h3>
            <img src="filter.svg" alt="Filter" className="mb-4"></img>
            </div>
            <div className="space-y-4 scrollbar-custom overflow-y-auto max-h-[280px] pr-5 pl-4 ">
              {opportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className={`flex justify-between pb-2 ${
                    index !== opportunities.length - 1
                      ? "border-b border-content-border"
                      : ""
                  }`}
                >
                  <span>{opportunity.country}</span>
                  <span className="text-bg-blue-12 font-semibold">
                    {opportunity.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-custom  p-4">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12">
                Top Deals
            </h3>
            <img src="filter.svg" alt="Filter" className="mb-4"></img>
            </div>
            <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
              {topDeals.map((deal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border-b last:border-none "
                >
                  {/* Deal Name & Type */}
                  <div>
                    <p className="font-medium text-lg text-bg-blue-12">
                      {deal.name}
                    </p>
                    <p className="text-sm text-black mt-1">{deal.type}</p>
                  </div>

                  {/* Amount & Status (Stacked) */}
                  <div className="flex flex-col items-end min-w-[100px]">
                    <div className="font-bold">
                      ${deal.amount.toLocaleString()}
                    </div>
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

          <div className="bg-white rounded-2xl shadow-custom  p-4">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-bg-blue-12">
            Sales Team Performance
            </h3>
            <img src="filter.svg" alt="Filter" className="mb-4"></img>
            </div>
            <div className="p-4 space-y-4 scrollbar-custom overflow-y-auto max-h-[450px] pr-5 pl-4">
              {salesTeamPerformance.map((team, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 pb-4"
                >
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
      </div>
    </div>
  );
};

export default ClevelDashboard;
