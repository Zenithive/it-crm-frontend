import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS } from "../../../graphQl/queries/leads.queries";
import { GET_DEALS } from "../../../graphQl/queries/deals.queries";

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
}

interface Deal {
  dealID: string;
  dealName: string;
  leadID: string;
  dealAmount: string; 
  dealStatus: string;
}

interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

const leadsApiService = (currentPage: number, itemsPerPage: number, fetchAll: boolean = false) => {
  const [newLeads, setNewLeads] = useState(0);
  const [inProgressLeads, setInProgressLeads] = useState(0);
  const [followUpLeads, setFollowUpLeads] = useState(0);
  const [closedWonLeads, setClosedWonLeads] = useState(0);
  const [leadConversion, setLeadConversion] = useState(0);
  const [campaignCountryCounts, setCampaignCountryCounts] = useState<{ [key: string]: number }>({});
  const [leadSourceCounts, setLeadSourceCounts] = useState<{ [key: string]: number }>({});
  const [teamPerformance, setTeamPerformance] = useState<TeamMember[]>([]);
  
  const user = useSelector((state: RootState) => state.auth);
  
  const { data: leadsData, loading: leadsLoading, error: leadsError } = useQuery(GET_LEADS, {
    variables: {
      filter: {},
      pagination: fetchAll ? null : { page: currentPage, pageSize: itemsPerPage },
      sort: { field: "EMAIL", order: "ASC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });
  
  const { data: dealsData, loading: dealsLoading, error: dealsError } = useQuery(GET_DEALS, {
    variables: {
      filter: {},
      pagination: null,
      sort: { field: "dealAmount", order: "DESC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });
  

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  useEffect(() => {
  
    if (leadsData?.getLeads && dealsData?.getDeals) {
      const fetchedLeads = leadsData.getLeads.items;
      const fetchedDeals = dealsData.getDeals;
      const totalLeads = leadsData.getLeads.totalCount || 0;
      
      const newCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "NEW").length;
      const inProgressCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "IN_PROGRESS").length;
      const followUpCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "FOLLOW_UP").length;
      const closedWonCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "CLOSED_WON").length;
      
      const campaignCountryMap: { [key: string]: number } = {};
      const leadSourceMap: { [key: string]: number } = {};
      
      
      const leadToDealsMap: { [leadID: string]: Deal[] } = {};
      fetchedDeals.forEach((deal: Deal) => {
        if (!leadToDealsMap[deal.leadID]) {
          leadToDealsMap[deal.leadID] = [];
        }
        leadToDealsMap[deal.leadID].push(deal);
      });
      
      console.log("All deals:", fetchedDeals);
      console.log("Lead to deals map:", leadToDealsMap);
      
 
      const teamMap: { [key: string]: TeamMember & { revenueAmount: number } } = {};
      
      
      fetchedLeads.forEach((lead: Lead) => {
        const assignedUser = lead.leadAssignedTo?.name || "Unassigned";
        const userID = lead.leadAssignedTo?.userID || "unassigned";
        
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
        
        // Track campaign countries
        const country = lead.campaign?.campaignCountry || "Unknown";
        campaignCountryMap[country] = (campaignCountryMap[country] || 0) + 1;
        
        // Track lead sources exactly as they appear in the data
        const source = lead.leadSource || "Unknown";
        leadSourceMap[source] = (leadSourceMap[source] || 0) + 1;
        
        // Increment total leads for this user
        teamMap[userID].totalLead += 1;
        
        // Track won/lost leads
        if (lead.leadStage === "CLOSED_WON") {
          teamMap[userID].totalWon += 1;
          
          // Only calculate revenue for CLOSED_WON leads
          const leadsDeals = leadToDealsMap[lead.leadID] || [];
          
          if (leadsDeals.length > 0) {
            console.log(`Found ${leadsDeals.length} deals for CLOSED_WON lead ${lead.leadID} assigned to ${assignedUser}`);
          }
          
          leadsDeals.forEach(deal => {
            // Parse deal amount as a number
            const amount = parseFloat(deal.dealAmount) || 0;
            teamMap[userID].revenueAmount += amount;
            console.log(`Added $${amount} from deal ${deal.dealID} to ${assignedUser}'s revenue (CLOSED_WON lead)`);
          });
        } else if (lead.leadStage === "CLOSED_LOST") {
          teamMap[userID].totalLost += 1;
        }
      });
      
      // Second pass: Calculate close rates and format revenue
      Object.keys(teamMap).forEach(userID => {
        const teamMember = teamMap[userID];
        
        // Calculate close rate
        const totalClosed = teamMember.totalWon + teamMember.totalLost;
        const closeRate = totalClosed > 0 
          ? ((teamMember.totalWon / totalClosed) * 100).toFixed(1) 
          : "0";
        teamMember.averageCloseRate = `${closeRate}%`;
        
        // Format the revenue
        teamMember.totalRevenue = formatCurrency(teamMember.revenueAmount);
        
        console.log(`Final stats for ${teamMember.name}: Leads=${teamMember.totalLead}, Won=${teamMember.totalWon}, Revenue=${teamMember.totalRevenue}, Raw Revenue=${teamMember.revenueAmount}`);
      });
      
      // Convert team map to array for the UI
      const teamArray = Object.values(teamMap).map(({ revenueAmount, ...rest }) => rest);
      
      setNewLeads(newCount);
      setInProgressLeads(inProgressCount);
      setFollowUpLeads(followUpCount);
      setClosedWonLeads(closedWonCount);
      setCampaignCountryCounts(campaignCountryMap);
      setLeadSourceCounts(leadSourceMap);
      setTeamPerformance(teamArray);
      
      if (totalLeads > 0) {
        setLeadConversion((closedWonCount / totalLeads) * 100);
      }
    }
  }, [leadsData, dealsData]);
  
  const getOtherLeadSources = () => {
    let otherCount = 0;
    Object.keys(leadSourceCounts).forEach(source => {
      if (source !== "linkedin" && source !== "Social Media" && source !== "Website") {
        otherCount += leadSourceCounts[source] || 0;
      }
    });
    return otherCount;
  };
  
  return {
    leads: leadsData?.getLeads?.items || [],
    loading: leadsLoading || dealsLoading,
    error: leadsError || dealsError ? (leadsError?.message || dealsError?.message) : null,
    totalItems: leadsData?.getLeads?.totalCount || 0,
    newLeads,
    inProgressLeads,
    followUpLeads,
    closedWonLeads,
    leadConversion,
    campaignCountryCounts,
    leadSourceCounts,
    teamPerformance,
    
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