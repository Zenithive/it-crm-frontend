import React, { useState } from "react";
import { formatText } from "../utils/formatHelpers";
import { getRoleColor } from "../utils/colorHelpers";
import UserForm from "./UserForm";

export interface Campaign {
    campaignID: string;
    name: string;
    country: string;
    region: string;
    industry: string;
    assignee: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const [selectedUser, setSelectedUser] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal and set selected user
  const handleEdit = (user: Campaign) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-custom">
        <table className="min-w-full bg-white">
          <thead className="bg-bg-blue-12 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Campaign Name</th>
              <th className="px-6 py-3 text-left">Country</th>
              <th className="px-6 py-3 text-left">Region</th>
              <th className="px-6 py-3 text-left">Industry</th>
              <th className="px-6 py-3 text-left">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns?.length > 0 ? (
                campaigns.map((campaign) => (
                <tr key={campaign.campaignID} className="hover:bg-gray-50">
                  <td className="px-6 py-6">{campaign.name}</td>
                  <td className="px-6 py-6">{campaign.country}</td>
                  <td className="px-6 py-6">{campaign.region}</td>
                  <td className="px-6 py-6">{campaign.industry}</td>
                  <td className="px-6 py-6">{campaign.assignee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  No campaigns available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render Edit Modal
      {isModalOpen && selectedUser && (
        <UserForm campaign={selectedUser} onClose={handleClose} />
      )} */}
    </div>
  );
};

export default CampaignTable;
