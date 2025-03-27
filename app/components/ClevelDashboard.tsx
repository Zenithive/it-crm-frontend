"use client";
import React, { useState } from "react";
import Title from "../microComponents/Title";
import { Dashboardtitle } from "./Path/TitlePaths";
import TimeDropDown from "./ClevelDashboard/TimeDropDown";
import CircularProgress from "../components/ClevelDashboard/CircularProgress";
import Map from "./ClevelDashboard/Map";
import ViaCampaign from "./ClevelDashboard/ViaCampaign";
import RevenueTrendChart from "./ClevelDashboard/RevenueTrendChart";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import worldTopo from "../../public/world-topo.json";
import leadsApiService from "../api/apiService/leadsApiService";
import dealsApiService from "../api/apiService/dealsApiService";
import SalesTeamPerformance from "./ClevelDashboard/SalesTeamPerformance";
import TopDeals from "./ClevelDashboard/TopDeals";
// Types for data

const ClevelDashboard: React.FC = () => {
  // Sample data (you would replace this with actual data from your backend)
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<string>("none");
  const { newLeads, inProgressLeads, followUpLeads, closedWonLeads, totalItems, loading } = leadsApiService(1, 500,true,startDate, endDate);
  const activeLeads = newLeads + inProgressLeads + followUpLeads;
  
  const {totalDealAmount} = dealsApiService();

    const applyTimeFilter = (filterType: string) => {
      setActiveFilter(filterType);
  
      // Reset dates first
      const now = new Date();
      
      switch(filterType) {
        case "monthly":
          // From one month ago to today
          const pastMonth = new Date();
          pastMonth.setMonth(now.getMonth() - 1);
          setStartDate(pastMonth.toISOString().split('T')[0]);
          setEndDate(now.toISOString().split('T')[0]);
          break;
        
        case "quarterly":
          // From three months ago to today
          const pastQuarter = new Date();
          pastQuarter.setMonth(now.getMonth() - 3);
          setStartDate(pastQuarter.toISOString().split('T')[0]);
          setEndDate(now.toISOString().split('T')[0]);
          break;
        
        case "half-yearly":
          // From six months ago to today
          const pastHalfYear = new Date();
          pastHalfYear.setMonth(now.getMonth() - 6);
          setStartDate(pastHalfYear.toISOString().split('T')[0]);
          setEndDate(now.toISOString().split('T')[0]);
          break;
        
        case "yearly":
          // From one year ago to today
          const pastYear = new Date();
          pastYear.setFullYear(now.getFullYear() - 1);
          setStartDate(pastYear.toISOString().split('T')[0]);
          setEndDate(now.toISOString().split('T')[0]);
          break;
        
        case "none":
          // No filter, reset to undefined
          setStartDate(undefined);
          setEndDate(undefined);
          break;
        
        default:
          break;
      }
    };
  // Calculate Active Leads Total

  return (
    <>
      <div className="mt-4 ml-9 flex justify-between">
        <Title title={Dashboardtitle[0].titleName} />
        <TimeDropDown />
      </div>
      <div className="min-h-screen p-4 lg:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <CircularProgress value={activeLeads} title="Active Leads" img="/activeLead_icon.svg" onFilterChange={applyTimeFilter}
                    activeFilter={activeFilter} />
                  <CircularProgress value={80} title="Deal Closed" img="/dealClose_icon.svg"/>
                  <CircularProgress value={Math.round((closedWonLeads / totalItems) * 100)} title="Lead Conversion" img="/conversation_icon.svg" onFilterChange={applyTimeFilter}
                    activeFilter={activeFilter}/>
                  <CircularProgress value={totalDealAmount} title="Revenue Growth" isCurrency={true} img="/totalRevenue_icon.svg" />
                </>
              )}
            </div>
            <RevenueTrendChart />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Map />
            <ViaCampaign />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TopDeals />
            <SalesTeamPerformance />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClevelDashboard;

