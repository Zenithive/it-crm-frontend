"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface TablerLayoutProps {
  resources: any[];
  loading: boolean;
  error: string | null;
}

const TablerLayoutPage: React.FC<TablerLayoutProps> = ({ resources, loading, error }) => {
  const router = useRouter();

  const handleResourceClick = (resource: any) => {
    const caseStudyID = encodeURIComponent(resource.caseStudyID);
    router.push(`/individualcasestudy/${caseStudyID}`);
  };

  return (
    <div className="w-full">
      {loading ? (
        <p className="text-gray-500 text-center mt-6">Loading resources...</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-6">{error}</p>
      ) : (
        <div className="bg-white shadow-custom rounded-2xl p-4 sm:p-6 lg:p-8">
          {resources.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No resources found</p>
          ) : (
            resources.map((resource, index) => (
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
                    {resource.tags.map((tag: string, tagIndex: number) => (
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
      )}
    </div>
  );
};

export default TablerLayoutPage;