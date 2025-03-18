"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Pagination from "../../microComponents/Pagination";
import { useResourceList } from "../../api/apiService/resourcelistApiService";
import { resourcelistJson } from "../../api/jsonService/resourcelistJsonService";

interface Resource {
  id: string; // Add id to the Resource interface
  title: string;
  company: string;
  tags: string[];
}

const ResourceContainer = () => {
  const router = useRouter(); // Initialize router
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  // For API data, we use the actual page and pageSize values
  const { data, loading, error, totalItems } = useResourceList({
    page: currentPage,
    pageSize: itemsPerPage,
    firstName: null,
    status: null,
    vendorID: null,
    skillIDs: [],
    search: null,
  });
  console.log(`data111`, data);

  // Process resources based on data source
  const resources: Resource[] = useDummyData
    ? resourcelistJson().map((item, index) => ({
        id: `dummy-${index}`, // Add an id for dummy data
        ...item
      }))
    : data?.getResourceProfiles.items.map((item) => ({
        id: item.resourceProfileID, // Use the actual id from API data
        title: `${item.firstName} ${item.lastName}`,
        company: item.vendor.companyName,
        tags: item.resourceSkills.map((skill) => skill.skill.name),
      })) || [];

  // Only apply the slice operation for dummy data
  // For API data, we're already getting the correct page from the backend
  const currentItems = useDummyData 
    ? resources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : resources;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // You might want to scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle resource navigation
  const handleViewDetails = (resourceId: string) => {
    router.push(`/resourcemanagment/${resourceId}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px]">
      <div className="flex-grow mt-6">
        <div className="bg-white shadow-custom rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error.message}</p>
            ) : currentItems.length === 0 ? (
              <p className="col-span-3 text-center py-8">No resources found</p>
            ) : (
              currentItems.map((resource, index) => (
                <div
                  key={index}
                  className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full cursor-pointer"
                  onClick={() => handleViewDetails(resource.id)}
                >
                  <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 line-clamp-2 max-w-[350px]">
                    {resource.title}
                  </h3>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal flex justify-center items-center break-words min-w-[100px]"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal flex justify-center items-center">
                          +{resource.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
                      <span className="text-xs sm:text-sm truncate max-w-[60%] font-normal">
                        {resource.company}
                      </span>
                      <div 
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent onClick
                          handleViewDetails(resource.id);
                        }}
                      >
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
          currentPage={currentPage}
          totalItems={totalItems || (useDummyData ? resources.length : 0)}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          multiplicationFactor={9}
        />
      </div>
    </div>
  );
};

export default ResourceContainer;