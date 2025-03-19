"use client"
import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import Pagination from "../microComponents/Pagination";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search } from "./Path/TaskData";
import { OverallCaseStudytitle } from "./Path/TitlePaths";
import Title from "../microComponents/Title";
import TablerLayout from "./OverallCaseStudy/TablerLayout";
import useOverallCaseStudyData from "../api/apiService/overallcasestudyApiService";
import AddCaseStudyForm from "./AddCaseStudyForm";
import { Filter } from "./Filter/Filter";
import { useRouter } from "next/navigation";

interface Resource {  
  title: string;
  company: string;
  tags: string[];
  caseStudyID: string;
  projectName: string;
}

interface FilterPayload {
  filter: {
    industryTarget?: string;
    techStack?: string;
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

const ResourceContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isTableView, setIsTableView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string | undefined>(undefined);
  const [technologyFilter, setTechnologyFilter] = useState<string | undefined>(undefined);
  const router = useRouter();
  
  // Create a debounced search function using lodash
  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      // Reset to first page when searching
      setCurrentPage(1);
      // The actual search is handled by the API through the filter
    }, 500),
    []
  );
  
  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };
  
  // Update the useOverallCaseStudyData hook to include both filters
  const { caseStudies, totalItems, loading, error, refetch } = useOverallCaseStudyData(
    currentPage, 
    itemsPerPage,
    industryFilter, // Pass industry filter from state
    "createdAt", // sort field
    "DESC", // sort order
    searchQuery, // pass the search query to the hook
    technologyFilter // Pass technology filter from state
  );
  
  const resources = caseStudies.map((item: any) => {
    return {
      title: item.projectName || "No Title",
      company: item.clientName || "No Company",
      tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(", ").map((tag: any) => tag.trim()) : []),
      caseStudyID: item.caseStudyID || "No ID",
    };
  });
  
  // No need to slice since pagination is handled by the API now
  const currentItems = resources;
  
  const handleResourceClick = (resource: Resource) => {
    const caseStudyID = encodeURIComponent(resource.caseStudyID);
    router.push(`/individualcasestudy/${caseStudyID}`);
  };
  
  // Function to refresh data after adding a new case study
  const handleCaseStudyAdded = async () => {
    setShowForm(false);
    await refetch();
  };

  // Function to handle filter application
  const handleFilterApply = async (payload: FilterPayload) => {
    // Extract the filter values from the payload
    const { filter } = payload;
    
    // Set the appropriate filter state based on what was selected
    if (filter.industryTarget !== undefined) {
      setIndustryFilter(filter.industryTarget);
      setTechnologyFilter(undefined); // Clear the other filter
    } else if (filter.techStack !== undefined) {
      setTechnologyFilter(filter.techStack);
      setIndustryFilter(undefined); // Clear the other filter
    } else {
      // If both are undefined, clear all filters
      setIndustryFilter(undefined);
      setTechnologyFilter(undefined);
    }
    
    setShowFilter(false);
    setCurrentPage(1); // Reset to first page when applying filters
    await refetch();
  };
  
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-4">
            <Title title={OverallCaseStudytitle[0].titleName} />
            <Search 
              searchText={search[1].searchText} 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <button className="w-7 h-7" onClick={() => setIsTableView(false)}>
                <img
                  src={
                    isTableView
                      ? "/overallCaseStudy_2.svg"
                      : "/overallCaseStudy.svg"
                  }
                  alt="Grid View"
                  className=""
                />
              </button>
              <button className="w-7 h-7" onClick={() => setIsTableView(true)}>
                <img
                  src={
                    isTableView
                      ? "/tabler_layout-list_2.svg"
                      : "/tabler_layout-list.svg"
                  }
                  alt="List View"
                  className=""
                />
              </button>
            </div>
            <HeaderButtons
              button1Text={headerbutton[1].button1text}
              button1img={headerbutton[1].button1img}
              button2Text={headerbutton[1].button2text}
              button2img={headerbutton[1].button2img}
              button1width="w-[109px]"
              button2width="w-[160px]"
              onClick1={() => setShowFilter(true)} // Add filter click handler to first button
              onClick2={() => setShowForm(true)}   // Add case study form handler to second button
            />
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px] mt-10">
        {loading ? (
          <p className="text-gray-500 text-center">Loading resources...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error loading data: {error}</p>
        ) : isTableView ? (
          <TablerLayout 
            resources={currentItems} 
            loading={loading} 
            error={error} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8 bg-white shadow-custom rounded-xl">
            {currentItems.length > 0 ? currentItems.map(
              (resource: Resource, index: React.Key | null | undefined) => (
                <div
                  key={index}
                  className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full cursor-pointer"
                  onClick={() => handleResourceClick(resource)}
                >
                  <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
                    {resource.title}
                  </h3>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
                      <span className="text-xs sm:text-sm truncate max-w-[60%] font-normal">
                        {resource.company}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-normal">
                          View Details
                        </span>
                        <img
                          className="w-4 h-4"
                          src="/arrow_bold.svg"
                          alt="arrow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No case studies found</p>
              </div>
            )}
          </div>
        )}
        <div className="mt-6">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          multiplicationFactor={9}
        />
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <AddCaseStudyForm
            onClose={() => setShowForm(false)}
            onSubmit={handleCaseStudyAdded}
          />
        </div>
      )}
      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Filter
            onClose={() => setShowFilter(false)}
            onApply={handleFilterApply}
            currentIndustry={industryFilter}
            currentTechnology={technologyFilter}
          />
        </div>
      )}
    </>
  );
};

export default ResourceContainer;