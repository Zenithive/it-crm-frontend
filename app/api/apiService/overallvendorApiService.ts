import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_VENDORS } from "../../../graphQl/queries/getVendors.queries";
import { GetVendorsResponse } from "../../types/vendors.types";

interface UseVendorsParams {
  page?: number;
  pageSize?: number;
  address?: string; // Maps to address
  status?: string;
  rating?: string; // Will be handled client-side or requires backend extension
  search?: string;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
}

export const useVendors = ({
  page = 1,
  pageSize = 10,
  address,
  status,
  rating,
  search,
  sortField = "createdAt",
  sortOrder = "DESC",
}: UseVendorsParams = {}) => {
  const { token } = useSelector((state: RootState) => state.auth);

  // Build filter object based on available GET_VENDORS filters
  const filter: any = {};

  // Add status filter if specified
  if (status) {
    filter.status = status.toUpperCase(); // Ensure enum compatibility (e.g., "ACTIVE")
  }

  // Add search filter if there's a query (can include location if backend supports)
  const cleanSearch = search && search.trim() ? search.trim() : null;
  if (cleanSearch) {
    filter.search = cleanSearch;
  }

  // Note: location and rating are not directly supported by GET_VENDORS filter
  // We'll pass location to search for now, assuming backend searches address
  if (address && !search) {
    filter.search = address;
  }

  const { data, loading, error, refetch } = useQuery<GetVendorsResponse>(GET_VENDORS, {
    variables: {
      page,
      pageSize,
      filter, // Use filter object instead of individual params
      sort: { field: sortField, order: sortOrder },
    },
    context: { headers: { Authorization: `Bearer ${token}` } },
    fetchPolicy: "network-only",
  });

  // Client-side filtering for rating since it's not supported by GET_VENDORS
  const filteredItems = data?.getVendors?.items
    .filter((vendor: any) => {
      if (!rating) return true;
      const ratingValue = parseInt(rating.replace("star", ""), 10);
      const vendorRating = vendor.performanceRatings?.length || 0; // Adjust if rating is an average
      return vendorRating === ratingValue;
    }) || [];

  console.log(`useVendors variables:`, { page, pageSize, filter, sort: { field: sortField, order: sortOrder } });
  console.log(`useVendors response:`, { data, filteredItems });

  return {
    vendors: filteredItems,
    totalItems: data?.getVendors?.totalCount || 0, // Note: totalCount won't reflect client-side rating filter
    loading,
    error: error ? error.message : null,
    refetch,
  };
};