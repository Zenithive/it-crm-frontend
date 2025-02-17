"use client";
import React, { useState } from "react";
import Pagination from "../../microComponents/Pagination";

interface Resource {
  title: string;
  company: string;
  tags: string[];
}

interface ResourceContainerProps {
  resources: Resource[];
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  onItemClick?: (resource: Resource) => void;
  isResourceList?: boolean;
}

const ResourceContainer: React.FC<ResourceContainerProps> = ({
  resources,
  itemsPerPage,
  setItemsPerPage,
  onItemClick,
  isResourceList = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = resources.slice(startIndex, endIndex);

  return (
    <div className={`w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px] ${isResourceList ? '' : ''}`}>
      <div className="flex-grow mt-6">
        <div className={`bg-white shadow-custom rounded-2xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
            {currentItems.map((resource, index) => (
              <div
                key={index}
                className={`
                bg-blue_shadow
                  p-4 sm:p-6 rounded-xl 
                  shadow-custom
                  transition-all duration-300 
                  flex flex-col min-h-[170px] h-full
                  cursor-pointer
                `}
                onClick={() => onItemClick && onItemClick(resource)}
              >
                {/* Title */}
                <h3 className={`
                  text-bg-blue-12
                  text-lg sm:text-xl lg:text-2xl font-semibold 
                  mb-3 sm:mb-4 line-clamp-2 max-w-[350px]
                `}>
                  {resource.title}
                </h3>

                {/* Content area */}
                <div className="flex-grow flex flex-col justify-between">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`
                          px-3 py-1.5 
                          bg-white text-bg-blue-12
                          rounded-lg text-md font-medium
                          whitespace-normal break-words 
                          flex items-center justify-center
                          min-w-[100px] flex-shrink-0
                        `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom section */}
                  <div className={`w-full ${isResourceList ? 'flex justify-between items-center mb-4 lg:mb-0' : ''}`}>
                    <span className="text-xs sm:text-sm truncate max-w-[60%] font-normal">
                      {resource.company}
                    </span>
                    <div className={`flex items-center gap-1 ${isResourceList ? '' : 'mt-3'}`}>
                      <span className="text-sm font-normal">
                        {isResourceList ? 'View' : 'View Details'}
                      </span>
                      <img
                        className="w-4 h-4"
                        src= "arrow_bold.svg"
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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