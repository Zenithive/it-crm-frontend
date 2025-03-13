import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_LEADS } from "../../../graphQl/queries/leads.queries";

interface Lead {
  leadStage: string;
  campaign?: {
    campaignCountry?: string;
  };
}

const leadsApiService = (currentPage: number, itemsPerPage: number, fetchAll: boolean = false) => {
  const [newLeads, setNewLeads] = useState(0);
  const [inProgressLeads, setInProgressLeads] = useState(0);
  const [followUpLeads, setFollowUpLeads] = useState(0);
  const [closedWonLeads, setClosedWonLeads] = useState(0);
  const [leadConversion, setLeadConversion] = useState(0);
  const [campaignCountryCounts, setCampaignCountryCounts] = useState<{ [key: string]: number }>({});

  const user = useSelector((state: RootState) => state.auth);

  const { data, loading, error } = useQuery(GET_LEADS, {
    variables: {
      filter: {},
      pagination: fetchAll ? null : { page: currentPage, pageSize: itemsPerPage },
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

      const campaignCountryMap: { [key: string]: number } = {};
      fetchedLeads.forEach((lead: Lead) => {
        const country = lead.campaign?.campaignCountry || "Unknown";
        campaignCountryMap[country] = (campaignCountryMap[country] || 0) + 1;
      });

      setNewLeads(newCount);
      setInProgressLeads(inProgressCount);
      setFollowUpLeads(followUpCount);
      setClosedWonLeads(closedWonCount);
      setCampaignCountryCounts(campaignCountryMap);

      if (totalLeads > 0) {
        setLeadConversion((closedWonCount / totalLeads) * 100);
      }

      console.log("Fetched Leads:", fetchedLeads);
      console.log("Total Leads Count:", data.getLeads.totalCount);
      console.log("NEW Leads:", newCount);
      console.log("IN PROGRESS Leads:", inProgressCount);
      console.log("FOLLOW UP Leads:", followUpCount);
      console.log("CLOSED WON Leads:", closedWonCount);
      console.log("Leads per Campaign Country:", campaignCountryMap);
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
    campaignCountryCounts
  };
};

export default leadsApiService;
