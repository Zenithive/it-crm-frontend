import { useMutation } from "@apollo/client";
import { message } from "antd";
import { ADD_LEAD_QUERY } from "../../../graphQl/mutation/addLead.mutation";

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

enum leadType {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  ENTERPRISE = "ENTERPRISE",
}

export const useAddLead = () => {
  const [addLeadMutation, { loading, error }] = useMutation(ADD_LEAD_QUERY);

  const addLead = async (values: any) => {
    const defaultValues = {
      leadAssignedTo: "b53b73e2-00aa-402a-ac7b-fbbf38ac2831",
      initialContactDate: "2025-02-10",
      organizationID: "640a89c6-9a48-4946-855a-07ebe9319b39",
      campaignID: "ff823c53-d9f9-4a77-817a-88e258828619",
    };

    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      linkedIn: values.linkedIn || "",
      country: values.country || "",
      phone: values.phone || "",
      leadSource: values.leadSource || "",
      leadType: values.leadType || leadType.SMALL,
      initialContactDate: values.initialContactDate || defaultValues.initialContactDate,
      leadAssignedTo: defaultValues.leadAssignedTo,
      leadStage: LeadStage.NEW,
      leadPriority: LeadPriority.HIGH,
      organizationID: defaultValues.organizationID,
      campaignID: values.campaignID || defaultValues.campaignID,
      leadNotes: values.leadNotes || "New lead created",
    };

    try {
      const { data } = await addLeadMutation({
        variables: { input },
      });
      // message.success("Lead added successfully!");
      return data;
    } catch (err) {
      message.error("Failed to add lead");
      console.error("GraphQL Error:", err);
      throw err;
    }
  };

  return { addLead, loading, error };
};
