"use client";
import React, { useState, useEffect } from "react";
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
  const user = useSelector((state: RootState) => state.auth);

  // Fetch vendors using useVendors
  const { data, loading, error,totalItems  } = useVendors(currentPage, itemsPerPage);
  console.log(`totalItems`, totalItems);
  console.log(`data`, data);
  const vendors: Vendor[] =
    data?.getVendors?.items.map((vendor: any) => 
      
      ({
      vendorID: vendor.vendorID || "",
      vendor: vendor.companyName || "N/A",
      location: vendor.address || "N/A",
      resources: vendor.resources?.length || "N/A",
      rating: vendor.performanceRatings?.length || 0,
      status: vendor.status || "N/A",
    })) || [];

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          <Title title={OverallVendorProfiletitle[0].titleName} />
          <div className="ml-5">
            <Search searchText={search[3].searchText} />
          </div>
        </div>
        <HeaderButtons
          button1Text={headerbutton[3].button1text}
          button1img={headerbutton[3].button1img}
          button2Text={headerbutton[3].button2text}
          button2img={headerbutton[3].button2img}
          button1width="w-[120px]"
          button2width="w-[200px]"
          onClick2={() => setShowForm(true)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error.message}</p>
      ) : (
        <VendorTable vendors={vendors} />
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
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
