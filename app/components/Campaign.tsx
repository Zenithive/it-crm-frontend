"use client";
import React, { useState } from "react";
import Title from "../microComponents/Title";
import { Campaigntitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import CampaignTable from "./CampaignTable";
import AddCampaignForm from "./AddCampaignForm";
import useCampaigns from "../api/apiService/campaignApiService";
import Pagination from "../microComponents/Pagination";
import FilterHandler from "./Filter/FilterHandler"; // Updated import
import _ from "lodash";

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

interface FilterPayload {
  filter: {
    [key: string]: string | undefined;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {
    field: string;
    order: string;
  };
}

const Campaign: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [regionFilter, setRegionFilter] = useState<string | undefined>(undefined);
  const [industryFilter, setIndustryFilter] = useState<string | undefined>(undefined);

  const debouncedSearch = _.debounce((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const { campaigns, totalItems, loading, error } = useCampaigns(
    currentPage,
    itemsPerPage
    // searchQuery,
    // regionFilter,
    // industryFilter
  );

  console.log("Campaigns data:", campaigns);

  const filterSections = [
    {
      id: "campign",
      title: "Campaigns",
      options: [
        { id: "tech-corp", label: "Tech Corp", checked: false },
        { id: "innovate-solutions", label: "Innovate Solutions", checked: false },
        { id: "global-systems", label: "Global Systems", checked: false },
        { id: "nexgen-industries", label: "NexGen Industries", checked: false },
        { id: "visionary-tech", label: "Visionary Tech", checked: false },
      ],
    },
    {
      id: "region",
      title: "Region",
      options: [
        { id: "north-america", label: "North America", checked: false },
        { id: "europe", label: "Europe", checked: false },
        { id: "asia", label: "Asia", checked: false },
        { id: "africa", label: "Africa", checked: false },
        { id: "australia", label: "Australia", checked: false },
      ],
    },
    {
      id: "industry",
      title: "Industry",
      options: [
        { id: "healthcare", label: "Healthcare", checked: false },
        { id: "finance", label: "Finance", checked: false },
        { id: "technology", label: "Technology", checked: false },
        { id: "education", label: "Education", checked: false },
        { id: "retail", label: "Retail", checked: false },
      ],
    },
  ];

  const handleFilterApply = async (payload: FilterPayload) => {
    const { filter } = payload;
    setRegionFilter(filter.region);
    setIndustryFilter(filter.industry);
    setShowFilter(false);
    setCurrentPage(1);
    // await refetch();
  };

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

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading campaigns...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Failed to load campaigns: {error}</p>;
  }

  return (
    <div>
      <div className="p-4 max-w-[1350px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
          <div className="flex">
            <Title title={Campaigntitle[0].titleName} />
            <div className="ml-4">
              <Search
                searchText={search[6].searchText}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <HeaderButtons
            button1Text={headerbutton[2].button1text}
            button1img={headerbutton[2].button1img}
            button1width="w-[109px]"
            onClick1={() => setShowFilter(true)}
            button2Text={headerbutton[4].button2text}
            button2img={headerbutton[4].button2img}
            button2width="w-[160px]"
            onClick2={handleOpenForm}
          />
        </div>

        <CampaignTable campaigns={campaigns} />

        <div className="mt-6">
          <Pagination
            totalItems={totalItems}
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

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FilterHandler
            filterSections={filterSections}
            onFilterApply={handleFilterApply}
            setShowFilter={setShowFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Campaign;