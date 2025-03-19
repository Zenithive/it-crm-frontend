"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import Search from "../microComponents/Search";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { individualmeetingscreenApi } from "../api/apiService/individualmeetingscreenApiService";
import { individualmeetingscreen } from "../api/jsonService/individualmeetingscreenJsonService";
import { headerbutton, search, nav } from "./Path/TaskData";
import {IndividualMeetingScreentitle} from "./Path/TitlePaths";

interface Lead {
  id: number;
  name: string;
  date: string;
  time: string;
  owner: string;
  callType: string;
}


const IndividualMeetingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const user = useSelector((state: RootState) => state.auth);
  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        const response = useDummyData
          ? await individualmeetingscreenApi()
          : await individualmeetingscreen();
        setLeads(response);
        setTotalItems(response.length);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  const getCallTypeStyle = (callType: string) => {
    const typeMap: Record<string, string> = {
      Offline: "bg-green-100 text-green-800",
      Virtual: "bg-indigo-100 text-indigo-800",
    };
    return typeMap[callType] || "";
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = leads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      {/* <div>
        <h1>Welcome, {user?.name || "Guest"}!</h1>
      </div> */}

      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
          <Title title={IndividualMeetingScreentitle[0].titleName} />
          <div className="ml-5">
            <Search searchText={search[2].searchText} value={""} onChange={function (value: string): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <button
              className="border shadow-sm bg-white text-bg-blue-12 font-normal h-10 rounded-xl 
                   flex items-center justify-center gap-2 w-full sm:w-auto 
                    min-w-[100px]"
            >
              <img src="calender_icon.svg" className="w-6 h-6" alt="Calender" />
              <div className="text-[12px] sm:text-sm whitespace-nowrap">
                Calender
              </div>
            </button>
            <HeaderButtons
              button1Text={headerbutton[2].button1text}
              button1img={headerbutton[2].button1img}
              button2Text={headerbutton[2].button2text}
              button2img={headerbutton[2].button2img}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading leads...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-custom">
          <table className="min-w-full bg-white">
            <thead className="bg-bg-blue-12 text-white ">
              <tr>
                <th className="px-6 py-4 text-left">Lead</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Lead Owner</th>
                <th className="px-6 py-4 text-left">Call Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-5">{lead.name}</td>
                  <td className="px-6 py-5">{lead.date}</td>
                  <td className="px-6 py-5">{lead.time}</td>
                  <td className="px-6 py-5">{lead.owner}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getCallTypeStyle(
                        lead.callType
                      )}`}
                    >
                      {lead.callType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="relative">
            <select
              className="appearance-none border rounded-md py-1 px-3 pr-8 bg-white focus:outline-none focus:border-indigo-500"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
          <span className="ml-4 text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, totalItems)} of {totalItems} results
          </span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => handlePageChange(1)}
            className={`px-3 py-1 font-medium rounded ${
              currentPage === 1 ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
          >
            1
          </button>
          <button
            onClick={() => handlePageChange(2)}
            className={`px-3 py-1 font-medium rounded ${
              currentPage === 2 ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
          >
            2
          </button>
          <button
            onClick={() => handlePageChange(3)}
            className={`px-3 py-1 font-medium rounded ${
              currentPage === 3 ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
          >
            3
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-white text-gray-700 font-medium rounded border"
            disabled={currentPage >= totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualMeetingScreen;
