import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_DEALS } from "../../../graphQl/queries/deals.queries";
import { GET_LEADS } from "../../../graphQl/queries/leads.queries";

export interface Deal {
  dealID: string;
  dealName: string;
  leadID: string;
  dealStartDate: string;
  dealEndDate: string;
  projectRequirements: string;
  dealAmount: string;
  dealStatus: string;
  userID: string;
  user: {
    userID: string;
    name: string;
  };
}

interface Lead {
  leadID: string;
  country: string;
}

interface SalesTeamPerformance {
  name: string;
  deals: number;
  amount: string;
  userID: string;
}

interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

interface PerformanceMap {
  [userID: string]: TeamMember;
}

interface DealsResponse {
  getDeals: {
    items: Deal[];
    totalCount: number;
  };
}

interface LeadsResponse {
  getLeads: {
    items: Lead[];
    totalCount: number;
  };
}
interface DateFilter {
  dealStartDateMin?: string;
  dealStartDateMax?: string;
}
export const useSalesTeamData = (page: number, pageSize: number,dateFilter?: DateFilter) => {
  const user = useSelector((state: RootState) => state.auth);

  const {
    data: dealsData,
    loading: dealsLoading,
    error: dealsError,
  } = useQuery<DealsResponse>(GET_DEALS, {
    variables: {
      filter: dateFilter ? {
        dealStartDateMin: dateFilter.dealStartDateMin,
        dealStartDateMax: dateFilter.dealStartDateMax
      } : null,
      pagination: { page, pageSize },
      sort: { field: "dealAmount", order: "ASC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onError: (err) => console.error("Error fetching deals:", err),
  });

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
  } = useQuery<LeadsResponse>(GET_LEADS, {
    variables: {
      filter: null,
      pagination: { page: 1, pageSize: 1000 },
      sort: null,
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onError: (err) => console.error("Error fetching leads:", err),
  });

  const isLoading = dealsLoading || leadsLoading;
  const error = dealsError?.message || leadsError?.message;

  const salesTeamData: SalesTeamPerformance[] = [];
  const totalCount = dealsData?.getDeals?.totalCount || 0;

  if (!isLoading && dealsData?.getDeals?.items) {
    // Group deals by user
    const dealsByUser: { [userID: string]: Deal[] } = {};
    dealsData.getDeals.items.forEach(deal => {
      if (!dealsByUser[deal.userID]) {
        dealsByUser[deal.userID] = [];
      }
      dealsByUser[deal.userID].push(deal);
    });

    // Create a map of unique users from deals
    const userMap = new Map<string, { name: string; userID: string }>();
    dealsData.getDeals.items.forEach(deal => {
      if (deal.user && deal.user.userID) {
        userMap.set(deal.user.userID, deal.user);
      }
    });

    // Create sales team data for each unique user
    userMap.forEach(user => {
      const userDeals = dealsByUser[user.userID] || [];
      
      salesTeamData.push({
        name: user.name,
        userID: user.userID,
        deals: userDeals.filter(deal => deal.dealStatus === 'Won').length,
        amount: userDeals
          .filter(deal => deal.dealStatus === 'Won')
          .reduce((sum, deal) => sum + parseFloat(deal.dealAmount), 0)
          .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      });
    });
  }

  return {
    salesTeamData,
    totalCount,
    isLoading,
    error,
  };
};