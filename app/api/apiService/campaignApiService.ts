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

interface CampaignFilter {
  campaignName?: string;
  campaignCountry?: string;
  region?: string;
  industry?: string;
}

const useCampaigns = (
  currentPage: number,
  itemsPerPage: number,
  searchQuery?: string,
  regionFilter?: string,
  industryFilter?: string,
  fetchAll: boolean = false
) => {
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [campaignCountryCounts, setCampaignCountryCounts] = useState<{ [key: string]: number }>({});
  const user = useSelector((state: RootState) => state.auth);

  // Build filter object
  const filter: CampaignFilter = {};
  if (searchQuery) {
    filter.campaignName = searchQuery; // Assuming search targets campaignName
  }
  if (regionFilter) {
    filter.region = regionFilter;
  }
  if (industryFilter) {
    filter.industry = industryFilter;
  }

  useEffect(() => {
    console.log(`Pagination parameters: page=${currentPage}, pageSize=${itemsPerPage}`);
    console.log(`Filter parameters:`, filter);
  }, [currentPage, itemsPerPage, searchQuery, regionFilter, industryFilter]);

  const { data, loading, error, refetch } = useQuery(GET_CAMPAIGNS, {
    variables: {
      filter: Object.keys(filter).length > 0 ? filter : null, // Only send filter if it has values
      pagination: fetchAll ? null : { page: currentPage, pageSize: itemsPerPage },
      sort: { field: "campaignName", order: "ASC" }, // Optional: Add default sort
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage, searchQuery, regionFilter, industryFilter, refetch]);

  useEffect(() => {
    if (data && data.getCampaigns) {
      const fetchedCampaigns = data.getCampaigns.items || [];
      const totalCount = data.getCampaigns.totalCount || 0;

      setTotalCampaigns(totalCount);

      // Calculate country counts (optional feature)
      const counts = fetchedCampaigns.reduce((acc: { [key: string]: number }, campaign: Campaign) => {
        acc[campaign.campaignCountry] = (acc[campaign.campaignCountry] || 0) + 1;
        return acc;
      }, {});
      setCampaignCountryCounts(counts);
    }
  }, [data]);

  return {
    campaigns: data?.getCampaigns?.items || [],
    loading,
    error: error ? error.message : null,
    totalItems: totalCampaigns,
    campaignCountryCounts,
  };
};

export default useCampaigns;