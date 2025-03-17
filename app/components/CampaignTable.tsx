import React from "react";

export interface Campaign {
  campaignID: string;
  campaignName: string;
  campaignCountry: string;
  region?: string;
  industry?: string;
  assignee?: string;
  users?: Array<{
    userID: string;
    name: string;
    email: string;
  }>;
}

const CampaignTable: React.FC<{ campaigns: Campaign[] }> = ({ campaigns }) => {
  console.log("Received campaigns in CampaignTable:", campaigns); // Debugging log

  if (!campaigns || campaigns.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No campaigns available</p>;
  }

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
            {campaigns.map((campaign) => (
              <tr key={campaign.campaignID} className="hover:bg-gray-50">
                <td className="px-6 py-6">{campaign.campaignName}</td>
                <td className="px-6 py-6">{campaign.campaignCountry}</td>
                <td className="px-6 py-6">{campaign.region || "N/A"}</td>
                <td className="px-6 py-6">{campaign.industry || "N/A"}</td>
                <td className="px-6 py-6">
                  {campaign.users && campaign.users.length > 0 
                    ? campaign.users[0].name 
                    : "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;