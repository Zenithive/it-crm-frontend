// // hooks/useOverallLeadsData.ts

// import { useQuery, useMutation } from "@apollo/client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import { GET_LEADS_QUERY } from "../../../graphQl/queries/getLeads.query";
// import { UPDATE_LEAD_MUTATION } from "../../../graphQl/mutation/updateLead.mutation";
// import { useEffect } from "react";
// import client from "../../../lib/appoloClient";

// const getDateRange = () => {
//   const today = new Date();
//   const fromDate = new Date();
//   fromDate.setDate(today.getDate() - 30);

//   const formatDate = (date: Date) => date.toISOString().split("T")[0];

//   console.log("formatDate(fromDate)", formatDate(fromDate));
//   console.log(" formatDate(today)", formatDate(today));
//   return {
//     fromDate: formatDate(fromDate),
//     toDate: formatDate(today),
//   };
// };

// export interface Lead {
//   leadID: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   country: string;
//   leadSource: string;
//   leadStage: string;
//   leadPriority: string;
//   linkedIn?: string;
//   initialContactDate?: string;
//   leadCreatedBy: {
//     userID: string;
//     name: string;
//     email: string;
//   };
//   leadAssignedTo: {
//     userID: string;
//     name: string;
//     email: string;
//   };
//   organization: {
//     organizationID: string;
//     organizationName: string;
//   };
//   campaign: {
//     campaignID: string;
//     campaignName: string;
//     campaignCountry: string;
//     campaignRegion: string;
//     industryTargeted: string;
//   };
// }

// const useOverallLeadsData = (
//   page: number,
//   pageSize: number,
//   searchQuery?: string,
//   stage?: string,
//   type?: string,
//   campaign?: string,
//   leadId?: string // Optional leadId parameter for single lead fetch
// ) => {
//   const { token } = useSelector((state: RootState) => state.auth);

//   const filter: any = {};

//   if (leadId) {
//     filter.leadID = leadId; // Filter by leadId if provided
//   }
//   if (stage) {
//     filter.leadStage = stage;
//   }
//   if (type) {
//     filter.leadType = type;
//   }
//   if (campaign) {
//     filter.campaign = campaign;
//   }

//   const queryVariables: any = {
//     // filter: { fromDate, toDate },
//     // pagination: { page, pageSize },
//     pagination: {
//       page,
//       pageSize: leadId ? 1 : pageSize, // Use pageSize=1 if leadId is provided, otherwise use the provided pageSize
//     },
//     sort: { field: "EMAIL", order: "ASC" },
//     filter,
//   };

//   if (searchQuery) {
//     queryVariables.filter.search = searchQuery;
//   }

//   const { data, loading, error, refetch } = useQuery(GET_LEADS_QUERY, {
//     variables: queryVariables,
//     context: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });

//   console.log("queryVariables", queryVariables);
//   console.log("data", data);

//   console.log("Full data:", data);
//   console.log("Items array:", data?.getLeads?.items);
//   console.log("First item:", data?.getLeads?.items?.[0]);
//   console.log("leadAssignedTo:", data?.getLeads?.items?.[0]?.leadAssignedTo);
//   console.log("userID:", data?.getLeads?.items?.[0]?.leadAssignedTo?.userID);

//   return {
//     leads: data?.getLeads?.items || [], // Return the list of leads
//     // console.log("leads",leads);
//     lead: leadId ? data?.getLeads?.items?.[0] || null : null, // Return a single lead if leadId is provided
//     totalCount: data?.getLeads?.totalCount || 0,
//     loading,
//     error: error ? error.message : null,
//     refetch,
//   };
// };

// export const useUpdateLead = () => {
//   const { token, id: userID } = useSelector((state: RootState) => state.auth);

//   const [updateLeadMutation, { data, loading, error }] = useMutation(
//     UPDATE_LEAD_MUTATION,
//     {
//       context: {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     }
//   );

//   // Add a query to fetch lead data when needed
//   const { data: leadData } = useQuery(GET_LEADS_QUERY, {
//     variables: { pagination: { page: 1, pageSize: 1 }, filter: {} },
//     skip: true, // Don't run initially
//     context: { headers: { Authorization: `Bearer ${token}` } },
//   });

//   const updateLead = async (leadID: string, input: Record<string, any>) => {
//     // console.log('currentLeadData111',currentLeadData);
//     try {
//       console.log("Input from form:", input);
//       console.log("Current userID:", userID);

//       const { data: currentLeadData } = await client.query({
//         query: GET_LEADS_QUERY,
//         variables: { pagination: { page: 1, pageSize: 1 }, filter: { leadID } },
//         context: { headers: { Authorization: `Bearer ${token}` } },
//       });

//       const leadAssignedToUserID =
//         currentLeadData?.getLeads?.items?.[0]?.leadAssignedTo?.userID || "";
//       console.log("leadAssignedToUserID", leadAssignedToUserID);
//       const leadOrganizationID =
//         currentLeadData?.getLeads?.items?.[0]?.organization?.organizationID || "";
//       console.log("leadOrganizationID", leadAssignedToUserID);
//       const leadcampaignID =
//         currentLeadData?.getLeads?.items?.[0]?.campaign?.campaignID || "";
//       console.log("leadAssignedToUserID", leadAssignedToUserID);
//       const leadleadNotes =
//         currentLeadData?.getLeads?.items?.[0]?.leadNotes || "";
//       console.log("leadAssignedToUserID", leadAssignedToUserID);
//       const leadType =
//         currentLeadData?.getLeads?.items?.[0]?.leadNotes || "";
//       console.log("leadAssignedToUserID", leadAssignedToUserID);


//       const updatedInput = {
//         firstName: input.firstName || "",
//         lastName: input.lastName || "",
//         email: input.email || "",
//         linkedIn: input.linkedIn || "",
//         country: input.country || "",
//         phone: input.phone || "",
//         leadSource: input.leadSource || "",
//         leadStage: input.leadStage || "NEW",
//         initialContactDate: input.initialContactDate || "",
//         leadPriority: input.leadPriority || "MEDIUM",
//         organizationID: leadOrganizationID,
//         campaignID: leadcampaignID,
//         // leadType: leadType,
//         leadType: "MEDIUM",
        
//         leadAssignedTo: leadAssignedToUserID,
//         leadNotes: leadleadNotes,
//       };
//       console.log("updatedInput", updatedInput);

//       const response = await updateLeadMutation({
//         variables: { leadID, input: updatedInput },
//       });
//       return response?.data?.updateLead;
//     } catch (err) {
//       console.error("Failed to update lead:", err);
//       throw err;
//     }
//   };

//   return {
//     updateLead,
//     updatedLead: data?.updateLead || null,
//     loading,
//     error: error ? error.message : null,
//   };
// };

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
}

const useOverallLeadsData = (
  page: number,
  pageSize: number,
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
  if (startDate && endDate) {
    // If both start and end dates are provided
    filter.fromDate = startDate;
    filter.toDate = endDate;
  } else if (startDate) {
    // If only start date is provided
    filter.fromDate = startDate;
  } else if (endDate) {
    // If only end date is provided
    filter.toDate = endDate;
  }

  if (stage) filter.leadStage = stage.toUpperCase();
  if (type) filter.leadType = type;
  if (campaign) filter.campaignName = campaign;
  if (searchQuery) filter.search = searchQuery;

  const queryVariables = leadId
    ? { leadID: leadId } // For GET_LEAD_BY_ID
    : {
        pagination: { page, pageSize },
        sort: { field: "EMAIL", order: "ASC" },
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
        leadType: leadType,
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




