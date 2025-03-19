import { useQuery } from "@apollo/client";
import { GET_VENDORS } from "../../../graphQl/queries/getVendors.queries";
import { GetVendorsResponse } from "../../types/vendors.types";

interface UseVendorsParams {
  page?: number;
  pageSize?: number;
  companyName?: string | null;
  status?: string;
  skillIDs?: string[];
  search?: string | null;
}

export const useVendors = ({
  page = 1,
  pageSize = 10,
  companyName = null,
  status = "ACTIVE",
  skillIDs = [],
  search = null
}: UseVendorsParams = {}) => {
  // Clean up search parameter
  const cleanSearch = search && search.trim() ? search.trim() : null;

  const { data, loading, error, refetch } = useQuery<GetVendorsResponse>(GET_VENDORS, {
    variables: { 
      page, 
      pageSize, 
      companyName, 
      status, 
      skillIDs, 
      search: cleanSearch 
    },
    fetchPolicy: "network-only", // Ensures fresh data with each search
  });

  console.log(`useVendors variables:`, { page, pageSize, companyName, status, skillIDs, search: cleanSearch });
  console.log(`useVendors response:`, data);
  
  return {
    data,
    loading,
    error,
    totalItems: data?.getVendors?.totalCount || 0,
    refetch,
  };
};