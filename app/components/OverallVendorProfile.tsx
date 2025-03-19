"use client";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import Search from "../microComponents/Search";
import VendorTable from "./IndividualVendor/VendorTable";
import { OverallVendorProfiletitle } from "./Path/TitlePaths";
import { headerbutton, search } from "./Path/TaskData";
import { useVendors } from "../api/apiService/overallvendorApiService";
import VendorForm from "./IndividualVendor/VendorForm";
import _ from "lodash";
import Filter from "./Filter/Filter";

interface Vendor {
  vendorID: string;
  vendor: string;
  location: string;
  resources: string;
  rating: number;
  status: string;
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

const OverallVendorProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth);
    const [showFilter, setShowFilter] = useState(false);
     const [industryFilter, setIndustryFilter] = useState<string | undefined>(undefined);
      const [technologyFilter, setTechnologyFilter] = useState<string | undefined>(undefined);
        const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Debounce search function
  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      if (query.length >= 3 || query.length === 0) {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page on new search
      }
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setInputValue(query);

    if (query.length >= 3 || query.length === 0) {
      debouncedSearch(query);
    } else if (searchQuery && query.length < 3) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  };

  const handleFilterApply = async (payload: FilterPayload) => {
    const { filter } = payload;
    
    setIndustryFilter(filter.industryTarget);
    setTechnologyFilter(filter.techStack);
    setShowFilter(false);
    setCurrentPage(1);
    // await refetch();
  };

  // Fetch vendors using useVendors with search parameter
  const { data, loading, error, totalItems } = useVendors({
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchQuery,
  });

  const vendors: Vendor[] =
    data?.getVendors?.items.map((vendor: any) => ({
      vendorID: vendor.vendorID || "",
      vendor: vendor.companyName || "N/A",
      location: vendor.address || "N/A",
      resources: vendor.resources?.length || "N/A",
      rating: vendor.performanceRatings?.length || 0,
      status: vendor.status || "N/A",
    })) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  const filterSections = [
    {
      id: "industry",
      title: "Industry",
      options: [
        { id: "healthcare", label: "Healthcare", checked: false },
        { id: "finance", label: "Finance", checked: false },
        { id: "technology", label: "Technology", checked: false },
        { id: "education", label: "Education", checked: false },
        { id: "retail", label: "Retail", checked: false }
      ]
    },
    {
      id: "technology",
      title: "Technology",
      options: [
        { id: "react", label: "React", checked: false },
        { id: "nodejs", label: "Node.js", checked: false },
        { id: "python", label: "Python", checked: false },
        { id: "java", label: "Java", checked: false },
        { id: "aws", label: "AWS", checked: false }
      ]
    }
  ];

  const renderFilterRightPanel = (activeSection: string, selectedOptions: string[]) => {
    const currentSection = filterSections.find(section => section.id === activeSection);
    if (!currentSection) return null;

    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {/* {activeSection === "industry" ? "Industry Filter" : "Technology Filter"} */}
        </h3>
        <div className="space-y-8 max-h-[300px] overflow-y-auto">
          {currentSection.options.map(option => (
            <div key={option.id} className="flex items-center space-x-3 ml-3 mt-3">
              <input
                type="checkbox"
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => {
                  const newSelected = selectedOptions.includes(option.id)
                    ? selectedOptions.filter(id => id !== option.id)
                    : [...selectedOptions, option.id];
                  setSelectedOptions(newSelected);
                  handleFilterApply({
                    filter: {
                      [activeSection === "industry" ? "industryTarget" : "techStack"]: newSelected[0]
                    },
                    pagination: { page: 1, pageSize: 9 },
                    sort: { field: "createdAt", order: "DESC" }
                  });
                }}
                className="w-5 h-5"
              />
              <label htmlFor={option.id} className="text-base">{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          <Title title={OverallVendorProfiletitle[0].titleName} />
          <div className="ml-5">
            <Search
              searchText={search[3].searchText}
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <HeaderButtons
          button1Text={headerbutton[3].button1text}
          button1img={headerbutton[3].button1img}
          button2Text={headerbutton[3].button2text}
          button2img={headerbutton[3].button2img}
          button2width="w-[140px]"
          onClick1={()=> setShowFilter(true)}
          onClick2={() => setShowForm(true)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error.message}</p>
      ) : vendors.length === 0 ? (
        <p className="text-center py-8">No vendors found</p>
      ) : (
        <VendorTable vendors={vendors} />
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <VendorForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Filter
            onClose={() => setShowFilter(false)}
            onApply={handleFilterApply}
            sections={filterSections}
            renderRightPanel={renderFilterRightPanel}
            currentIndustry={industryFilter}
            currentTechnology={technologyFilter}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
      )}
    </div>
  );
};

export default OverallVendorProfile;
