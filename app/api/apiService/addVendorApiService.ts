import { useMutation } from "@apollo/client";
import { message } from "antd";
import { CREATE_VENDOR_MUTATION } from "../../../graphQl/mutation/addVendor.mutation";

enum VendorStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum PaymentTerms {
  NET_30 = "NET_30",
  NET_60 = "NET_60",
  NET_90 = "NET_90",
}

export const useCreateVendor = () => {
  const [createVendorMutation, { loading, error }] = useMutation(CREATE_VENDOR_MUTATION);

  const createVendor = async (values: any) => {
    const input = {
      companyName: values.companyName,
      status: values.status || VendorStatus.ACTIVE,
      paymentTerms: values.paymentTerms || PaymentTerms.NET_30,
      address: values.address || "",
      gstOrVatDetails: values.gstOrVatDetails || "",
      notes: values.notes || "New vendor added",
      skillIDs: values.skillIDs || [],
      country: values.country || "India", 
    };

    try {
      const { data } = await createVendorMutation({
        variables: { input },
      });

      return data;
    } catch (err) {
    
      console.error("GraphQL Error:", err);
      throw err;
    }
  };

  return { createVendor, loading, error };
};