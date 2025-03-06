import axios from "axios";
import { message } from "antd";
import { ADD_LEAD_QUERY } from "../../../graphQl/mutation/addLead.mutation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const addLead = async (values: any, token: string) => {
    // Define default values
    const defaultValues = {
      leadAssignedTo: "b53b73e2-00aa-402a-ac7b-fbbf38ac2831",
      initialContactDate: "2025-02-10",
      leadStage: "NEW",
      leadPriority: "HIGH",
      organizationID: "640a89c6-9a48-4946-855a-07ebe9319b39",
      campaignID: "ff823c53-d9f9-4a77-817a-88e258828619",
    };
  
    // Merge defaults with user-provided values
    const payload = {
      ...defaultValues,
      ...values,
    };
  
    try {
      const response = await axios.post(
        apiUrl,
        {
          query: ADD_LEAD_QUERY,
          variables: payload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Task created successfully!");
      return response.data;
    } catch (error) {
      message.error("Failed to create task");
      throw error;
    }
  };
  