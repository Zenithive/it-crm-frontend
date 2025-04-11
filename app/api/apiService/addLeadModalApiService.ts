import { useMutation } from "@apollo/client";
import { message } from "antd";
import { ADD_LEAD_QUERY } from "../../../graphQl/mutation/addLead.mutation";

enum LeadStage {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
  DEAL = "DEAL",
}

enum LeadPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

enum LeadType {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  ENTERPRISE = "ENTERPRISE",
}

export const useAddLead = () => {
  const [addLeadMutation, { loading, error }] = useMutation(ADD_LEAD_QUERY);

  const addLead = async (values: any) => {

    console.log("Form values received in useAddLead:", values);
    console.log("createNewOrganization value:", values.createNewOrganization);
    console.log("organizationName value:", values.organizationName);
    console.log("organizationID value:", values.organizationID);
    const defaultValues = {
      leadAssignedTo: "b53b73e2-00aa-402a-ac7b-fbbf38ac2831",
      initialContactDate: "2025-02-10",
      campaignID: "ff823c53-d9f9-4a77-817a-88e258828619",
    };

    // Base input for lead creation
    const input: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      linkedIn: values.linkedIn || "",
      country: values.country || "",
      phone: values.phone || "",
      leadSource: values.leadSource || "",
      leadType: values.leadType || LeadType.SMALL,
      initialContactDate:
        values.initialContactDate || defaultValues.initialContactDate,
      leadAssignedTo: values.leadAssignedTo || defaultValues.leadAssignedTo,
      leadStage: values.leadStage || LeadStage.NEW,
      leadPriority: values.leadPriority || LeadPriority.HIGH,
      campaignID: values.campaignID || defaultValues.campaignID,
      leadNotes: values.leadNotes || "New lead created",
    };

    // Modified logic for organization handling
    if (values.organizationID && values.organizationID.trim() !== '') {
      // Use existing organization if there's a valid ID
      console.log("Using existing organization with ID:", values.organizationID);
      input.organizationID = values.organizationID;
    } else if (values.organizationName && values.organizationName.trim() !== '') {
      // Create new organization if there's a name
      console.log("Creating new organization with name:", values.organizationName);
      input.organizationName = values.organizationName;
      input.organizationWebsite = values.organizationWebsite || "";
      input.organizationEmail = values.email || ""; // Using lead email if org email not provided
      input.organizationLinkedIn = values.organizationLinkedIn || "";
      input.city = values.city || "";
      input.orgCountry = values.country || ""; // Using lead country if org country not provided
      input.noOfEmployees = values.noOfEmployees || "";
      input.annualRevenue = values.annualRevenue || "";
    }

    console.log("Final payload being sent to API:", input);

    try {
      const { data } = await addLeadMutation({
        variables: { input },
      });
      console.log("API response:", data);
      message.success("Lead added successfully!");
      return data;
    } catch (err) {
      message.error("Failed to add lead");
      console.error("GraphQL Error:", err);
      throw err;
    }
  };

  return { addLead, loading, error };
};
