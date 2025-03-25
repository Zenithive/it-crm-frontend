import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_DEALS, GET_DEAL } from "../../../graphQl/queries/deals.queries";
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
  
}

interface Lead {
  leadID: string;
  country: string;
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

const useDealsApiService = () => {
  const [totalDealAmount, setTotalDealAmount] = useState<number>(0);
  const [dealsByCountry, setDealsByCountry] = useState<{[country: string]: Deal[]}>({});

  const user = useSelector((state: RootState) => state.auth);

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

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError
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

  useEffect(() => {
    if (dealsData?.getDeals?.items && leadsData?.getLeads.items) {
      const leadsMap = new Map(
        leadsData.getLeads.items.map(lead => [lead.leadID, lead.country])
      );

      const countryDealsMap: {[country: string]: Deal[]} = {};

      dealsData.getDeals.items.forEach(deal => {
        const country = leadsMap.get(deal.leadID);
        if (country) {
          if (!countryDealsMap[country]) {
            countryDealsMap[country] = [];
          }
          countryDealsMap[country].push(deal);
        }
      });

      setDealsByCountry(countryDealsMap);
    }
  }, [dealsData, leadsData]);

  useEffect(() => {
    if (dealsData?.getDeals?.items) {
      const totalAmount = dealsData.getDeals.items.reduce(
        (sum, deal) => sum + (parseFloat(deal.dealAmount) || 0), 
        0
      );
      setTotalDealAmount(totalAmount);
    }
  }, [dealsData]);

  return {
    deals: dealsData?.getDeals?.items || [],
    dealsByCountry,
    loading: dealsLoading || leadsLoading,
    error: dealsError?.message || leadsError?.message,
    totalDealAmount,
    totalLeads: leadsData?.getLeads.totalCount || 0,
  };
};

export default useDealsApiService;