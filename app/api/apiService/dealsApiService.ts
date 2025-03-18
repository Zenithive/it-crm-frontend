import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_DEALS, GET_DEAL } from "../../../graphQl/queries/deals.queries";

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

interface DealsResponse {
  getDeals: Deal[];
}

interface DealResponse {
  getDeal: Deal;
}

const useDealsApiService = () => {
  const [totalDealAmount, setTotalDealAmount] = useState<number>(0);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const user = useSelector((state: RootState) => state.auth);

  console.log("Auth State:", user);
  console.log("Token being used:", user.token);

  const { data, loading, error } = useQuery<DealsResponse>(GET_DEALS, {
    variables: {
      filter: null,
      pagination: { page: 1, pageSize: 10 },
      sort: { field: "dealAmount", order: "DESC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onError: (err) => console.error("Error fetching deals:", err),
  });

  const [fetchDealById, { data: dealData, loading: dealLoading, error: dealError }] = useLazyQuery<DealResponse>(
    GET_DEAL,
    {
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
      onError: (err) => console.error("Error fetching deal:", err),
    }
  );

  useEffect(() => {
    if (dealData?.getDeal) {
      setSelectedDeal(dealData.getDeal);
      console.log("Fetched Deal:", dealData.getDeal);
    }
  }, [dealData]);

  useEffect(() => {
    if (data?.getDeals) {
      const fetchedDeals = data.getDeals;

      const totalAmount = fetchedDeals.reduce((sum, deal) => sum + (parseFloat(deal.dealAmount) || 0), 0);
      setTotalDealAmount(totalAmount);

      console.log("Fetched Deals:", fetchedDeals);
      console.log("Total Deal Amount:", totalAmount);
    }
  }, [data]);

  return {
    deals: data?.getDeals || [],
    loading,
    error: error ? error.message : null,
    totalDealAmount,
    fetchDealById: (dealID: string) => fetchDealById({ variables: { dealID } }),
    selectedDeal,
    dealLoading,
    dealError: dealError ? dealError.message : null,
  };
};

export default useDealsApiService;
