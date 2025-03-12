import React, { useState, useEffect } from "react";
import { Campaign } from "./Campaign";

interface AddCampaignModalProps {
  campaign: Campaign;
  onClose: () => void;
}

const CampaignForm: React.FC<AddCampaignModalProps> = ({ campaign, onClose }) => {
  const [formData, setFormData] = useState<Campaign>({ ...campaign });

  useEffect(() => {
    setFormData({ ...campaign });
  }, [campaign]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Campaign Data:", formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="p-6 relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-bg-blue-12 rounded-t-xl flex justify-between items-center p-5">
          <h2 className="text-2xl font-semibold text-white">Campaign Form</h2>
          <button
            className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
            onClick={onClose}
          >
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Region</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Assignee</label>
                <input
                  type="text"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
