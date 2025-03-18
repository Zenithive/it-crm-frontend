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

interface Vendor {
  vendorID: string;
  vendor: string;
  location: string;
  resources: string;
  rating: number;
  status: string;
}

const OverallVendorProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth);

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

  // Fetch vendors using useVendors with search parameter
  const { data, loading, error, totalItems } = useVendors({
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchQuery
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
    </div>
  );
};

export default OverallVendorProfile;