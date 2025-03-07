import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_DEALS } from "../../../graphQl/queries/deals.queries";

interface Deal {
  dealAmount: string;
}

const dealsApiService = () => {
  const [totalDealAmount, setTotalDealAmount] = useState(0);
  
  const user = useSelector((state: RootState) => state.auth);

  console.log("Auth State:", user);
  console.log("Token being used:", user.token);

  const { data, loading, error } = useQuery(GET_DEALS, {
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

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
  };
};

export default dealsApiService;
