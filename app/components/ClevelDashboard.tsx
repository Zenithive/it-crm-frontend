"use client";
import React from "react";
import Title from "../microComponents/Title";
import { Dashboardtitle } from "./Path/TitlePaths";
import TimeDropDown from "./ClevelDashboard/TimeDropDown";
import CircularProgress from "../components/ClevelDashboard/CircularProgress";
import Map from "./ClevelDashboard/Map";
import ViaCampaign from "./ClevelDashboard/ViaCampaign";
import RevenueTrendChart from "./ClevelDashboard/RevenueTrendChart";
import TopDeals from "./ClevelDashboard/TopDeals";
import SalesTeamPerformance from "./ClevelDashboard/SalesTeamPerformance";

const ClevelDashboard: React.FC = () => {
  return (
    <>
      <div className="mt-4 ml-9 flex justify-between">
        <Title title={Dashboardtitle[0].titleName} />
        <TimeDropDown />
      </div>
      <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <CircularProgress value={75} title="Active Lead" img="/activeLead_icon.svg"/>
              <CircularProgress value={85} title="Deal Closed" img="/dealClose_icon.svg"/>
              <CircularProgress value={60} title="Conversion Rate" img="/conversation_icon.svg"/>
              <CircularProgress value={90} title="Total Revenue" img="/totalRevenue_icon.svg"/>
            </div>
            <RevenueTrendChart />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Map/>
            <ViaCampaign/>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <TopDeals/>
            <SalesTeamPerformance/>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ClevelDashboard;
