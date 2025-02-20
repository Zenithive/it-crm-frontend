"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../../microComponents/Pagination";
import { resourcelistApi } from "../../api/apiService/resourcelistApiService";
import { resourcelistJson } from "../../api/jsonService/resourcelistJsonService";

interface Resource {
  title: string;
  company: string;
  tags: string[];
}

const ResourceContainer = () => {
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
        const response = useDummyData ? await resourcelistApi() : resourcelistJson();
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
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px]">
      <div className="flex-grow mt-6">
        <div className="bg-white shadow-custom rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              currentItems.map((resource, index) => (
                <div
                  key={index}
                  className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full cursor-pointer"
                >
                  {/* Title */}
                  <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 line-clamp-2 max-w-[350px]">
                    {resource.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal  flex justify-center items-center break-words min-w-[100px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom section */}
                    <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
                      <span className="text-xs sm:text-sm truncate max-w-[60%] font-normal">
                        {resource.company}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-normal">View Details</span>
                        <img className="w-4 h-4" src="arrow_bold.svg" alt="arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Pagination
          totalItems={resources.length}
          initialItemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default ResourceContainer;
