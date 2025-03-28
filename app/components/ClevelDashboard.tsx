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
import { addMonths, startOfDay, endOfDay, subYears,format, subMonths } from 'date-fns';
// Types for data

const ClevelDashboard: React.FC = () => {
  // Sample data (you would replace this with actual data from your backend)
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<string>("none");
  const { newLeads, inProgressLeads, followUpLeads, closedWonLeads, totalItems, loading } = leadsApiService(1, 500,true,startDate, endDate);
  const activeLeads = newLeads + inProgressLeads + followUpLeads;
     const [dateFilter, setDateFilter] = useState<{
       dealStartDateMin?: string;
       dealStartDateMax?: string;
     }>({});
  const {totalDealAmount} = dealsApiService(dateFilter);

    

  
   const getDateRange = (period: string) => {
      const now = new Date();
    
      switch(period) {
        case 'yearly':
          return {
            dealStartDateMin: format(subYears(now, 1), 'yyyy-MM-dd'),
            dealStartDateMax: format(now, 'yyyy-MM-dd')
          };
    
        case 'half-yearly':
          return {
            dealStartDateMin: format(subMonths(now, 6), 'yyyy-MM-dd'),
            dealStartDateMax: format(now, 'yyyy-MM-dd')
          };
    
        case 'quarterly':
          return {
            dealStartDateMin: format(subMonths(now, 3), 'yyyy-MM-dd'),
            dealStartDateMax: format(now, 'yyyy-MM-dd')
          };
    
        case 'monthly':
          return {
            dealStartDateMin: format(subMonths(now, 1), 'yyyy-MM-dd'),
            dealStartDateMax: format(now, 'yyyy-MM-dd')
          };
    
        case 'none':
        default:
          return {};
      }
    };
  const applyTimeFilter = (filterType: string) => {
    setActiveFilter(filterType);
  
    const now = new Date();


    
    switch(filterType) {
      case "monthly":
        setStartDate(startOfDay(addMonths(now, -1)).toISOString());
        setEndDate(endOfDay(now).toISOString());
        break;
      
      case "quarterly":
        setStartDate(startOfDay(addMonths(now, -3)).toISOString());
        setEndDate(endOfDay(now).toISOString());
        break;
      
      case "half-yearly":
        setStartDate(startOfDay(addMonths(now, -6)).toISOString());
        setEndDate(endOfDay(now).toISOString());
        break;
      
      case "yearly":
        setStartDate(startOfDay(subYears(now, 1)).toISOString());
        setEndDate(endOfDay(now).toISOString());
        break;
      
      case "none":
        setStartDate(undefined);
        setEndDate(undefined);
        break;
      
      default:
        console.warn(`Unhandled filter type: ${filterType}`);
        break;
    }
  };



  const applyFilterForRevenuew = (filterType: string) => {
    console.log('Applying filter:', filterType);
    setActiveFilter(filterType);
   

    // Get date range based on filter type
    const newDateFilter = getDateRange(filterType);
    setDateFilter(newDateFilter);
  };

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
                  <CircularProgress value={totalDealAmount} title="Revenue Growth" isCurrency={true} img="/totalRevenue_icon.svg" onFilterChange={applyFilterForRevenuew}/>
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

