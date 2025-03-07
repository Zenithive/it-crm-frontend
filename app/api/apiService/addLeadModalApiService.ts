import axios from "axios";
import { message } from "antd";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

enum LeadStage {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

enum LeadPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export const addLead = async (values: any, token: string) => {
  // Define default values for required fields
  const defaultValues = {
    leadAssignedTo: "b53b73e2-00aa-402a-ac7b-fbbf38ac2831",
    initialContactDate: "2025-02-10",
    organizationID: "640a89c6-9a48-4946-855a-07ebe9319b39",
    campaignID: "ff823c53-d9f9-4a77-817a-88e258828619",
  };

  // Create payload with proper structure for GraphQL variables
  const input = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    linkedIn: values.linkedIn || "",
    country: values.country || "",
    phone: values.phone || "",
    leadSource: values.leadSource || "",
    initialContactDate: values.initialContactDate || defaultValues.initialContactDate,
    leadAssignedTo: defaultValues.leadAssignedTo,
    leadStage: LeadStage.NEW,
    leadPriority: LeadPriority.HIGH,
    organizationID: defaultValues.organizationID,
    campaignID: values.campaignID || defaultValues.campaignID,
    leadNotes: values.leadNotes || "New lead created" // Adding the required leadNotes field
  };

  // Create the GraphQL request with the correct input type and all required fields
  const graphqlRequest = {
    query: `
      mutation CreateLead($input: CreateLeadInput!) {
        createLead(input: $input) {
          leadID
          firstName
          email
          leadStage
          leadPriority
          leadCreatedBy {
            userID
            name
            email
          }
          leadAssignedTo {
            userID
            name
            email
          }
          organization {
            organizationName
            organizationWebsite
          }
          campaign {
            campaignName
            campaignCountry
            campaignRegion
          }
          activities {
            activityID
            activityType
          }
        }
      }
    `,
    variables: { input }
  };

  try {
    const response = await axios.post(
      apiUrl,
      graphqlRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    message.success("Lead added successfully!");
    return response.data;
  } catch (error) {
    message.error("Failed to add lead");
    console.error("GraphQL Error:", error);
    throw error;
  }
};