
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS_QUERY, GET_LEAD_BY_ID } from "../../../graphQl/queries/getLeads.query";
import { UPDATE_LEAD_MUTATION } from "../../../graphQl/mutation/updateLead.mutation";
import client from "../../../lib/appoloClient";

export interface Lead {
  leadID: string;
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
  leadCreatedBy: { userID: string; name: string; email: string };
  leadAssignedTo: { userID: string; name: string; email: string };
  organization: { organizationID: string; organizationName: string };
  campaign: { campaignID: string; campaignName: string; campaignCountry: string; campaignRegion: string; industryTargeted: string };
  createdAt?: string;
}


const useOverallLeadsData = (
  page=1,
  pageSize=10,
  searchQuery?: string,
  stage?: string,
  type?: string,
  campaign?: string,
  startDate?: string,
  endDate?: string,
  leadId?: string
) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const filter: any = {};

  // Date filtering logic
  // if (startDate && endDate) {
  //   // If both start and end dates are provided
  //   filter.fromDate = startDate;
  //   filter.toDate = endDate;
  // } else if (startDate) {
  //   // If only start date is provided
  //   filter.fromDate = startDate;
  // } else if (endDate) {
  //   // If only end date is provided
  //   filter.toDate = endDate;
  // }
 


  // if (stage) filter.leadStage = stage.toUpperCase();
  // if (type) filter.leadType = type;
  // if (campaign) filter.campaignName = campaign;
  // if (searchQuery) filter.search = searchQuery;


  if (startDate || endDate) {
    const startDates = startDate ? startDate.split(',') : [];
    const endDates = endDate ? endDate.split(',') : [];
    
    if (startDates.length === 1 && endDates.length === 1) {
      // If single values for both start and end dates
      filter.fromDate = startDate;
      filter.toDate = endDate;
    } else {
      // For multiple date ranges
      if (startDates.length > 1) {
        filter.fromDate = startDates;
        // If your API expects a specific format: filter.fromDate = { $in: startDates };
      } else if (startDate) {
        filter.fromDate = startDate;
      }
      
      if (endDates.length > 1) {
        filter.toDate = endDates;
        
      } else if (endDate) {
        filter.toDate = endDate;
      }
    }
  }
  
  // Parse remaining filters with the same multiple selection logic
  if (stage) {
    const stages = stage.split(',');
    if (stages.length === 1) {
      filter.leadStage = stage.toUpperCase();
    } else if (stages.length > 1) {
      filter.leadStage = stages.map(s => s.toUpperCase());
      // If your API expects a specific format: filter.leadStage = { $in: stages.map(s => s.toUpperCase()) };
    }
  }
  
  if (type) {
    const types = type.split(',');
    if (types.length === 1) {
      filter.leadType = type;
    } else if (types.length > 1) {
      filter.leadType = types;
      
    }
  }
  
  if (campaign) {
    const campaigns = campaign.split(',');
    if (campaigns.length === 1) {
      filter.campaignName = campaign;
    } else if (campaigns.length > 1) {
      filter.campaignName = campaigns;
      
    }
  }
  
  if (searchQuery && searchQuery.trim() !== "") {
    filter.search = searchQuery.trim();
  }

  const queryVariables = leadId
    ? { leadID: leadId } // For GET_LEAD_BY_ID
    : {
        pagination: { page, pageSize },
        // sort: { field: "EMAIL", order: "ASC" },
        sort: { field: "CREATED_AT", order: "DESC" }, 
        filter,
      };

  const { data, loading, error, refetch } = useQuery(
    leadId ? GET_LEAD_BY_ID : GET_LEADS_QUERY,
    {
      variables: queryVariables,
      context: { headers: { Authorization: `Bearer ${token}` } },
      fetchPolicy: "network-only",
    }
  );

  console.log("queryVariables", queryVariables);
  console.log("data", data);
  console.log("loading", loading);
  console.log("error", error);

  return {
    leads: leadId ? (data?.getLead ? [data.getLead] : []) : data?.getLeads?.items || [],
    lead: leadId ? data?.getLead || null : null,
    totalCount: leadId ? (data?.getLead ? 1 : 0) : data?.getLeads?.totalCount || 0,
    totalItems: data?.getLead?.totalCount || 0,
    loading,
    error: error ? error.message : null,
    refetch,
  };
};

export const useUpdateLead = () => {
  const { token, id: userID } = useSelector((state: RootState) => state.auth);

  const [updateLeadMutation, { data, loading, error }] = useMutation(UPDATE_LEAD_MUTATION, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const updateLead = async (leadID: string, input: Record<string, any>) => {
    try {
      // const updatedInput = {
      //   ...input,
      //   leadType: 'SMALL', 
      // };
      // const response = await updateLeadMutation({
      //   variables: { leadID, input:updatedInput
      //   },
      console.log("Input from form:", input);

      // Fetch current lead data to preserve fields
      const { data: currentLeadData } = await client.query({
        query: GET_LEAD_BY_ID,
        variables: { leadID },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      const leadAssignedToUserID = currentLeadData?.getLead?.leadAssignedTo?.userID || "";
      const leadOrganizationID = currentLeadData?.getLead?.organization?.organizationID || "";
      const leadCampaignID = currentLeadData?.getLead?.campaign?.campaignID || "";
      const leadNotes = currentLeadData?.getLead?.leadNotes || "";
      const leadType = currentLeadData?.getLead?.leadType || "MEDIUM";
      const leadPriority = currentLeadData?.getLead?.leadPriority || "MEDIUM";

      const updatedInput = {
        firstName: input.firstName || "",
        lastName: input.lastName || "",
        email: input.email || "",
        linkedIn: input.linkedIn || "",
        country: input.country || "",
        phone: input.phone || "",
        leadSource: input.leadSource || "",
        leadStage: input.leadStage || "NEW",
        initialContactDate: input.initialContactDate || "",
        leadPriority: leadPriority,
        organizationID: leadOrganizationID,
        campaignID: leadCampaignID,
        // leadType: leadType,
        leadType: input.leadType,
        leadAssignedTo: leadAssignedToUserID,
        leadNotes: leadNotes,
      };
      console.log("updatedInput", updatedInput);

      const response = await updateLeadMutation({
        variables: { leadID, input: updatedInput },
      });
      return response?.data?.updateLead;
    } catch (err) {
      console.error("Failed to update lead:", err);
      throw err;
    }
  };

  return {
    updateLead,
    updatedLead: data?.updateLead || null,
    loading,
    error: error ? error.message : null,
  };
};

export default useOverallLeadsData;




