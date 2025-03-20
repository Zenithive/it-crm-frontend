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
import FilterHandler from "./Filter/FilterHandler";
import _ from "lodash";

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

const OverallVendorProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [ratingFilter, setRatingFilter] = useState<string | undefined>(undefined);
  const user = useSelector((state: RootState) => state.auth);

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

  const { vendors, totalItems, loading, error } = useVendors({
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchQuery,
    address: locationFilter,
    status: statusFilter,
    rating: ratingFilter,
  });

  const mappedVendors: Vendor[] = vendors.map((vendor: any) => ({
    vendorID: vendor.vendorID || "",
    vendor: vendor.companyName || "N/A",
    location: vendor.address || "N/A",
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

  const handleFilterApply = async (payload: FilterPayload) => {
    const { filter } = payload;
    setLocationFilter(filter.location);
    setStatusFilter(filter.status);
    setRatingFilter(filter.rating);
    setCurrentPage(1);
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
        { id: "8star", label: "8", checked: false },
        { id: "5star", label: "5", checked: false },
        { id: "4star", label: "4", checked: false },
        { id: "3star", label: "3", checked: false },
        { id: "2star", label: "2", checked: false },
        { id: "1star", label: "1", checked: false },
        { id: "0star", label: "0", checked: false },
      ],
    },
  ];

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

      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : mappedVendors.length === 0 ? (
        <p className="text-center py-8">No vendors found</p>
      ) : (
        <VendorTable vendors={mappedVendors} />
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

export default OverallVendorProfile;