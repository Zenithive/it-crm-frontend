"use client";
import React, { useState, useEffect, useCallback } from "react";
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

// Define a type for the time filter to match what leadsApiService expects
type TimeFilterType = 'today' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'half-yearly';

const ClevelDashboard: React.FC = () => {
  // Global dashboard filter - applied to all components by default
  const [globalFilter, setGlobalFilter] = useState<TimeFilterType>("yearly");
  
  // Individual component filters - initialized to match global filter
  const [activeLeadsFilter, setActiveLeadsFilter] = useState<TimeFilterType>(globalFilter);
  const [dealLeadsFilter, setDealLeadsFilter] = useState<TimeFilterType>(globalFilter);
  const [leadConversionFilter, setLeadConversionFilter] = useState<TimeFilterType>(globalFilter);
  const [revenueGrowthFilter, setRevenueGrowthFilter] = useState<TimeFilterType>(globalFilter);
  const [revenueTrendFilter, setRevenueTrendFilter] = useState<TimeFilterType>(globalFilter);
  const [mapFilter, setMapFilter] = useState<TimeFilterType>(globalFilter);
  const [viaCampaignFilter, setViaCampaignFilter] = useState<TimeFilterType>(globalFilter);
  const [topDealsFilter, setTopDealsFilter] = useState<TimeFilterType>(globalFilter);
  const [salesTeamFilter, setSalesTeamFilter] = useState<TimeFilterType>(globalFilter);

  // Force re-render keys for API services
  const [activeLeadsKey, setActiveLeadsKey] = useState<number>(0);
  const [dealLeadsKey, setDealLeadsKey] = useState<number>(0);
  const [leadConversionKey, setLeadConversionKey] = useState<number>(0);
  const [revenueGrowthKey, setRevenueGrowthKey] = useState<number>(0);
  const [revenueTrendKey, setRevenueTrendKey] = useState<number>(0);
  const [viaCampaignKey, setViaCampaignKey] = useState<number>(0);
  const [mapKey, setMapKey] = useState<number>(0);
  const [topDealsKey, setTopDealsKey] = useState<number>(0);
  const [salesTeamKey, setSalesTeamKey] = useState<number>(0);
  
  // API Services with key to force re-initialization
  const activeLeadsService = leadsApiService(
    1, 500, true, 
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    activeLeadsFilter
  );
  
  const dealLeadsService = leadsApiService(
    1, 500, true, 
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    dealLeadsFilter
  );
  
  const leadConversionService = leadsApiService(
    1, 500, true, 
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    leadConversionFilter
  );
  
  const revenueGrowthService = leadsApiService(
    1, 500, true, 
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    revenueGrowthFilter
  );
  
  const revenueTrendService = leadsApiService(
    1, 500, true,
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    revenueTrendFilter
  );
  
  const viaCampaignService = leadsApiService(
    1, 500, true,
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    viaCampaignFilter
  );

  const mapService = leadsApiService(
    1, 500, true,
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    mapFilter
  );

  const topDealsService = leadsApiService(
    1, 500, true,
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    topDealsFilter
  );

  const salesTeamService = leadsApiService(
    1, 500, true,
    { field: LeadSortField.CREATED_AT, order: SortOrder.DESC },
    { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.DESC },
    salesTeamFilter
  );
  
  // Update all component filters and trigger re-fetch when global filter changes
  useEffect(() => {
    setActiveLeadsFilter(globalFilter);
    setDealLeadsFilter(globalFilter);
    setLeadConversionFilter(globalFilter);
    setRevenueGrowthFilter(globalFilter);
    setRevenueTrendFilter(globalFilter);
    setMapFilter(globalFilter);
    setViaCampaignFilter(globalFilter);
    setTopDealsFilter(globalFilter);
    setSalesTeamFilter(globalFilter);
    
    // Force re-fetching data by incrementing all keys
    setActiveLeadsKey(prev => prev + 1);
    setDealLeadsKey(prev => prev + 1);
    setLeadConversionKey(prev => prev + 1);
    setRevenueGrowthKey(prev => prev + 1);
    setRevenueTrendKey(prev => prev + 1);
    setViaCampaignKey(prev => prev + 1);
    setMapKey(prev => prev + 1);
    setTopDealsKey(prev => prev + 1);
    setSalesTeamKey(prev => prev + 1);
  }, [globalFilter]);
  
  // Set up effects to trigger re-fetch when individual filters change
  useEffect(() => {
    setActiveLeadsKey(prev => prev + 1);
    // Manually trigger setTimeFilter in the service if available
    if (activeLeadsService.setTimeFilter) {
      activeLeadsService.setTimeFilter(activeLeadsFilter);
    }
  }, [activeLeadsFilter]);
  
  useEffect(() => {
    setDealLeadsKey(prev => prev + 1);
    if (dealLeadsService.setTimeFilter) {
      dealLeadsService.setTimeFilter(dealLeadsFilter);
    }
  }, [dealLeadsFilter]);
  
  useEffect(() => {
    setLeadConversionKey(prev => prev + 1);
    if (leadConversionService.setTimeFilter) {
      leadConversionService.setTimeFilter(leadConversionFilter);
    }
  }, [leadConversionFilter]);
  
  useEffect(() => {
    setRevenueGrowthKey(prev => prev + 1);
    if (revenueGrowthService.setTimeFilter) {
      revenueGrowthService.setTimeFilter(revenueGrowthFilter);
    }
  }, [revenueGrowthFilter]);
  
  useEffect(() => {
    setRevenueTrendKey(prev => prev + 1);
    if (revenueTrendService.setTimeFilter) {
      revenueTrendService.setTimeFilter(revenueTrendFilter);
    }
  }, [revenueTrendFilter]);
  
  useEffect(() => {
    setViaCampaignKey(prev => prev + 1);
    if (viaCampaignService.setTimeFilter) {
      viaCampaignService.setTimeFilter(viaCampaignFilter);
    }
  }, [viaCampaignFilter]);
  
  useEffect(() => {
    setMapKey(prev => prev + 1);
    if (mapService.setTimeFilter) {
      mapService.setTimeFilter(mapFilter);
    }
  }, [mapFilter]);
  
  useEffect(() => {
    setTopDealsKey(prev => prev + 1);
    if (topDealsService.setTimeFilter) {
      topDealsService.setTimeFilter(topDealsFilter);
    }
  }, [topDealsFilter]);
  
  useEffect(() => {
    setSalesTeamKey(prev => prev + 1);
    if (salesTeamService.setTimeFilter) {
      salesTeamService.setTimeFilter(salesTeamFilter);
    }
  }, [salesTeamFilter]);
  
  // Function to apply the global filter
  const applyGlobalFilter = (filter: TimeFilterType) => {
    console.log('Applying global filter:', filter);
    setGlobalFilter(filter);
  };

  // Handle individual component filter changes
  const handleActiveLeadsFilterChange = (filter: string) => {
    console.log('Changing Active Leads filter to:', filter);
    setActiveLeadsFilter(filter as TimeFilterType);
  };

  const handleDealLeadsFilterChange = (filter: string) => {
    console.log('Changing Deal Leads filter to:', filter);
    setDealLeadsFilter(filter as TimeFilterType);
  };

  const handleLeadConversionFilterChange = (filter: string) => {
    console.log('Changing Lead Conversion filter to:', filter);
    setLeadConversionFilter(filter as TimeFilterType);
  };

  const handleRevenueGrowthFilterChange = (filter: string) => {
    console.log('Changing Revenue Growth filter to:', filter);
    setRevenueGrowthFilter(filter as TimeFilterType);
  };

  const handleRevenueTrendFilterChange = (filter: string) => {
    console.log('Changing Revenue Trend filter to:', filter);
    setRevenueTrendFilter(filter as TimeFilterType);
  };

  const handleViaCampaignFilterChange = (filter: string) => {
    console.log('Changing Via Campaign filter to:', filter);
    setViaCampaignFilter(filter as TimeFilterType);
  };

  return (
    <>
      <div className="mt-4 ml-9 flex justify-between">
        <Title title={Dashboardtitle[0].titleName} />
        <TimeDropDown onChange={applyGlobalFilter} currentFilter={globalFilter} />
      </div>
      <div className="min-h-screen p-4 lg:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {activeLeadsService.loading ? (
                <p>Loading metrics...</p>
              ) : (
                <>
                  <CircularProgress 
                    value={activeLeadsService.newLeads + activeLeadsService.inProgressLeads + activeLeadsService.followUpLeads} 
                    title="Active Leads" 
                    img="/activeLead_icon.svg" 
                    onFilterChange={handleActiveLeadsFilterChange}
                    activeFilter={activeLeadsFilter} 
                  />
                  <CircularProgress 
                    value={dealLeadsService.dealLead} 
                    title="Deal Leads" 
                    img="/dealClose_icon.svg"
                    onFilterChange={handleDealLeadsFilterChange}
                    activeFilter={dealLeadsFilter}
                  />
                  <CircularProgress 
                    value={leadConversionService.leadConversion ? Math.round(leadConversionService.leadConversion) : 0} 
                    title="Lead Conversion" 
                    img="/conversation_icon.svg" 
                    onFilterChange={handleLeadConversionFilterChange}
                    activeFilter={leadConversionFilter}
                  />
                  <CircularProgress 
                    value={revenueGrowthService.leadPerformanceMetrics?.totalSales || 0} 
                    title="Revenue Growth" 
                    isCurrency={true} 
                    img="/totalRevenue_icon.svg" 
                    onFilterChange={handleRevenueGrowthFilterChange}
                    activeFilter={revenueGrowthFilter}
                  />
                </>
              )}
            </div>
            <RevenueTrendChart 
              leads={revenueTrendService.leads || []} 
              loading={revenueTrendService.loading}
              setTimeFilter={handleRevenueTrendFilterChange}
              currentTimeFilter={revenueTrendFilter}
              error={revenueTrendService.error}  
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Map 
              activeFilter={mapFilter} 
              setActiveFilter={(filter) => setMapFilter(filter as TimeFilterType)}
            />
            <ViaCampaign 
              campaignCountryCounts={viaCampaignService.campaignCountryCounts || {}}
              setTimeFilter={handleViaCampaignFilterChange}
              currentTimeFilter={viaCampaignFilter}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TopDeals   
              activeFilter={topDealsFilter} 
              setActiveFilter={(filter) => setTopDealsFilter(filter as TimeFilterType)} 
            />
            <SalesTeamPerformance  
              activeFilter={salesTeamFilter} 
              setActiveFilter={(filter) => setSalesTeamFilter(filter as TimeFilterType)} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClevelDashboard;