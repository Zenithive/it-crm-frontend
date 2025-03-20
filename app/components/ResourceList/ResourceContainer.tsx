"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Pagination from "../../microComponents/Pagination";
import { useResourceList } from "../../api/apiService/resourcelistApiService";

interface Resource {
  id: string;
  title: string;
  experience: string;
  company: string;
  tags: string[];
}

interface ResourceContainerProps {
  searchQuery?: string;
  vendorNameFilter?: string;
  experienceYearFilter?: string;
  skillsFilter?: string;
}

const ResourceContainer: React.FC<ResourceContainerProps> = ({
  searchQuery = "",
  vendorNameFilter,
  experienceYearFilter,
  skillsFilter,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Reset to first page when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, vendorNameFilter, experienceYearFilter, skillsFilter]);

  const { data, loading, error, totalItems } = useResourceList({
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchQuery || null,
    vendorName: vendorNameFilter || null,
    totalExperience: experienceYearFilter || null,
    skills: skillsFilter || null,
  });

  // Map API data to Resource interface
  const resources: Resource[] = data.map((item: any) => ({
    id: item.resourceProfileID,
    title: `${item.firstName} ${item.lastName}`,
    experience: `${item.totalExperience} years`,
    company: item.vendor.companyName,
    tags: item.resourceSkills.map((skill: any) => skill.skill.name),
  }));

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
            ) : resources.length === 0 ? (
              <p className="col-span-3 text-center py-8">No resources found</p>
            ) : (
              resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full cursor-pointer"
                  onClick={() => handleViewDetails(resource.id)}
                >
                  <div className="flex justify-between">
                    <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 line-clamp-2 max-w-[350px]">
                      {resource.title}
                    </h3>
                    <h3 className="text-black font-normal text-xl">({resource.experience})</h3>
                  </div>
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
                          e.stopPropagation();
                          handleViewDetails(resource.id);
                        }}
                      >
                        <span className="text-sm font-normal mr-1">View</span>
                        <img className="w-4 h-4 mt-1" src="arrow_bold.svg" alt="arrow" />
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
          totalItems={totalItems}
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