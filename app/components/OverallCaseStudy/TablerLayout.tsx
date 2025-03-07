"use client";
import React, { useState,useEffect } from "react";
import Pagination from "../../microComponents/Pagination";
// import { overallcasestudyDataApi } from "../../api/apiService/overallcasestudyApiService"; 
import { overallcasestudyDataJson } from "../../api/jsonService/overallcasestudyJsonService"

interface Resource {
  title: string;
  company: string;
  tags: string[];
}

const TablerLayout=()=> {
  const [currentPage, setCurrentPage] = useState(1);

  const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState(9); 
      const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            // const response = useDummyData
            //   ? await overallcasestudyDataApi()
            //   : overallcasestudyDataJson();

            const response = await overallcasestudyDataJson();
              
            setResources(response ?? []);
          } catch (err) {
            console.error("Error fetching resources:", err);
            setError("Failed to load resources");
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [useDummyData]);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = resources.slice(startIndex, endIndex);

  
  return (
    <div>
      <div className={`w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px]`}>
        <div className="bg-white shadow-custom rounded-2xl p-4 sm:p-6 lg:p-8 mt-6">
          {currentItems.map((resource, index) => (
            <div
              key={index}
              className="bg-blue_shadow p-6 rounded-xl hover:shadow-lg transition-shadow mb-4 flex justify-between items-center"
            >

              <div className="flex-1">
                <div className="mb-4 max-w-[300px]">
                  <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold">
                    {resource.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white text-bg-blue-12 rounded-lg text-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-black text-sm">
                  {resource.company}
                </p>
              </div>

        
              <div className="ml-6">
                <div className="bg-white p-2 rounded-lg flex items-center">
                  <button className="text-bg-blue-12 text-sm">
                    View Details
                  </button>
                  <img
                    src="icon_3.svg"
                    alt="arrow"
                    className="w-4 h-4 ml-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Pagination
          totalItems={resources.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          } } currentPage={0}        />
      </div>
    </div>
  );
};

export default TablerLayout;