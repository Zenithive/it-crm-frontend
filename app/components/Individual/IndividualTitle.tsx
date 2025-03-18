import React from "react";
import Title from "../../microComponents/Title";
import { Individualtitle } from "../Path/TitlePaths";
import IconButton from "../../microComponents/IconButton";
import HeaderFlag from "../../microComponents/HeaderFlag";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useQuery } from "@apollo/client";
import { GET_LEAD } from "../../../graphQl/queries/getIndividualLead.queries";

const IndividualTitle = ({ leadId }: { leadId: string }) => {
    const user = useSelector((state: RootState) => state.auth); 


    const { data, loading, error } = useQuery(GET_LEAD, {
      variables: { leadID: String(leadId) },
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  
    const lead = data?.getLead || null;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {/* <Title title={Individualtitle[0].titleName}></Title> */}
          {loading ? "Loading..." : lead ? `${lead.firstName} ${lead.lastName}` : "No Data Available"}
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
          {loading ? "Loading..." : lead ? `${lead.leadStage}` : "No Data Available"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <IconButton icon="edit_logo.svg" text="Edit Contact" />
          <HeaderFlag/>
        </div>
      </div>
    </div>
  );
};

export default IndividualTitle;
