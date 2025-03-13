import { useQuery } from "@apollo/client";
import { GET_VENDORS } from "../../../graphQl/queries/getVendors.queries";
import { GetVendorsResponse } from "../../types/vendors.types";


export const useVendors = (
  page: number = 1,
  pageSize: number = 10,
  companyName: string | null = null,
  status: string = "ACTIVE",
  skillIDs: string[] = [],
  search: string | null = null
) => {
  const { data, loading, error, refetch } = useQuery<GetVendorsResponse>(GET_VENDORS, {
    variables: { page, pageSize, companyName, status, skillIDs, search },
  });

  return {
    data,
    loading,
    error,
    totalItems: data?.getVendors?.totalCount || 0, // Corrected to totalCount
    refetch,
  };
};

