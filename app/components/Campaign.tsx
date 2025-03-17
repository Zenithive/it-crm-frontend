"use client";
import React, { useState } from "react";
import Title from "../microComponents/Title";
import { Campaigntitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import CampaignTable from "./CampaignTable";
import AddCampaignForm from "./AddCampaignForm"; 
import { useCampaigns } from "../api/apiService/campaignApiService";
import Pagination from "../microComponents/Pagination";

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

const Campaign: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const { campaignsdata, totalCount, loading, error } = useCampaigns(
    {}, // Your filters
    { page: currentPage, limit: itemsPerPage }
  );

  console.log("Campaigns data:", campaignsdata);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading campaigns...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Failed to load campaigns: {error.message}</p>;
  }

  const handleOpenForm = () => {
    setSelectedCampaign({
      campaignID: "",
      campaignName: "",
      campaignCountry: "",
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

        <CampaignTable campaigns={campaignsdata} />
        
        <div className="mt-6">
          <Pagination
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            multiplicationFactor={10}
          />
        </div>
      </div>

      {isFormOpen && selectedCampaign && (
        <AddCampaignForm campaign={selectedCampaign} onClose={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

export default Campaign;