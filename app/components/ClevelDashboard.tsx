"use client";
import React, { useState } from "react";
import Title from "../microComponents/Title";
import { Dashboardtitle } from "./Path/TitlePaths";
import TimeDropDown from "./ClevelDashboard/TimeDropDown";
import CircularProgress from "../components/ClevelDashboard/CircularProgress";
import Map from "./ClevelDashboard/Map";
import ViaCampaign from "./ClevelDashboard/ViaCampaign";
import RevenueTrendChart from "./ClevelDashboard/RevenueTrendChart";
import SalesTeamPerformance from "./ClevelDashboard/SalesTeamPerformance";
import TopDeals from "./ClevelDashboard/TopDeals";
import leadsApiService from "../api/apiService/leadsApiService";
import { LeadSortField, SortOrder } from "../../graphQl/queries/leads.queries";
import { DealSortFields, SortOrders } from "../../graphQl/queries/deals.queries";

const ClevelDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("yearly");
  
  const { 
    leads,
    newLeads, 
    inProgressLeads, 
    followUpLeads, 
    closedWonLeads, 
    dealLead,
    leadConversion,
    totalItems, 
    loading, 
    teamPerformance,
    campaignCountryCounts,
    leadSourceCounts,
    countryLeadStats,
    leadPerformanceMetrics,
    getTargetedLeadSources,
    setTimeFilter,
    currentTimeFilter,
    error
  } = leadsApiService(
    1,                                           
    500,                                          
    true,                                     
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },  // leadSort
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC }, // dealSort
    "yearly"                                      // initialTimeFilter
  );
  
  // Calculate active leads
  const activeLeads = newLeads + inProgressLeads + followUpLeads;
  
  // Manage revenue growth from lead performance metrics
  const revenueGrowth = leadPerformanceMetrics?.totalSales || 0;

  // Apply time filter for all metrics
  const applyTimeFilter = (filterType: string) => {
    console.log('Applying time filter:', filterType);
    setActiveFilter(filterType);
    
    // Use the setTimeFilter from the service to apply filters
    if (filterType == 'today'||filterType == 'weekly'|| filterType === 'monthly' || filterType === 'quarterly' || 
        filterType === 'yearly' || filterType === 'half-yearly') {
      setTimeFilter(filterType);
    }
  };

  return (
    <>
      <div className="mt-4 ml-9 flex justify-between">
        <Title title={Dashboardtitle[0].titleName} />
        <TimeDropDown onChange={applyTimeFilter} currentFilter={activeFilter} />
      </div>
      <div className="min-h-screen p-4 lg:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {loading ? (
                <p>Loading metrics...</p>
              ) : (
                <>
                  <CircularProgress 
                    value={activeLeads} 
                    title="Active Leads" 
                    img="/activeLead_icon.svg" 
                    onFilterChange={applyTimeFilter}
                    activeFilter={activeFilter} 
                  />
                  <CircularProgress 
                    value={dealLead} 
                    title="Deal Leads" 
                    img="/dealClose_icon.svg"
                    onFilterChange={applyTimeFilter}
                    activeFilter={activeFilter}
                  />
                  <CircularProgress 
                    value={leadConversion ? Math.round(leadConversion) : 0} 
                    title="Lead Conversion" 
                    img="/conversation_icon.svg" 
                    onFilterChange={applyTimeFilter}
                    activeFilter={activeFilter}
                  />
                  <CircularProgress 
                    value={revenueGrowth} 
                    title="Revenue Growth" 
                    isCurrency={true} 
                    img="/totalRevenue_icon.svg" 
                    onFilterChange={applyTimeFilter}
                    activeFilter={activeFilter}
                  />
                </>
              )}
            </div>
            <RevenueTrendChart 
              leads={leads || []} 
              loading={loading}
              setTimeFilter={applyTimeFilter}
              currentTimeFilter={currentTimeFilter || activeFilter}
              error={error}  
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Map activeFilter={activeFilter} setActiveFilter={applyTimeFilter}/>
            <ViaCampaign 
              campaignCountryCounts={campaignCountryCounts || {}}
              setTimeFilter={setTimeFilter}
              currentTimeFilter={currentTimeFilter || activeFilter}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TopDeals   activeFilter={activeFilter} setActiveFilter={applyTimeFilter} />
            <SalesTeamPerformance  activeFilter={activeFilter} setActiveFilter={applyTimeFilter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClevelDashboard;