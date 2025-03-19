import React, { useState, useEffect } from "react";
import { Campaign } from "./Campaign";
import { useCreateCampaign } from "../api/apiService/addCampaignApiService"; // Import API service

interface CampaignFormData {
  campaignName: string;
  campaignCountry: string;
  region: string;
  industry: string;
}

interface AddCampaignModalProps {
  campaign: Campaign;
  onClose: () => void;
}

const CampaignForm: React.FC<AddCampaignModalProps> = ({ campaign, onClose }) => {
  const [formData, setFormData] = useState<Campaign>({ ...campaign });
  const { createCampaign, loading } = useCreateCampaign(); // Use mutation hook

  useEffect(() => {
    setFormData({ ...campaign });
  }, [campaign]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Submitting form data:", formData); // Debug log

    try {
      await createCampaign({
        campaignName: formData.campaignName,
        campaignCountry: formData.campaignCountry,
        campaignRegion: formData.region,
        industryTargeted: formData.industry,
      });

      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="p-6 relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-bg-blue-12 rounded-t-xl flex justify-between items-center p-5">
          <h2 className="text-2xl font-semibold text-white">Campaign Form</h2>
          <button className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg" onClick={onClose}>
            <img src="/cross_icon.svg" alt="Close" className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-bg-blue-12">Campaign Name</label>
                <input
                  type="text"
                  name="campaignName"
                  value={formData.campaignName || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Country</label>
                <input
                  type="text"
                  name="campaignCountry" 
                  value={formData.campaignCountry || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Region</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                  required
                />
              </div>

              {/* <div>
              <label className="block text-bg-blue-12">Assignee</label>
                <input
                  type="text"
                  name="assignee"
                  value={formData.assignee || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                  required
                />
              </div> */}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-bg-blue-12 text-white rounded-lg w-full"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;