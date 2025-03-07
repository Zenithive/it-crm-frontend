import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS } from "../../../graphQl/queries/leads.queries";

interface Lead {
  leadStage: string;
}

const leadsApiService = (currentPage: number, itemsPerPage: number) => {
  const [newLeads, setNewLeads] = useState(0);
  const [inProgressLeads, setInProgressLeads] = useState(0);
  const [followUpLeads, setFollowUpLeads] = useState(0);
  const [closedWonLeads, setClosedWonLeads] = useState(0);
  const [leadConversion, setLeadConversion] = useState(0);

  const user = useSelector((state: RootState) => state.auth);

  const { data, loading, error } = useQuery(GET_LEADS, {
    variables: {
      filter: {},
      pagination: { page: currentPage, pageSize: itemsPerPage },
      sort: { field: "EMAIL", order: "ASC" },
    },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  useEffect(() => {
    if (data && data.getLeads) {
      const fetchedLeads = data.getLeads.items;
      const totalLeads = data.getLeads.totalCount || 0;

      const newCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "NEW").length;
      const inProgressCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "IN_PROGRESS").length;
      const followUpCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "FOLLOW_UP").length;
      const closedWonCount = fetchedLeads.filter((lead: Lead) => lead.leadStage === "CLOSED_WON").length;

      setNewLeads(newCount);
      setInProgressLeads(inProgressCount);
      setFollowUpLeads(followUpCount);
      setClosedWonLeads(closedWonCount);

      if (totalLeads > 0) {
        setLeadConversion((closedWonCount / totalLeads) * 100);
      }

      console.log("Fetched Leads:", fetchedLeads);
      console.log("Total Leads Count:", data.getLeads.totalCount);
      console.log("NEW Leads:", newCount);
      console.log("IN PROGRESS Leads:", inProgressCount);
      console.log("FOLLOW UP Leads:", followUpCount);
      console.log("CLOSED WON Leads:", closedWonCount);
    }
  }, [data]);

  return {
    leads: data?.getLeads.items || [],
    loading,
    error: error ? error.message : null,
    totalItems: data?.getLeads.totalCount || 0,
    newLeads,
    inProgressLeads,
    followUpLeads,
    closedWonLeads,
    leadConversion,
  };
};

export default leadsApiService;
