import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS } from "../../../graphQl/queries/leads.queries";
import { GET_DEALS } from "../../../graphQl/queries/deals.queries";

// Interfaces (unchanged from original)
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

// Flexible interface for deals response
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



const leadsApiService = (currentPage: number, itemsPerPage: number, fetchAll: boolean = false,startDate?: string,
  endDate?: string) => {
  // State declarations (unchanged)
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
  const [googleMeetingsLoading, setGoogleMeetingsLoading] = useState(false);
  const [googleMeetingsError, setGoogleMeetingsError] = useState<string | null>(null);
  
  // Get user from Redux store
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
  // Fetch Leads Query
  const { 
    data: leadsData, 
    loading: leadsLoading, 
    error: leadsError 
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
      error: dealsError 
    } = useQuery<DealsResponse>(GET_DEALS, {
      variables: {
        filter: null,
        pagination: { page: 1, pageSize: 1000 },
        sort: { field: "dealAmount", order: "ASC" },
      },
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

  // Google Calendar Events Fetching (unchanged from original)
  const fetchGoogleCalendarEvents = async (): Promise<Meeting[]> => {
    if (!googleAccessToken) return [];

    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      const sevenDaysLater = new Date(now);
      sevenDaysLater.setDate(now.getDate() + 7);

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${sevenDaysAgo.toISOString()}&timeMax=${sevenDaysLater.toISOString()}&maxResults=50&orderBy=startTime&singleEvents=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.status}`);
      }

      const data = await response.json();
      
      return data.items
        .filter((event: any) => 
          event.conferenceData || 
          (event.summary && 
            (event.summary.toLowerCase().includes("meeting") || 
             event.summary.toLowerCase().includes("call")))
        )
        .map((event: any) => ({
          title: event.summary || "Untitled Meeting",
          time: formatEventTime(event),
          date: new Date(event.start?.dateTime || event.start?.date),
          meetingLink: getMeetingLink(event),
          attendees: event.attendees || [],
          organizer: event.organizer?.email || ''
        }));

    } catch (error) {
      console.error("Error fetching Google Calendar events:", error);
      return [];
    }
  };

  // Helper functions for event formatting (unchanged)
  const formatEventTime = (event: any): string => {
    const start = new Date(event.start?.dateTime || event.start?.date);
    const end = new Date(event.end?.dateTime || event.end?.date);
    
    if (!event.start?.dateTime) {
      return "All day";
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);
    
    let datePrefix = "";
    if (startDate.getTime() === today.getTime()) {
      datePrefix = "Today, ";
    } else if (startDate.getTime() === tomorrow.getTime()) {
      datePrefix = "Tomorrow, ";
    } else {
      datePrefix = start.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ", ";
    }
    
    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return `${datePrefix}${startTime} - ${endTime}`;
  };

  const getMeetingLink = (event: any): string => {
    if (event.conferenceData && event.conferenceData.entryPoints) {
      const videoEntry = event.conferenceData.entryPoints.find(
        (entry: any) => entry.entryPointType === "video"
      );
      if (videoEntry) {
        return videoEntry.uri;
      }
    }
    
    if (event.description) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matches = event.description.match(urlRegex);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    
    return "";
  };

  // Integrate Leads and Meetings (unchanged)
  const integrateLeadsAndMeetings = (
    meetings: Meeting[], 
    leads: Lead[]
  ): IntegratedMeeting[] => {
    const integrated: IntegratedMeeting[] = [];

    meetings.forEach(meeting => {
      const attendeeEmails = meeting.attendees
        .filter(attendee => attendee.email !== meeting.organizer)
        .map(attendee => attendee.email.toLowerCase());
        
      const matchedLeads = leads.filter(lead => 
        lead.email && attendeeEmails.includes(lead.email.toLowerCase())
      );

      if (matchedLeads.length > 0) {
        matchedLeads.forEach(lead => {
          integrated.push({
            lead,
            meeting: {
              title: meeting.title,
              time: meeting.time,
              date: meeting.date,
              meetingLink: meeting.meetingLink,
              attendees: meeting.attendees,
              organizer: meeting.organizer
            }
          });
        });
      }
    });

    return integrated;
  };

  // First UseEffect for Google Calendar Integration
  useEffect(() => {
    const fetchIntegratedMeetings = async () => {
      if (googleAccessToken && leadsData?.getLeads) {
        try {
          setGoogleMeetingsLoading(true);
          const googleMeetings = await fetchGoogleCalendarEvents();
          const leads = leadsData.getLeads.items;
          
          const integrated = integrateLeadsAndMeetings(googleMeetings, leads);
          setIntegratedMeetings(integrated);
        } catch (error) {
          console.error('Error integrating meetings:', error);
          setGoogleMeetingsError('Failed to integrate meetings');
        } finally {
          setGoogleMeetingsLoading(false);
        }
      }
    };

    fetchIntegratedMeetings();
  }, [googleAccessToken, leadsData]);
  
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
  
    // Process deals mapping
    fetchedDeals.forEach((deal: Deal) => {
      if (deal && deal.leadID) {
        if (!leadToDealsMap[deal.leadID]) {
          leadToDealsMap[deal.leadID] = [];
        }
        leadToDealsMap[deal.leadID].push(deal);
      }
    });
  
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