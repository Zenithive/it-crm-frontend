// ResourceContainer.tsx
"use client";
import React, { useState, useCallback } from "react";
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
import FilterHandler1 from "./Filter/FilterHandler1";
import { useRouter } from "next/navigation";
import { ResourceGridSkeleton, ResourceTableSkeleton } from "./Skeleton/CaseStudySkeleton";

interface Resource {
  title: string;
  company: string;
  tags: string[];
  caseStudyID: string;
  projectName: string;
}

interface FilterPayload {
  filter: {
    [key: string]: string | string[] | undefined;
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
  
  // Modified filter states to support multiple selections
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);
  const [technologyFilters, setTechnologyFilters] = useState<string[]>([]);
  const router = useRouter();

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
    }, 500),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Modified to support comma-separated values for multiple filters
  const { caseStudies, totalItems, loading, error, refetch } = useOverallCaseStudyData(
    currentPage,
    itemsPerPage,
    industryFilters.length > 0 ? industryFilters.join(',') : undefined,
    "createdAt",
    "DESC",
    searchQuery,
    technologyFilters.length > 0 ? technologyFilters.join(',') : undefined
  );

  const resources = caseStudies.map((item: any) => ({
    title: item.projectName || "No Title",
    company: item.industryTarget || "No Company",
    tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(", ").map((tag: any) => tag.trim()) : []),
    caseStudyID: item.caseStudyID || "No ID",
  }));

  const handleResourceClick = (resource: Resource) => {
    const caseStudyID = encodeURIComponent(resource.caseStudyID);
    router.push(`/individualcasestudy/${caseStudyID}`);
  };

  const handleCaseStudyAdded = async () => {
    setShowForm(false);
    await refetch();
  };

  // Modified to handle multiple filters
  const handleFilterApply = async (payload: FilterPayload) => {
    const { filter } = payload;
    
    // Handle industry filter
    if (filter.industryTarget) {
      const industriesStr = filter.industryTarget as string;
      setIndustryFilters(industriesStr.split(','));
    } else {
      setIndustryFilters([]);
    }
    
    // Handle technology filter
    if (filter.techStack) {
      const technologiesStr = filter.techStack as string;
      setTechnologyFilters(technologiesStr.split(','));
    } else {
      setTechnologyFilters([]);
    }
    
    setCurrentPage(1);
    await refetch();
  };

  const filterSections = [
    {
      id: "industry",
      title: "Industry",
      options: [
        { id: "Finance & Banking", label: "Finance & Banking", checked: false },
        { id: "healthcare", label: "Healthcare", checked: false },
        { id: "finance", label: "Finance", checked: false },
        { id: "technology", label: "Technology", checked: false },
        { id: "education", label: "Education", checked: false },
        { id: "retail", label: "Retail", checked: false },
      ],
    },
    {
      id: "technology",
      title: "Technology",
      options: [
        { id: "PostgreSQL", label: "PostgreSQL", checked: false },
        { id: "react", label: "React", checked: false },
        { id: "nodejs", label: "Node.js", checked: false },
        { id: "python", label: "Python", checked: false },
        { id: "java", label: "Java", checked: false },
        { id: "aws", label: "AWS", checked: false },
      ],
    },
  ];

  // Show active filters for better UX
  const getActiveFiltersDisplay = () => {
    const filters = [];
    
    if (industryFilters.length > 0) {
      filters.push(`Industries: ${industryFilters.join(', ')}`);
    }
    
    if (technologyFilters.length > 0) {
      filters.push(`Technologies: ${technologyFilters.join(', ')}`);
    }
    
    return filters.length > 0 ? (
      <div className="flex items-center gap-2 mt-2 mb-4">
        <span className="text-sm text-gray-500">Active filters:</span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
              {filter}
            </span>
          ))}
        </div>
        <button 
          className="text-sm text-red-500 hover:text-red-700 ml-2"
          onClick={() => {
            setIndustryFilters([]);
            setTechnologyFilters([]);
            refetch();
          }}
        >
          Clear all
        </button>
      </div>
    ) : null;
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
                  src={isTableView ? "/overallCaseStudy_2.svg" : "/overallCaseStudy.svg"}
                  alt="Grid View"
                />
              </button>
              <button className="w-7 h-7" onClick={() => setIsTableView(true)}>
                <img
                  src={isTableView ? "/tabler_layout-list_2.svg" : "/tabler_layout-list.svg"}
                  alt="List View"
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
              onClick1={() => setShowFilter(true)}
              onClick2={() => setShowForm(true)}
            />
          </div>
        </div>
      </div>
      
      <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px] mt-4">
        {/* Display active filters */}
        {getActiveFiltersDisplay()}
        
        {loading ? (
          // Replace the loading text with skeleton components
          isTableView ? <ResourceTableSkeleton /> : <ResourceGridSkeleton />
        ) : error ? (
          <p className="text-red-500 text-center">Error loading data: {error}</p>
        ) : isTableView ? (
          <TablerLayout resources={resources} loading={loading} error={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8 bg-white shadow-custom rounded-xl">
            {resources.length > 0 ? resources.map((resource: Resource, index: React.Key | null | undefined) => (
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
                      <span className="text-sm font-normal">View Details</span>
                      <img className="w-4 h-4" src="/arrow_bold.svg" alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
            )) : (
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
          <AddCaseStudyForm onClose={() => setShowForm(false)} onSubmit={handleCaseStudyAdded} refetchCaseStudies={refetch}/>
        </div>
      )}
      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FilterHandler1
            filterSections={filterSections}
            onFilterApply={handleFilterApply}
            setShowFilter={setShowFilter}
            pageType="casestudy"
          />
        </div>
      )}
    </>
  );
};

export default ResourceContainer;