"use client";
import React,{useState,useEffect} from "react";
import VendorLayout from "./VendorLayout";
import { individualvendorApi} from "../../api/apiService/individualvendorApiService";
import { individualvendor } from "../../api/jsonService/individualvendorJsonService";

interface Resource {
  title: string;
  company: string;
  tags: string[];
}

const VendorResourceList = () => {

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);


  const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = useDummyData ? await individualvendorApi() : individualvendor();
  
        // Extract resourceList, ensure it is an array
        const resourcesData = response?.resourceList ?? [];  
        setResources(Array.isArray(resourcesData) ? resourcesData : []);  
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [useDummyData]);
  

  return (
    
      <div className="flex-grow mt-4 mr-6">
        <div className="bg-white shadow-custom rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 sm:p-6 lg:p-8">
            
             {resources.map((resource, index) => (
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
                          className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal  flex justify-center items-center break-words min-w-[80px]"
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
            }
          </div>
        </div>
      </div>
 
  );
};

export default VendorResourceList;
