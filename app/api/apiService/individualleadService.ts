import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEAD } from "../../../graphQl/queries/getIndividualLead.queries";

interface Lead {
  firstName: string;
  lastName: string;
  linkedIn?: string;
  email?:string;
  phone?: string;
  country?: string;
  initialContactDate?: string;
  organizationName?: string;
  organizationWebsite?: string;
  organizationLinkedIn?:string;
  assignedToName?: string;
  industryTargeted?: string;
}

const leadApiService = (leadID: string) => {
  const [lead, setLead] = useState<Lead | null>(null);

  const user = useSelector((state: RootState) => state.auth);

  const { data, loading, error } = useQuery(GET_LEAD, {
    variables: { leadID },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  useEffect(() => {
    if (data?.getLead) {
      const fetchedLead: Lead = {
        firstName: data.getLead.firstName,
        lastName: data.getLead.lastName,
        linkedIn: data.getLead.linkedIn || "",
        phone: data.getLead.phone || "",
        email: data.getLead.email || "Not Specified",
        country: data.getLead.country || "Not Specified",
        initialContactDate: data.getLead.initialContactDate || "Not Specified",
        organizationName: data.getLead.organization?.organizationName || "Unknown",
        organizationWebsite: data.getLead.organization?.organizationWebsite || "N/A",
        organizationLinkedIn:data.getLead.organization?.organizationLinkedIn || "",
        assignedToName: data.getLead.leadAssignedTo?.name || "Unassigned",
        industryTargeted: data.getLead.campaign?.industryTargeted || "Not Specified",
      };

      setLead(fetchedLead);

      console.log("Fetched Lead:", fetchedLead);
    }
  }, [data]);

  return {
    lead,
    loading,
    error: error ? error.message : null,
  };
};

export default leadApiService;
