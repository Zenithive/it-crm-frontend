import { gql } from "@apollo/client";

export const UPDATE_VENDOR_MUTATION = gql`

mutation UpdateVendor(
    $vendorID: ID!,
    $companyName: String,
    $status: VendorStatus,
    $paymentTerms: PaymentTerms,
    $address: String,
    $gstOrVatDetails: String,
    $notes: String,
    $skillIDs: [ID!]
  ) {
    updateVendor(
      vendorID: $vendorID,
      input: {
        companyName: $companyName,
        status: $status,
        paymentTerms: $paymentTerms,
        address: $address,
        gstOrVatDetails: $gstOrVatDetails,
        notes: $notes,
        skillIDs: $skillIDs
      }
    ) {
      companyName
      status
      paymentTerms
      address
      gstOrVatDetails
      notes
      skills {
        skillID
        name
        description
      }
    }
  }`