import axios from "axios";


export const individualmeetingApi = async() => {
    const response = await axios.get('api-endpoint');
    return response.data;
}
    

// hooks/useOverallLeadsData.ts

// import { useMutation, useQuery } from "@apollo/client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import { GET_LEADS_QUERY } from "../../../graphQl/queries/getLeads.query";
// import client from "../../../lib/appoloClient";

// import { UPDATE_LEAD_MUTATION } from "../../../graphQl/mutation/updateLead.mutation";

// export interface Lead {
//   leadID: string
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
//   leadID?: string, // Add leadID filter
//   page: number = 1,
//   pageSize: number = 100
// ) => {
//   const { token } = useSelector((state: RootState) => state.auth);

//   const filter: any = {};
//   if (leadID) {
//     filter.leadID = leadID;
//   }

//   const { data, loading, error, refetch } = useQuery(GET_LEADS_QUERY, {
//     variables: { pagination: { page, pageSize }, filter },
//     context: { headers: { Authorization: `Bearer ${token}` } },
//   });

//   return {
//     lead: data?.getLeads?.items?.[0] || null, // Return single lead instead of array
//     loading,
//     error: error ? error.message : null,
//     refetch,
//   };
// };


// export default useOverallLeadsData;

// export const useUpdateLead = () => {
//   const { token } = useSelector((state: RootState) => state.auth);

//   const [updateLeadMutation, { data, loading, error}] = useMutation(UPDATE_LEAD_MUTATION, {
//     context: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });
//   const filter: any = {};
//   const updateLead = async (leadID: string, input: Record<string, any>) => {

   
//     try {
//       const updatedInput = {
//         ...input,
//         leadType: 'SMALL', // Default to 'small' if leadType is not provided
//       };
//       const response = await updateLeadMutation({
//         variables: { leadID, input:updatedInput
//         },
//       });

      
           
//       return response?.data?.updateLead;
//     } catch (error) {
//       console.error("Failed to update lead:", error);
//       throw error;
//     }
//   };


//   return {
//     updateLead,
//     updatedLead: data?.updateLead || null,
//     loading,
//     error: error ? error.message : null,
    
//   };
// };

