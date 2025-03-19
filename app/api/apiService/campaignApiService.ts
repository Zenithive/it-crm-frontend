import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_CAMPAIGNS } from "../../../graphQl/queries/getCampaigns.queries";

interface Campaign {
  campaignID: string;
  campaignName: string;
  campaignCountry: string;
  users?: Array<{
    userID: string;
    name: string;
    email: string;
  }>;
}

const useCampaigns = (currentPage: number, itemsPerPage: number, fetchAll: boolean = false) => {
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [campaignCountryCounts, setCampaignCountryCounts] = useState<{ [key: string]: number }>({});
  const user = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    console.log(`Pagination parameters: page=${currentPage}, pageSize=${itemsPerPage}`);
  }, [currentPage, itemsPerPage]);

  const { data, loading, error, refetch } = useQuery(GET_CAMPAIGNS, {
    variables: {
      filter: {},
      pagination: fetchAll ? null : { page: currentPage, pageSize: itemsPerPage },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true
  });
  
  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (data && data.getCampaigns) {
      const fetchedCampaigns = data.getCampaigns.items || [];
      const totalCount = data.getCampaigns.totalCount || 0;
      
      setTotalCampaigns(totalCount);
      
    }
  }, [data, currentPage]);

  return {
    campaigns: data?.getCampaigns?.items || [],
    loading,
    error: error ? error.message : null,
    totalItems: totalCampaigns,
    campaignCountryCounts,
  };
};

export default useCampaigns;
