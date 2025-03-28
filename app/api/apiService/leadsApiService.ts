import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS,LeadSortField,SortOrder } from "../../../graphQl/queries/leads.queries";
import { DealSortFields, GET_DEALS, SortOrders} from "../../../graphQl/queries/deals.queries";
import { useGoogleCalendarService } from "./googlecalendar.service";


interface LeadAssignedTo {
  userID: string;
  name: string;
  email: string;
}

interface Lead {
  leadID: string;
  leadStage: string;
  campaign?: {
    campaignCountry?: string;
  };
  leadSource: string;
  initialContactDate: string;
  
  leadAssignedTo?: LeadAssignedTo; 
  country: string;
  firstName: string;
  lastName:string;
  email:string;
}

export interface Deal {
  dealID: string;
  dealName: string;
  leadID: string;
  dealStartDate: string;
  dealEndDate: string;
  projectRequirements: string;
  dealAmount: string;
  dealStatus: string;
    user: {
    userID: string;
    name: string;
  };
}

function isDealsArray(data: any): data is Deal[] {
  return Array.isArray(data);
}


interface DealsResponse {
  getDeals?: {
    items?: Deal[];
    totalCount?: number;
  };
  deals?: Deal[];
}

interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

export interface CountryLeadStats {
  newLeads: number;
  inProgress: number;
  followUp: number;
  closedWon: number;
  closedLost: number;
  dealLeads: number;
}

interface CalendarAttendee {
  email: string;
  responseStatus?: string;
}

interface Meeting {
  title: string;
  time: string;
  date: Date;
  meetingLink?: string;
  attendees: CalendarAttendee[];
  organizer: string;
}

interface IntegratedMeeting {
  lead?: Lead;
  meeting: Meeting;
  attendeeEmail?: string;
}


interface LeadPerformanceMetrics {
  totalSales: number;
  winRate: number;
  avgDaysToClose: number;
}


const leadsApiService = (  currentPage: number, 
  itemsPerPage: number, 
  fetchAll: boolean = false,
  startDate?: string,
  endDate?: string,
  leadSort?: { field: LeadSortField; order: SortOrder },
  dealSort?: { field: DealSortFields; order: SortOrders },
 
  initialTimeFilter?: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {

  const [newLeads, setNewLeads] = useState(0);
  const [inProgressLeads, setInProgressLeads] = useState(0);
  const [followUpLeads, setFollowUpLeads] = useState(0);
  const [closedWonLeads, setClosedWonLeads] = useState(0);
  const [leadConversion, setLeadConversion] = useState(0);
  const [dealLead, setDealLead] = useState(0);
  const [campaignCountryCounts, setCampaignCountryCounts] = useState<{ [key: string]: number }>({});
  const [leadSourceCounts, setLeadSourceCounts] = useState<{ [key: string]: number }>({});
  const [teamPerformance, setTeamPerformance] = useState<TeamMember[]>([]);
  const [countryLeadStats, setCountryLeadStats] = useState<{ [key: string]: CountryLeadStats }>({});
  const [integratedMeetings, setIntegratedMeetings] = useState<IntegratedMeeting[]>([]);
  const [leadPerformanceMetrics, setLeadPerformanceMetrics] = useState<LeadPerformanceMetrics>({
    totalSales: 0,
    winRate: 0,
    avgDaysToClose: 0
  });
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | null>(initialTimeFilter || null);
  
 
  const user = useSelector((state: RootState) => state.auth);
  const { googleAccessToken } = user || {};

  const filter: any = {};

  // Date filtering logic
  if (startDate && endDate) {
    // If both start and end dates are provided
    filter.fromDate = startDate;
    filter.toDate = endDate;
  } else if (startDate) {
    // If only start date is provided
    filter.fromDate = startDate;
  } else if (endDate) {
    // If only end date is provided
    filter.toDate = endDate;
  }


  const getDateRangeForFilter = (filter: string): { fromDate: string; toDate: string } => {
    const now = new Date();
    let startDate: Date;
  
    console.log('Current Date:', now);
    console.log('Selected Time Filter:', filter);
  
    switch (filter) {
      case 'monthly':
        // For monthly, start from the first day of the current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        console.log('Monthly Start Date:', startDate);
        console.log('Month Details:', {
          currentMonth: now.getMonth(),
          firstDayOfMonth: startDate
        });
        break;
  
      case 'quarterly':
        // Determine the start of the current quarter
        const currentQuarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
        console.log('Quarterly Start Date:', startDate);
        console.log('Quarter Details:', {
          currentQuarter: currentQuarter,
          quarterStartMonth: currentQuarter * 3,
          firstDayOfQuarter: startDate
        });
        break;
  
      case 'half-yearly':
        // Start from either January 1st or July 1st based on current month
        startDate = new Date(now.getFullYear(), now.getMonth() >= 6 ? 6 : 0, 1);
        console.log('Half-Yearly Start Date:', startDate);
        console.log('Half-Year Details:', {
          startingMonth: now.getMonth() >= 6 ? 'July' : 'January',
          firstDayOfHalfYear: startDate
        });
        break;
  
      case 'yearly':
      default:
        // For yearly, always start from January 1st of the current year
        startDate = new Date(now.getFullYear(), 0, 1);
        console.log('Yearly Start Date:', startDate);
        console.log('Year Details:', {
          currentYear: now.getFullYear(),
          firstDayOfYear: startDate
        });
        break;
    }
  
    // Format dates to ISO string and extract just the date part
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
    const fromDate = formatDate(startDate);
    const toDate = formatDate(now);
  
    console.log('Final Date Range:', { fromDate, toDate });
  
    return { fromDate, toDate };
  };
  


  // Updated query variables for leads
  const leadsQueryVariables = {
    filter: selectedTimeFilter 
      ? { 
          fromDate: getDateRangeForFilter(selectedTimeFilter).fromDate,
          toDate: getDateRangeForFilter(selectedTimeFilter).toDate,
        } 
      : {},
    pagination: {
      page: currentPage,
      pageSize: fetchAll ? 10000 : itemsPerPage
    },
    sort: leadSort || { field: LeadSortField.CREATED_AT, order: SortOrder.DESC }
  };

  // Updated query variables for deals
  const dealsQueryVariables = {
    filter: selectedTimeFilter 
      ? { 
          dealStartDateMin: getDateRangeForFilter(selectedTimeFilter).fromDate,
          dealStartDateMax: getDateRangeForFilter(selectedTimeFilter).toDate,
        } 
      : {},
    pagination: {
      page: currentPage,
      pageSize: fetchAll ? 10000 : itemsPerPage
    },
    sort: dealSort || { field: DealSortFields.DEAL_AMOUNT, order: SortOrders.ASC }
  };

  console.log("Leads Query Variables", leadsQueryVariables);
  console.log("Deals Query Variables", dealsQueryVariables);




  const setTimeFilter = (filter: 'monthly' | 'quarterly' | 'yearly' | 'half-yearly') => {
    setSelectedTimeFilter(filter);
  };



  const { 
    fetchGoogleCalendarEvents, 
    integrateLeadsAndMeetings,
    googleMeetingsLoading,
    googleMeetingsError 
  } = useGoogleCalendarService(googleAccessToken);

  // Fetch Leads Query
  const { 
    data: leadsData, 
    loading: leadsLoading, 
    error: leadsError,
    refetch: refetchLeads
  } = useQuery(GET_LEADS, {
    variables: {
      filter: filter,
      sort: { field: "EMAIL", order: "ASC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onError: (error) => {
      console.error("Leads Query Error:", error);
    }
  });
  
  // Fetch Deals Query
  const { 
    data: dealsData, 
    loading: dealsLoading, 
    error: dealsError,
    refetch: refetchDeals
  } = useQuery<DealsResponse>(GET_DEALS, {
    variables: dealsQueryVariables,
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onError: (err) => console.error("Error fetching deals:", err),
  });

  console.log("dealsData",dealsData);


  

  // Existing helper functions (formatCurrency, fetchGoogleCalendarEvents, etc.)
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

 

  
  useEffect(() => {
    const fetchIntegratedMeetings = async () => {
      if (googleAccessToken && leadsData?.getLeads) {
        try {
          const googleMeetings = await fetchGoogleCalendarEvents();
          const leads = leadsData.getLeads.items;
          
          const integrated = integrateLeadsAndMeetings(googleMeetings, leads);
          setIntegratedMeetings(integrated);
        } catch (error) {
          console.error('Error integrating meetings:', error);
        }
      }
    };

    fetchIntegratedMeetings();
  }, [googleAccessToken, leadsData]);



  const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  // Second UseEffect for Leads and Deals Processing
  useEffect(() => {
    // Comprehensive logging
    console.group('Leads and Deals Processing');
    console.log('Leads Data:', leadsData);
    console.log('Deals Data:', dealsData);
    console.log('Leads Loading:', leadsLoading);
    console.log('Deals Loading:', dealsLoading);
  
    // Early return if data is loading
    if (leadsLoading || dealsLoading) {
      console.log('Data is still loading...');
      console.groupEnd();
      return;
    }
  
       // Determine deals data with multiple fallback strategies
       let fetchedDeals: Deal[] = [];
    
       if (dealsData) {
         if (isDealsArray(dealsData)) {
           // Direct array of deals
           fetchedDeals = dealsData;
         } else if (dealsData.getDeals && Array.isArray(dealsData.getDeals.items)) {
           // GraphQL response with nested items
           fetchedDeals = dealsData.getDeals.items;
         } else if (dealsData.getDeals && Array.isArray(dealsData.getDeals)) {
           // Alternative GraphQL response structure
           fetchedDeals = dealsData.getDeals;
         } else if (dealsData.deals && Array.isArray(dealsData.deals)) {
           // Another possible response structure
           fetchedDeals = dealsData.deals;
         }
       }
   
       // Ensure leads data exists
       const safeLeadsData = leadsData?.getLeads || leadsData;
   
       // Early return if no leads data
       if (!safeLeadsData) {
         console.warn('No leads data available');
         console.groupEnd();
         return;
       }
   
       // Flexible data extraction with fallbacks
       const fetchedLeads = safeLeadsData.items || safeLeadsData;
   
       // Total leads calculation with multiple fallbacks
       const totalLeads = safeLeadsData.totalCount 
         || (Array.isArray(fetchedLeads) ? fetchedLeads.length : 0);
  
    // Lead stage counts
    const newCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "NEW").length;
    const inProgressCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "QUALIFIED").length;
    const followUpCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "NEGOTIATION").length;
    const closedWonCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "CLOSED_WON").length;
    const DealCount = fetchedLeads.filter((lead: Lead) =>lead.leadStage === "DEAL").length;
    // Tracking maps
    const campaignCountryMap: { [key: string]: number } = {};
    const leadSourceMap: { [key: string]: number } = {};
    const countryStats: { [key: string]: CountryLeadStats } = {};
    const leadToDealsMap: { [leadID: string]: Deal[] } = {};


    let totalSales = 0;
    let wonDeals = 0;
    let totalDeals = 0;
    let totalDaysToClose = 0;
    let closedWonDealsWithDates = 0;

  
    // Process deals mapping
    fetchedDeals.forEach((deal: Deal) => {
      if (deal && deal.leadID) {
        if (!leadToDealsMap[deal.leadID]) {
          leadToDealsMap[deal.leadID] = [];
        }
        leadToDealsMap[deal.leadID].push(deal);
      }
    });

    fetchedDeals.forEach((deal: Deal) => {
      const dealAmount = parseFloat(deal.dealAmount.replace(/[^0-9.-]+/g,"")) || 0;
      
      // Find corresponding lead
      const correspondingLead = fetchedLeads.find((lead: Lead) => lead.leadID === deal.leadID);

      if (correspondingLead) {
        if (correspondingLead.leadStage === "CLOSED_WON") {
          totalSales += dealAmount;
          wonDeals++;

          // Calculate days to close if both lead and deal have dates
          if (correspondingLead.initialContactDate && deal.dealEndDate) {
            const daysToClose = calculateDaysBetween(
              correspondingLead.initialContactDate, 
              deal.dealEndDate
            );
            totalDaysToClose += daysToClose;
            closedWonDealsWithDates++;
          }
        }


        totalDeals++;
      }
    });

    const winRate = totalDeals > 0 
    ? (wonDeals / totalDeals) * 100 
    : 0;

  const avgDaysToClose = closedWonDealsWithDates > 0
    ? totalDaysToClose / closedWonDealsWithDates
    : 0;
  
    // Team performance tracking
    const teamMap: { [key: string]: TeamMember & { revenueAmount: number } } = {};
  
    // Process leads
    fetchedLeads.forEach((lead: Lead) => {
      // Assigned user tracking
      const assignedUser = lead.leadAssignedTo?.name || "Unassigned";
      const userID = lead.leadAssignedTo?.userID || "unassigned";
  
      // Initialize team member if not exists
      if (!teamMap[userID]) {
        teamMap[userID] = {
          name: assignedUser,
          totalLead: 0,
          totalWon: 0,
          totalLost: 0,
          averageCloseRate: "0%",
          totalRevenue: "$0",
          revenueAmount: 0 
        };
      }
  
      // Campaign country tracking
      const country = lead.campaign?.campaignCountry || lead.country || "Unknown";
      campaignCountryMap[country] = (campaignCountryMap[country] || 0) + 1;
  
      // Lead source tracking
      const source = lead.leadSource || "Unknown";
      leadSourceMap[source] = (leadSourceMap[source] || 0) + 1;
  
      // Country lead stats logic
      if (lead.country) {
        if (!countryStats[lead.country]) {
          countryStats[lead.country] = {
            newLeads: 0,
            inProgress: 0,
            followUp: 0,
            closedWon: 0,
            closedLost: 0,
            dealLeads:0,
          };
        }
  
        switch (lead.leadStage) {
          case "NEW":
            countryStats[lead.country].newLeads++;
            break;
          case "QUALIFIED":
            countryStats[lead.country].inProgress++;
            break;
          case "NEGOTIATION":
            countryStats[lead.country].followUp++;
            break;
          case "CLOSED_WON":
            countryStats[lead.country].closedWon++;
            break;
          case "CLOSED_LOST":
            countryStats[lead.country].closedLost++;
            break;

          case "DEAL":
            countryStats[lead.country].dealLeads++;
            break;
          
        }
      }
  
      // Team performance tracking
      teamMap[userID].totalLead += 1;
  
      // Revenue and win/loss tracking
      if (lead.leadStage === "CLOSED_WON") {
        teamMap[userID].totalWon += 1;
  
        const leadsDeals = leadToDealsMap[lead.leadID] || [];
        
        leadsDeals.forEach(deal => {
          // Parse deal amount safely
          const amount = parseFloat(deal.dealAmount.replace(/[^0-9.-]+/g,"")) || 0;
          teamMap[userID].revenueAmount += amount;
          
          console.log(`Added $${amount} from deal ${deal.dealID} to ${assignedUser}'s revenue (CLOSED_WON lead)`);
        });
      } else if (lead.leadStage === "CLOSED_LOST") {
        teamMap[userID].totalLost += 1;
      }
    });
  
    // Calculate team performance metrics
    Object.keys(teamMap).forEach(userID => {
      const teamMember = teamMap[userID];
  
      // Calculate close rate
      const totalClosed = teamMember.totalWon + teamMember.totalLost;
      const closeRate = totalClosed > 0 
        ? ((teamMember.totalWon / totalClosed) * 100).toFixed(1) 
        : "0";
      teamMember.averageCloseRate = `${closeRate}%`;
  
      // Format revenue
      teamMember.totalRevenue = formatCurrency(teamMember.revenueAmount);
    });
  
    // Convert team map to array for UI
    const teamArray = Object.values(teamMap).map(({ revenueAmount, ...rest }) => rest);
  
    // Set state values
    setNewLeads(newCount);
    setInProgressLeads(inProgressCount);
    setFollowUpLeads(followUpCount);
    setClosedWonLeads(closedWonCount);
    setDealLead(DealCount);
    setCampaignCountryCounts(campaignCountryMap);
    setLeadSourceCounts(leadSourceMap);
    setCountryLeadStats(countryStats);
    setTeamPerformance(teamArray);
    setLeadPerformanceMetrics({
      totalSales,
      winRate,
      avgDaysToClose
    });
  
    // Lead conversion calculation
    if (totalLeads > 0) {
      setLeadConversion((closedWonCount / totalLeads) * 100);
    }
  
    console.groupEnd();
  }, [leadsData, dealsData, leadsLoading, dealsLoading]);
  
  // Existing helper methods
  const getOtherLeadSources = () => {
    let otherCount = 0;
    Object.keys(leadSourceCounts).forEach(source => {
      if (source !== "linkedin" && source !== "Social Media" && source !== "Website") {
        otherCount += leadSourceCounts[source] || 0;
      }
    });
    return otherCount;
  };
  
  // Return object with all processed data and methods
  return {
    leads: leadsData?.getLeads?.items || [],
    loading: leadsLoading || dealsLoading,
    error: leadsError || dealsError ? (leadsError?.message || dealsError?.message) : null,
    totalItems: leadsData?.getLeads?.totalCount || 0,
    integratedMeetings,
    googleMeetingsLoading,
    googleMeetingsError,
    newLeads,
    inProgressLeads,
    followUpLeads,
    closedWonLeads,
    dealLead,
    leadConversion,
    campaignCountryCounts,
    leadSourceCounts,
    teamPerformance,
    countryLeadStats,
    leadPerformanceMetrics,


    setTimeFilter,
    currentTimeFilter: selectedTimeFilter,
    
    getTargetedLeadSources: () => {
      const linkedin = leadSourceCounts["linkedin"] || 0;
      const socialMedia = leadSourceCounts["Social Media"] || 0;
      const website = leadSourceCounts["Website"] || 0;
      const other = getOtherLeadSources();
      
      return {
        linkedin,
        socialMedia,
        website,
        other
      };
    }

    
  };
};

export default leadsApiService;