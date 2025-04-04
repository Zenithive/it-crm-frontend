"use client";
import React, { useState, useCallback, useEffect } from "react";
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
import FilterHandler from "./Filter/FilterHandler";
import _ from "lodash";
import FilterHandler1 from "./Filter/FilterHandler1";
import TodoListSkeleton from "./Skeleton/ToDoListSkeleton";

interface Vendor {
  vendorID: string;
  vendor: string;
  location: string;
  resources: string;
  rating: number;
  status: string;
  paymentTerms?: string;
  gstOrVatDetails?: string;
  notes?: string;
  country?: string;
  skillIDs?: string[];
}

interface FilterPayload {
  filter: {
    // [key: string]: string | undefined;
    [key: string]: string | string[]  | undefined;
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
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  // const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined);
  // const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [ratingFilters, setRatingFilters] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [locationFilters, setLocationFilters] = useState<string[]>([]);

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      console.log("Debounced search triggered with query:", query);
      setSearchQuery(query);
      setCurrentPage(1);
    }, 500),
    []
  );

  const handleSearchChange = (query: string) => {
    setInputValue(query);
    console.log("Search input changed to:", query);
    debouncedSearch(query); // Always debounce, backend can handle empty strings
  };

  const { vendors, totalItems, loading, error,refetch } = useVendors({
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchQuery,
    // country: locationFilter,
    // status: statusFilter,
  country: locationFilters.length > 0 ? locationFilters.join(',') : undefined,
    status: statusFilters.length > 0 ? statusFilters.join(',') : undefined,
    rating: ratingFilters.length> 0 ? ratingFilters.join(',') : undefined,
  });

  const mappedVendors: Vendor[] = vendors.map((vendor: any) => ({
    vendorID: vendor.vendorID || "",
    vendor: vendor.companyName || "N/A",
    location: `${vendor.address} ,${vendor.country} `|| "N/A",
    resources: vendor.resources?.length.toString() || "N/A", // Ensure string type
    rating: vendor.performanceRatings?.length || 0,
    status: vendor.status || "N/A",
  }));

  console.log("Mapped vendors:", mappedVendors);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };



useEffect(() => {
 
  const params = {
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchQuery,
    country: locationFilters.length > 0 ? locationFilters.join(',') : undefined,
    status: statusFilters.length > 0 ? statusFilters.join(',') : undefined,
   
    reviewFromPerformanceRating: ratingFilters.length > 0 
      ? ratingFilters.map(r => parseInt(r, 10)) 
      : undefined,
  };
  
  const fetchData = async () => {
    try {
      await refetch(params);
    } catch (error) {
      console.error("Error refetching data:", error);
    }
  };
  
  fetchData();
  
}, [currentPage, itemsPerPage, locationFilters, statusFilters, ratingFilters, searchQuery]);
  const handleFilterApply = (payload: FilterPayload) => {
    const { filter } = payload;
    
  
    setCurrentPage(1);
    
    if (filter.status) {
      setStatusFilters(typeof filter.status === 'string' 
        ? filter.status.split(',') 
        : filter.status);
    } else {
      setStatusFilters([]);
    }
    
    if (filter.country) {
      setLocationFilters(typeof filter.country === 'string' 
        ? filter.country.split(',') 
        : filter.country);
    } else {
      setLocationFilters([]);
    }


    if (filter.reviewFromPerformanceRating) {
      // setRatingFilters(typeof filter. reviewFromPerformanceRating === 'string' 
      //   ? filter. reviewFromPerformanceRating.split(',') 
      //   : filter. reviewFromPerformanceRating);

      const ratingArray = Array.isArray(filter.reviewFromPerformanceRating)
      ? filter.reviewFromPerformanceRating.map(r => r.toString())
      : [filter.reviewFromPerformanceRating.toString()];
    
    setRatingFilters(ratingArray);
    } else {
      setRatingFilters([]);
    }
    
  };
  const filterSections = [
    {
      id: "location",
      title: "Location",
      options: [
        { id: "usa", label: "USA", checked: false },
        { id: "europe", label: "Europe", checked: false },
        { id: "asia", label: "Asia", checked: false },
        { id: "africa", label: "Africa", checked: false },
        { id: "australia", label: "Australia", checked: false },
      ],
    },
    {
      id: "status",
      title: "Status",
      options: [
        { id: "active", label: "Active", checked: false },
        { id: "inactive", label: "Inactive", checked: false },
      ],
    },
    {
      id: "rating",
      title: "Rating",
      options: [
      
        { id: "5star", label: "5", checked: false },
        { id: "4star", label: "4", checked: false },
        { id: "3star", label: "3", checked: false },
        { id: "2star", label: "2", checked: false },
        { id: "1star", label: "1", checked: false },
        { id: "0star", label: "0", checked: false },
      ],
    },
  ];


  const getActiveFiltersDisplay = () => {
    const filters = [];
    
    if (statusFilters.length > 0) {
      filters.push(`Status: ${statusFilters.join(', ')}`);
    }
    
    if (locationFilters.length > 0) {
      filters.push(`Countries: ${locationFilters.join(', ')}`);
    }

    if (ratingFilters.length > 0) {
      filters.push(`Ratings: ${ratingFilters.join(', ')}`);
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
            setStatusFilters([]);
            setLocationFilters([]);
            setRatingFilters([]);
            refetch();
          }}
        >
          Clear all
        </button>
      </div>
    ) : null;
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
          onClick1={() => setShowFilter(true)}
          onClick2={() => setShowForm(true)}
        />
      </div>
      {getActiveFiltersDisplay()}
      {loading ? (
        // <p className="text-center">Loading vendors...</p>
        <TodoListSkeleton />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : mappedVendors.length === 0 ? (
        <p className="text-center py-8">No vendors found</p>
      ) : (
        <VendorTable vendors={mappedVendors} refetchVendors={refetch}/>
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
          <VendorForm onClose={() => setShowForm(false)} refetchVendors={refetch}/>
        </div>
      )}

      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {/* <FilterHandler
            filterSections={filterSections}
            onFilterApply={handleFilterApply}
            setShowFilter={setShowFilter}
            pageType="vendor"
          /> */}

            <FilterHandler1
                      filterSections={filterSections}
                      onFilterApply={handleFilterApply}
                      setShowFilter={setShowFilter}
                      pageType="vendor"
                    />
        </div>
      )}
    </div>
  );
};

export default OverallVendorProfile;