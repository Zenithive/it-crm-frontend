import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_VENDORS, GET_VENDOR_BY_ID } from "../../../graphQl/queries/getVendors.queries";
import { UPDATE_VENDOR_MUTATION } from "../../../graphQl/mutation/updateVendor.mutation";
import client from "../../../lib/appoloClient";

interface UseVendorsParams {
  page?: number;
  pageSize?: number;
  address?: string;
  status?: string;
  rating?: string;
  search?: string;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
  vendorId?: string;
}

interface PerformanceRatingInput {
  performanceRatingsID?: string; // Optional for updates
  rating: number;
  review: string;
  pastProjectsCount: number;
}

interface UpdateVendorInput {
  vendorID: string;
  companyName?: string;
  status?: string;
  paymentTerms?: string;
  address?: string;
  gstOrVatDetails?: string;
  notes?: string;
  country?: string;
  skillIDs?: string[];
  performanceRatings?: PerformanceRatingInput[];
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
  vendorId,
}: UseVendorsParams = {}) => {
  const { token } = useSelector((state: RootState) => state.auth);

  // Query setup
  const variables = vendorId
    ? { vendorID: vendorId } // For GET_VENDOR_BY_ID
    : {
        page,
        pageSize,
        search: search?.trim() || undefined,
        status: status ? status.toUpperCase() : undefined,
      };

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(
    vendorId ? GET_VENDOR_BY_ID : GET_VENDORS,
    {
      variables,
      context: { headers: { Authorization: `Bearer ${token}` } },
      fetchPolicy: "network-only",
    }
  );

  // Mutation setup
  const [updateVendorMutation, { loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_VENDOR_MUTATION,
    {
      context: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  // Client-side filtering for rating and address (only for list query)
  const filteredItems = vendorId
    ? data?.getVendor
      ? [data.getVendor]
      : []
    : (data?.getVendors?.items || [])
        .filter((vendor: any) => {
          if (rating) {
            const ratingValue = parseInt(rating.replace("star", ""), 10);
            // Filter by actual rating value instead of length
            return vendor.performanceRatings?.some((pr: any) => pr.rating === ratingValue);
          }
          return true;
        })
        .filter((vendor: any) => {
          if (address) {
            return vendor.address?.toLowerCase().includes(address.toLowerCase());
          }
          return true;
        });

  // Update vendor function
  const updateVendor = async (input: UpdateVendorInput) => {
    try {
      console.log("Input from form:", input);

      // Fetch current vendor data to preserve fields
      const { data: currentVendorData } = await client.query({
        query: GET_VENDOR_BY_ID,
        variables: { vendorID: input.vendorID },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      const currentVendor = currentVendorData?.getVendor || {};
      const currentSkills = currentVendor.skills?.map((skill: { skillID: string }) => skill.skillID) || [];
      const currentCountry = currentVendor.country || "India";
      const currentNotes = currentVendor.notes || "";
      const currentPaymentTerms = currentVendor.paymentTerms || "NET30";
      const currentGstOrVatDetails = currentVendor.gstOrVatDetails || "";
      const currentStatus = currentVendor.status || "ACTIVE";
      const currentAddress = currentVendor.address || "";
      const currentCompanyName = currentVendor.companyName || "";
      const currentPerformanceRatings = currentVendor.performanceRatings || [];

      const updatedInput: UpdateVendorInput = {
        vendorID: input.vendorID,
        companyName: input.companyName || currentCompanyName,
        address: input.address || currentAddress,
        status: input.status || currentStatus,
        paymentTerms: input.paymentTerms || currentPaymentTerms,
        gstOrVatDetails: input.gstOrVatDetails || currentGstOrVatDetails,
        notes: input.notes || currentNotes,
        country: input.country || currentCountry,
        skillIDs: input.skillIDs || currentSkills,
        performanceRatings: input.performanceRatings || currentPerformanceRatings, // Include performanceRatings
      };

      console.log("Updated input for mutation:", updatedInput);

      const response = await updateVendorMutation({
        variables: updatedInput,
      });

      await refetch();
      return response.data.updateVendor;
    } catch (err) {
      console.error("Failed to update vendor:", err);
      throw new Error("Failed to update vendor");
    }
  };

  console.log("useVendors variables:", variables);
  console.log("useVendors response:", { data, filteredItems });

  return {
    vendors: filteredItems,
    vendor: vendorId ? data?.getVendor || null : null,
    totalItems: vendorId ? (data?.getVendor ? 1 : 0) : data?.getVendors?.totalCount || 0,
    loading: queryLoading || mutationLoading,
    error: queryError ? queryError.message : mutationError ? mutationError.message : null,
    refetch,
    updateVendor,
  };
};