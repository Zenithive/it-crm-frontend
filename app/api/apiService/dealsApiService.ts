import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_DEALS, GET_DEAL } from "../../../graphQl/queries/deals.queries";

interface Deal {
  dealID: string;
  dealName: string;
  leadID: string;
  dealStartDate: string;
  dealEndDate: string;
  projectRequirements: string;
  dealAmount: string;
  dealStatus: string;
}

const dealsApiService = () => {
  const [totalDealAmount, setTotalDealAmount] = useState(0);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  
  const user = useSelector((state: RootState) => state.auth);

  console.log("Auth State:", user);
  console.log("Token being used:", user.token);

  const { data, loading, error } = useQuery(GET_DEALS, {
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
  });

  const fetchDealById = (dealID: string) => {
    const { data, loading, error } = useQuery(GET_DEAL, {
      variables: { dealID },
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });

    useEffect(() => {
      if (data && data.getDeal) {
        setSelectedDeal(data.getDeal);
        console.log("Fetched Deal:", data.getDeal);
      }
    }, [data]);

    return { selectedDeal, loading, error };
  };

  useEffect(() => {
    if (data && data.getDeals) {
      const fetchedDeals = data.getDeals;

      const totalDealAmount = fetchedDeals.reduce((sum: number, deal: Deal) => sum + Number(deal.dealAmount || 0), 0);
      setTotalDealAmount(totalDealAmount);

      console.log("Fetched Deals:", fetchedDeals);
      console.log("Total Deal Amount:", totalDealAmount);
    }
  }, [data]);

  return {
    deals: data?.getDeals || [],
    loading,
    error: error ? error.message : null,
    totalDealAmount,
    fetchDealById,
  };
};

export default dealsApiService;
