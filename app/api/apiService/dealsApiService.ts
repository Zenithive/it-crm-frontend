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

interface DateFilter {
  dealStartDateMin?: string;
  dealStartDateMax?: string;
}

const useDealsApiService = () => {
  const [totalDealAmount, setTotalDealAmount] = useState<number>(0);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const user = useSelector((state: RootState) => state.auth);

  // Function to format date as YYYY-MM-DD
  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Function to get date range based on filter type
  function getDateRangeForFilter(filterType: string): DateFilter | null {
    if (!filterType || filterType === "none") {
      return null;
    }
    
    const today = new Date();
    const startDate = new Date(today);
    
    if (filterType === "yearly") {
      // Set start date to 1 year ago from today
      startDate.setFullYear(today.getFullYear() - 1);
    } else if (filterType === "half-yearly") {
      // Set start date to 6 months ago from today
      startDate.setMonth(today.getMonth() - 6);
    } else {
      return null;
    }
    
    return {
      dealStartDateMin: formatDate(startDate),
      dealStartDateMax: formatDate(today)
    };
  }

  // Create filter object for the GraphQL query
  const createQueryFilter = () => {
    if (dateFilter) {
      return { ...dateFilter };
    }
    return null;
  };

  // Update date filter when active filter changes
  useEffect(() => {
    setDateFilter(getDateRangeForFilter(activeFilter || ""));
  }, [activeFilter]);

  const { data, loading, error, refetch } = useQuery<DealsResponse>(GET_DEALS, {
    variables: {
      filter: createQueryFilter(),
      pagination: { page: 1, pageSize: 10 },
      sort: { field: "dealStartDate", order: "ASC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onError: (err) => console.error("Error fetching deals:", err),
  });

  // Function to update filter type
  const updateFilter = (filterType: string) => {
    setActiveFilter(filterType === "none" ? null : filterType);
  };

  // Refetch data when date filter changes
  useEffect(() => {
    refetch({
      filter: createQueryFilter(),
      pagination: { page: 1, pageSize: 10 },
      sort: { field: "dealStartDate", order: "ASC" },
    });
  }, [dateFilter, refetch]);

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
    }
  }, [dealData]);

  useEffect(() => {
    if (data?.getDeals) {
      const fetchedDeals = data.getDeals;
      const totalAmount = fetchedDeals.reduce((sum, deal) => sum + (parseFloat(deal.dealAmount) || 0), 0);
      setTotalDealAmount(totalAmount);
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
    activeFilter,
    updateFilter,
    dateFilter
  };
};

export default useDealsApiService;