"use client";
import React, { useState, useEffect } from "react";
import Title from "../microComponents/Title";
import { Campaigntitle } from "./Path/TitlePaths";
import { campaignApi } from "../api/apiService/campaignApiService"; // API Service
import { campaign } from "../api/jsonService/campaignJsonService"; // JSON Static Data
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import CampaignTable from "./CampaignTable";
import CampaignForm from "./CampaignForm"; // Import the form component

export interface Campaign {
  campaignID: string;
  name: string;
  country: string;
  region: string;
  industry: string;
  assignee: string;
}

const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "false";

const Campaign: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = useDummyData ? await campaign() : await campaignApi();
        setCampaigns(response);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaign data");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading campaigns...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  const handleOpenForm = () => {
    setSelectedCampaign({
      campaignID: "",
      name: "",
      country: "",
      region: "",
      industry: "",
      assignee: "",
    });
    setIsFormOpen(true);
  };

  return (
    <div>
      <div className="p-4 max-w-[1350px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
          <div className="flex">
            <Title title={Campaigntitle[0].titleName} />
            <div className="ml-4">
              <Search searchText={search[6].searchText} />
            </div>
          </div>
          <HeaderButtons
            button1Text={headerbutton[2].button1text}
            button1img={headerbutton[2].button1img}
            button1width="w-[109px]"
            button2Text={headerbutton[4].button2text}
            button2img={headerbutton[4].button2img}
            button2width="w-[160px]"
            onClick2={handleOpenForm}
          />
        </div>

        <CampaignTable campaigns={campaigns} />
      </div>

      {isFormOpen && selectedCampaign && (
        <CampaignForm campaign={selectedCampaign} onClose={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

export default Campaign;
