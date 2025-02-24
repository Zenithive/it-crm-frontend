"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import { OverallVendorProfiletitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { overallvendorApiService } from "../api/apiService/overallvendorApiService";
import { overallvendorJsonService } from "../api/jsonService/overallvendorJsonService";

const OverallVendorProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchVendors = async () => {
     try {
            setLoading(true);
            const response = useDummyData
              ? await overallvendorApiService()
              : overallvendorJsonService();
              
            setVendors(response ?? []);
          } catch (err) {
            console.error("Error fetching resources:", err);
            setError("Failed to load resources");
          } finally {
            setLoading(false);
          }
       
        
      
    };
    fetchVendors();
  }, [useDummyData]);

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div>
        <h1>Welcome, {user?.name || "Guest"}!</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          <Title title={OverallVendorProfiletitle[0].titleName} />
          <div className="ml-5">
            <Search searchText={search[3].searchText} />
          </div>
        </div>
        <div className="flex space-x-4">
          <HeaderButtons
            button1Text={headerbutton[3].button1text}
            button1img={headerbutton[3].button1img}
            button2Text={headerbutton[3].button2text}
            button2img={headerbutton[3].button2img}
            button1width="w-[120px]"
            button2width="w-[200px]"
          />
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-custom">
          <table className="min-w-full bg-white">
            <thead className="bg-bg-blue-12 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Vendor</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Skills</th>
                <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.vendorID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{vendor.vendor}</td>
                  <td className="px-6 py-4">{vendor.location}</td>
                  <td className="px-6 py-4">{vendor.skills}</td>
                  <td className="px-6 py-4">{vendor.rating}</td>
                  <td className="px-6 py-4">{vendor.status}</td>
                  <td className="flex px-6 py-4 space-x-2">
                    <img src="/edit.svg" alt="Edit" />
                    <img src="/delete.svg" alt="Delete" className="px-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={vendors.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default OverallVendorProfile;
