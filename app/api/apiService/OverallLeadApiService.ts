// hooks/useOverallLeadsData.ts

import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS_QUERY } from "../../../graphQl/queries/getLeads.query";
import client from "../../../lib/appoloClient";
import { UPDATE_TASK_MUTATION } from "../../../graphQl/mutation/updateTask.mutation";

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

  const { data, loading, error } = useQuery(GET_LEADS_QUERY, {
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
  };
};
export default useOverallLeadsData;


export const updateTaskAPI = async (taskID: string, input: any) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: { taskID, input },
    });

    return data?.updateTask;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }}