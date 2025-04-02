import React, { useState } from "react";
import Title from "../../microComponents/Title";
import { Individualtitle } from "../Path/TitlePaths";
import IconButton from "../../microComponents/IconButton";
import HeaderFlag from "../../microComponents/HeaderFlag";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useQuery } from "@apollo/client";
import { GET_LEAD } from "../../../graphQl/queries/getIndividualLead.queries";
import AddLeadModal from "../AddLeadModal"; // Import AddLeadModal

const IndividualTitle = ({ leadId }: { leadId: string }) => {
  const user = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const { data, loading, error,refetch } = useQuery(GET_LEAD, {
    variables: { leadID: String(leadId) },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  const lead = data?.getLead || null;

  const handleEditContact = () => {
    setIsModalOpen(true); // Open the modal on click
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6  ">
        <div className="flex items-center gap-4 ">
      
          <div className="text-2xl font-bold text-bg-blue-12">
            {loading
              ? "Loading..."
              : lead
              ? `${lead.firstName} ${lead.lastName}`
              : "No Data Available"}
          </div>
          <span className="px-3 py-1 bg-indigo-100 text-bg-blue-12 rounded-full text-sm">
            {loading ? "Loading..." : lead ? `${lead.leadStage}` : "No Data Available"}
          </span>
        </div>
        <div className="flex items-center gap-4 z-50 relative">
          <IconButton
            icon="/edit_logo.svg"
            text="Edit Contact"
            onClick={handleEditContact} // Trigger modal open
          />
          <div className="relative">  <HeaderFlag  /></div>
        
        </div>
      </div>

      {/* Render AddLeadModal when isModalOpen is true */}
      {isModalOpen && <AddLeadModal onClose={handleCloseModal} leadId={leadId} />}
    </div>
  );
};

export default IndividualTitle;