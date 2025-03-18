import { useQuery } from "@apollo/client";
import { GET_CAMPAIGNS } from "../../../graphQl/queries/getCampaigns.queries";

export const useCampaigns = (filters = {}, pagination = { page: 1, limit: 10 }) => {
  const { data, loading, error } = useQuery(GET_CAMPAIGNS, {
    variables: { filters, pagination },
    fetchPolicy: "network-only", // This ensures fresh data is fetched each time
  });

  // Important: Check the actual path to your data based on your GraphQL response structure
  return {
    campaignsdata: data?.getCampaigns?.items || [], // Match the structure from your GraphQL query
    totalCount: data?.getCampaigns?.totalCount || 0,
    loading,
    error,
  };
};