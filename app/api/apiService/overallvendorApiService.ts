import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_VENDORS } from "../../../graphQl/queries/getVendors.queries";
import { GetVendorsResponse } from "../../types/vendors.types";
import { UPDATE_VENDOR_MUTATION } from "../../../graphQl/mutation/updateVendor.mutation"; 
import { useMutation } from "@apollo/client";

interface UseVendorsParams {
  page?: number;
  pageSize?: number;
  address?: string;
  status?: string;
  rating?: string;
  search?: string;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
}

interface UpdateVendorInput {
  vendorID: string;
  companyName?: string;
  status?: string;
  paymentTerms?: string;
  address?: string;
  gstOrVatDetails?: string;
  notes?: string;
  // location?: string;
  skillIDs?: string[];
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

  const variables = {
    page,
    pageSize,
    search: search?.trim() || undefined, // Pass search directly
    status: status ? status.toUpperCase() : undefined, // Map to enum
    // Note: address and rating aren't directly supported by GET_VENDORS
  };

  const { data, loading, error, refetch } = useQuery<GetVendorsResponse>(GET_VENDORS, {
    variables,
    context: { headers: { Authorization: `Bearer ${token}` } },
    fetchPolicy: "network-only",
  });

  // Client-side filtering for rating and address (if backend doesn't support)
  const filteredItems =
    data?.getVendors?.items
      .filter((vendor: any) => {
        // Filter by rating
        if (rating) {
          const ratingValue = parseInt(rating.replace("star", ""), 10);
          const vendorRating = vendor.performanceRatings?.length || 0; // Adjust if rating is an average
          return vendorRating === ratingValue;
        }
        return true;
      })
      .filter((vendor: any) => {
        // Filter by address (client-side, since GET_VENDORS doesn't support it natively)
        if (address) {
          return vendor.address?.toLowerCase().includes(address.toLowerCase());
        }
        return true;
      }) || [];

  console.log("useVendors variables:", variables);
  console.log("useVendors response:", { data, filteredItems });

  return {
    vendors: filteredItems,
    totalItems: data?.getVendors?.totalCount || 0, // Note: totalCount won't reflect client-side filters
    loading,
    error: error ? error.message : null,
    refetch,
  };
};

export const useUpdateVendor = () => {
  const [updateVendorMutation, { loading, error }] = useMutation(UPDATE_VENDOR_MUTATION);

  const updateVendor = async (input: UpdateVendorInput) => {
    try {
      const response = await updateVendorMutation({
        variables: {
          ...input,
        },
      });
      return response.data.updateVendor;
    } catch (err) {
      throw new Error("Failed to update vendor");
    }
  };

  return { updateVendor, loading, error };
};