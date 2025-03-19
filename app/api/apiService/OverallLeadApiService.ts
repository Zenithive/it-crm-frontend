// hooks/useOverallLeadsData.ts

import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS_QUERY } from "../../../graphQl/queries/getLeads.query";
import client from "../../../lib/appoloClient";

import { UPDATE_LEAD_MUTATION } from "../../../graphQl/mutation/updateLead.mutation";

export interface Lead {
  leadID: string
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  leadSource: string;
  leadStage: string;
  leadPriority: string;
  linkedIn?: string;
  initialContactDate?: string;
  leadCreatedBy: {
    userID: string;
    name: string;
    email: string;
  };
  leadAssignedTo: {
    userID: string;
    name: string;
    email: string;
  };
  organization: {
    organizationID: string;
    organizationName: string;
  };
  campaign: {
    campaignID: string;
    campaignName: string;
    campaignCountry: string;
    campaignRegion: string;
    industryTargeted: string;
  };
}

const useOverallLeadsData = (page: number, pageSize: number,searchQuery: string) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const queryVariables: any = {
    pagination: { page, pageSize },
    sort: { field: "EMAIL", order: "ASC" },
  };
  
  if (searchQuery) {
    queryVariables.filter = { search: searchQuery };
  }

  

  const { data, loading, error,refetch } = useQuery(GET_LEADS_QUERY, {
    variables: 
      queryVariables,
      
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return {
    leads: data?.getLeads?.items || [],
    totalCount: data?.getLeads?.totalCount || 0,
    loading,
    error: error ? error.message : null,
    refetch
  };
};
export default useOverallLeadsData;

export const useUpdateLead = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const [updateLeadMutation, { data, loading, error}] = useMutation(UPDATE_LEAD_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const updateLead = async (leadID: string, input: Record<string, any>) => {

   
    try {
      const updatedInput = {
        ...input,
        leadType: 'SMALL', // Default to 'small' if leadType is not provided
      };
      const response = await updateLeadMutation({
        variables: { leadID, input:updatedInput
        },
      });

      
           
      return response?.data?.updateLead;
    } catch (error) {
      console.error("Failed to update lead:", error);
      throw error;
    }
  };


  return {
    updateLead,
    updatedLead: data?.updateLead || null,
    loading,
    error: error ? error.message : null,
    
  };
};

