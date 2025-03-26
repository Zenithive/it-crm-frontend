// api/apiService/deleteVendorApiService.ts
import { useMutation } from "@apollo/client";
import { DELETE_VENDOR_MUTATION } from "../../../graphQl/mutation/deleteVendor.mutation"; 

interface DeleteVendorResponse {
  deleteVendor: {
    vendorID: string;
    companyName: string;
    status: string;
  };
}

interface DeleteVendorVariables {
  vendorID: string;  // Input remains string, compatible with ID!
}

export const useDeleteVendor = () => {
  const [deleteVendorMutation, { loading, error, data }] = useMutation<
    DeleteVendorResponse,
    DeleteVendorVariables
  >(DELETE_VENDOR_MUTATION);

  const deleteVendor = async (vendorID: string) => {
    try {
      const response = await deleteVendorMutation({
        variables: { vendorID },
      });
      return response.data?.deleteVendor;
    } catch (err) {
      throw new Error("Failed to delete vendor: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  return {
    deleteVendor,
    loading,
    error: error ? error.message : null,
    data: data?.deleteVendor,
  };
};