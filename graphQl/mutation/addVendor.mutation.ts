import { gql } from "@apollo/client";

export const CREATE_VENDOR_MUTATION = gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      vendorID
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
  }
`;
