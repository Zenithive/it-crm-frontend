"use client";
import React, { useState } from "react";
import Pagination from "../../microComponents/Pagination";
import AddCaseStudyForm from "../AddCaseStudyForm";
import { useRouter } from "next/navigation";
import useOverallCaseStudyData  from "../../api/apiService/overallcasestudyApiService"; // Ensure this import is correct

interface Resource {
  title: string;
  company: string;
  tags: string[];
  caseStudyID: string;
}

const TablerLayoutPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const { caseStudies, loading, error } = useOverallCaseStudyData(currentPage, itemsPerPage);
  

  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // Format case studies data
  const resources: Resource[] =
    caseStudies?.map((item: any) => ({
      title: item.projectName,
      company: item.clientName,
      tags: item.tags ? item.tags.split(", ").map((tag: any) => tag.trim()) : [],
      caseStudyID: item.caseStudyID,
    })) ?? [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = resources.slice(startIndex, endIndex);

  const handleResourceClick = (resource: Resource) => {
    const caseStudyID = encodeURIComponent(resource.caseStudyID);
    router.push(`/individualcasestudy/${caseStudyID}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading ? (
        <p className="text-gray-500 text-center mt-6">Loading resources...</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-6">{error}</p>
      ) : (
        <>
          <div className="bg-white shadow-custom rounded-2xl p-4 sm:p-6 lg:p-8">
            {currentItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No resources found</p>
            ) : (
              currentItems.map((resource, index) => (
                <div
                  key={index}
                  className="bg-blue_shadow p-6 rounded-xl hover:shadow-lg transition-shadow mb-4 flex justify-between items-center cursor-pointer"
                  onClick={() => handleResourceClick(resource)}
                >
                  <div className="flex-1">
                    <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-4 max-w-[300px]">
                      {resource.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-white text-bg-blue-12 rounded-lg text-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-black text-sm">{resource.company}</p>
                  </div>
                  <div className="ml-6">
                    <div className="bg-white p-2 rounded-lg flex items-center">
                      <button className="text-bg-blue-12 text-sm">View Details</button>
                      <img src="arrow_bold.svg" alt="arrow" className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AddCaseStudyForm onClose={() => setShowForm(false)} onSubmit={async () => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default TablerLayoutPage;
