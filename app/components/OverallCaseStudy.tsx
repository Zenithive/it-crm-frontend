"use client"
import React, { useState, useEffect } from "react";
import Pagination from "../microComponents/Pagination";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search } from "./Path/TaskData";
import { OverallCaseStudytitle } from "./Path/TitlePaths";
import Title from "../microComponents/Title";
import TablerLayout from "./OverallCaseStudy/TablerLayout";
import useOverallCaseStudyData from "../api/apiService/overallcasestudyApiService";
import AddCaseStudyForm from "./AddCaseStudyForm";
import { useRouter } from "next/navigation";

interface Resource {
  title: string;
  company: string;
  tags: string[];
  caseStudyID: string;
  projectName:string;
}

const ResourceContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [isTableView, setIsTableView] = useState(false);
  const router = useRouter();
  
  // Updated to use the modified hook without industry filter by default
  const { caseStudies, totalItems, loading, error, refetch } = useOverallCaseStudyData(
    currentPage, 
    itemsPerPage
  );
  
  const resources = caseStudies.map((item: any) => {
    console.log("Mapping item:", item);
    return {
      title: item.projectName || "No Title",
      company: item.clientName || "No Company",
      tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(", ").map((tag: any) => tag.trim()) : []),
      caseStudyID: item.caseStudyID || "No ID",
    };
  });
  
  console.log("Mapped resources:", resources);
  
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
  
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-4">
            <Title title={OverallCaseStudytitle[0].titleName} />
            <Search searchText={search[1].searchText} />
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
              onClick2={() => setShowForm(true)}
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
          <TablerLayout />
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
                          src="arrow_bold.svg"
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
    </>
  );
};

export default ResourceContainer;