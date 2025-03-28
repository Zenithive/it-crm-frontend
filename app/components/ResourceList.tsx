"use client";
import React, { useState, useCallback, useEffect } from "react";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search } from "./Path/TaskData";
import ResourceContainer from "./ResourceList/ResourceContainer";
import { ResourceForm } from "./ResourceList/ResourceForm";
import Title from "../microComponents/Title";
import { Resourcetitle } from "./Path/TitlePaths";
import FilterHandler from "./Filter/FilterHandler";
import _ from "lodash";
import { useResourceList } from "../api/apiService/resourcelistApiService";

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

const ResourceList = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [vendorNameFilter, setVendorNameFilter] = useState<string | undefined>(undefined);
  const [experienceYearFilter, setExperienceYearFilter] = useState<string | undefined>(undefined);
  const [skillsFilter, setSkillsFilter] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const { data, loading, error, totalItems,refetch } = useResourceList({
      page: currentPage,
      pageSize: itemsPerPage,
      search: searchQuery || null,
      vendorName: vendorNameFilter || null,
      totalExperience: experienceYearFilter || null,
      skills: skillsFilter || null,
      
    });

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      if (query.length >= 3 || query.length === 0) {
        setSearchQuery(query);
      }
    }, 500),
    []
  );

  const handleSearchChange = (query: string) => {
    setInputValue(query);
    if (query.length >= 3 || query.length === 0) {
      debouncedSearch(query);
    } else if (searchQuery && query.length < 3) {
      setSearchQuery("");
    }
  };

  const handleAddResource = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFilterApply = (payload: FilterPayload) => {
    const { filter } = payload;
    setVendorNameFilter(filter.vendorName);
    setExperienceYearFilter(filter.experienceYear);
    setSkillsFilter(filter.skills);
    setShowFilter(false);
  };

  const filterSections = [
    {
      id: "skills",
      title: "Skills",
      options: [
        { id: "a442dcee-2ea7-4f25-b710-99a8e6411be7", label: "Golang", checked: false },
        { id: "0b73f7ea-a3e8-44f4-93bd-648fc8e57275", label: "PostgreSQL", checked: false },
      ],
    },
    {
      id: "experienceYear",
      title: "Experience Year",
      options: [
        { id: "1-3", label: "1-3 Years", checked: false },
        { id: "3-5", label: "3-5 Years", checked: false },
        { id: "5+", label: "5+ Years", checked: false },
      ],
    },
  ];
    const handleRefetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (refetchTrigger > 0) {
      refetch();
    }
  }, [refetchTrigger, refetch]);
  return (
    <div className="min-h-screen w-full">
      {showForm && <ResourceForm onClose={handleCloseForm}      onSubmitSuccess={handleRefetch}/>}

      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <Title title={Resourcetitle[0].titleName} />
            <div className="ml-5">
              <Search
                searchText={search[0].searchText}
                value={inputValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div>
            <HeaderButtons
              button1Text={headerbutton[0].button1text}
              button1img={headerbutton[0].button1img}
              button2Text={headerbutton[0].button2text}
              button2img={headerbutton[0].button2img}
              button2width="w-[160px]"
              onClick1={() => setShowFilter(true)}
              onClick2={handleAddResource}
            />
          </div>
        </div>
      </div>

      <ResourceContainer
        searchQuery={searchQuery}
        vendorNameFilter={vendorNameFilter}
        experienceYearFilter={experienceYearFilter}
        skillsFilter={skillsFilter}
      />

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FilterHandler
            filterSections={filterSections}
            onFilterApply={handleFilterApply}
            setShowFilter={setShowFilter}
            pageType="resource"
          />
        </div>
      )}
    </div>
  );
};

export default ResourceList;