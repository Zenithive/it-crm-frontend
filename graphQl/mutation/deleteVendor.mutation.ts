import { gql } from "@apollo/client";

export const DELETE_VENDOR_MUTATION = gql`
 mutation DeleteVendor($vendorID: ID!) { 
    deleteVendor(vendorID: $vendorID) {
      vendorID
      companyName
      status
    }
  }
`;