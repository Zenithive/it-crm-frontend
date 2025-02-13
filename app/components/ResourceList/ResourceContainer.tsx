import React, { useState } from "react";
import Pagination from "../../microComponents/Pagination";

const ResourceContainer = () => {
  const resources = Array(20).fill({
    title: "Zenithive",
    company: "Tech Solution Inc",
    tags: ["E-commerce", "UI/UX", "SWD"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = resources.slice(startIndex, endIndex);
  return (
    <div>
      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="bg-white shadow-custom rounded-[18px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
            {currentItems.map((resource, index) => (
              <div
                key={index}
                className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow 
                             w-full min-h-[170px]"
              >
                {/* Title */}
                <h3 className="text-bg-blue-12 text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  {resource.title}
                </h3>

                {/* Content Container */}
                <div className="flex flex-col h-[calc(100%-64px)]">
                  {/* Tags Container */}
                  <div className="flex flex-wrap gap-2 mb-auto">
                    {resource.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-white text-bg-blue-12 
                                   rounded-lg text-md font-semibold whitespace-nowrap min-w-[120px] 
                                   flex items-center justify-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Row - Aligned with last tag */}
                  <div className="flex justify-between items-center mt-4 w-full">
                    <span className="text-xs sm:text-sm font-normal text-black">
                      {resource.company}
                    </span>
                    <button className="text-black flex items-center space-x-1 font-normal text-sm sm:text-md">
                      <span>View</span>
                      <img
                        className="mt-1 w-4 sm:w-5"
                        src="arrow_bold.svg"
                        alt="arrow"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        totalItems={resources.length}
        initialItemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default ResourceContainer;
