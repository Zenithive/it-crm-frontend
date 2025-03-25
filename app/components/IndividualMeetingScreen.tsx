"use client"
import React, { useState, useMemo } from "react";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import Search from "../microComponents/Search";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { headerbutton, search, nav } from "./Path/TaskData";
import { IndividualMeetingScreentitle } from "./Path/TitlePaths";
import leadsApiService from "../api/apiService/leadsApiService";
import { Calendar } from 'lucide-react';

const IndividualMeetingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { 
    integratedMeetings, 
    googleMeetingsLoading, 
    googleMeetingsError 
  } = leadsApiService(currentPage, itemsPerPage);

  const processedMeetings = useMemo(() => {
    const filteredMeetings = integratedMeetings.filter(meeting => 
      meeting.lead?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.lead?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredMeetings.slice(indexOfFirstItem, indexOfLastItem);
  }, [integratedMeetings, currentPage, itemsPerPage, searchTerm]);

  const totalItems = integratedMeetings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getCallTypeStyle = (lead?: { campaign?: { campaignCountry?: string } }) => {
    const callType = lead?.campaign?.campaignCountry || "Virtual";
    const typeMap: Record<string, string> = {
      Virtual: "bg-indigo-100 text-indigo-800",
      Offline: "bg-green-100 text-green-800",
    };
    return typeMap[callType] || "bg-gray-100 text-gray-800";
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  if (googleMeetingsLoading) return <div>Loading meetings...</div>;
  if (googleMeetingsError) return <div>Error: {googleMeetingsError}</div>;

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex items-center">
          <Title title={IndividualMeetingScreentitle[0].titleName} />
          <div className="ml-5">
            <Search 
              searchText={search[2].searchText} 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <button
              className="border shadow-sm bg-white text-bg-blue-12 font-normal h-10 rounded-xl 
                   flex items-center justify-center gap-2 w-full sm:w-auto 
                    min-w-[100px]"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[12px] sm:text-sm whitespace-nowrap">
                Calendar
              </span>
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

      <div className="overflow-x-auto rounded-lg shadow-custom">
        <table className="min-w-full bg-white">
          <thead className="bg-bg-blue-12 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Lead</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Lead Owner</th>
              <th className="px-6 py-4 text-left">Call Type</th>
  
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processedMeetings.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-5">
                  {item.lead 
                    ? `${item.lead.firstName} ${item.lead.lastName}` 
                    : 'Unassigned'}
                </td>

                <td className="px-6 py-5">
                  {item.meeting.date.toLocaleDateString()}
                </td>
                <td className="px-6 py-5">{item.meeting.time}</td>
                <td className="px-6 py-5">
                  {item.lead?.leadAssignedTo?.name || 'Unassigned'}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${getCallTypeStyle(item.lead)}`}
                  >
                    {item.lead?.campaign?.campaignCountry || 'Virtual'}
                  </span>
                </td>
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </span>
        </div>
        <div className="flex space-x-1">
          {[...Array(Math.min(3, totalPages))].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 font-medium rounded ${
                currentPage === index + 1 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white border"
              }`}
            >
              {index + 1}
            </button>
          ))}
          {totalPages > 3 && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 bg-white text-gray-700 font-medium rounded border"
              disabled={currentPage >= totalPages}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualMeetingScreen;