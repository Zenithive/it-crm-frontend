// useIndividualVendorData.ts
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_VENDOR } from "../../../graphQl/queries/getIndividualVendor.queries";


export interface Vendor {
  vendorID: string;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  status: string;
  paymentTerms: string;
  address: string;
  gstOrVatDetails: string;
  notes: string;
  contactList: {
    contactID: string;
    name: string;
    email: string;
    phoneNumber: string;
  }[];
  skills: {
    skillID: string;
    name: string;
    description: string;
    skilltype: string;
  }[];
  performanceRatings: {
    performanceRatingsID: string;
    rating: number;
    review: string;
  }[];
  resources: {
    resourceProfileID: string;
    firstName: string;
    lastName: string;
    totalExperience: string;
    contactInformation: string;
    googleDriveLink: string;
    status: string;
    vendorID: string;
    resourceSkills: {
      skill: {
        skillID: string;
        name: string;
        description: string;
        skilltype: string;
      };
      experienceYears: number;
    }[];
    pastProjects: {
      pastProjectID: string;
      createdAt: string;
      updatedAt: string;
      resourceProfileID: string;
      projectName: string;
      description: string;
    }[];
  }[];
}

const useIndividualVendorData = (vendorID: string) => {
  const { token } = useSelector((state: RootState) => state.auth);  // Get token from Redux state

  const { data, loading, error, refetch } = useQuery(GET_VENDOR, {
    variables: { vendorID },  // Pass the vendorID as a variable to the query
    context: {
      headers: { Authorization: `Bearer ${token}` },  // Add Authorization token to headers
    },
  });

  return {
    vendor: data?.getVendor || null,  // Return the vendor data or null if it doesn't exist
    loading,
    error: error ? error.message : null,
    refetch,
  };
};

export default useIndividualVendorData;
