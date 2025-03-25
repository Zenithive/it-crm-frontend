"use client";
import React,{useState,useEffect} from "react";
import useIndividualVendorData from "../../api/apiService/individualvendorApiService";

interface Resource {
  title: string;
  company: string;
  tags: string[];
  firstName: string;
  lastName: string;
  resourceSkills: { skill: { name: string }; }[];
  status: string;
}



const VendorResourceList = ({ vendorId}: { vendorId: string }) => {

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
 


  // const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = individualvendor();
  
  //       // Extract resourceList, ensure it is an array
  //       const resourcesData = response?.resourceList ?? [];  
  //       setResources(Array.isArray(resourcesData) ? resourcesData : []);  
  //     } catch (err) {
  //       console.error("Error fetching resources:", err);
  //       setError("Failed to load resources");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, [useDummyData]);
  
  const { vendor, loading: vendorLoading, error: vendorError } = useIndividualVendorData(vendorId);
  
  useEffect(() => {
    if (vendor?.resources) {
      setResources(vendor.resources);  // ✅ Extracts the resource list specifically

      console.log(vendor.resources);
    }
    if (vendorError) {
      setError(vendorError);
    }
    setLoading(vendorLoading);
  }, [vendor, vendorLoading, vendorError]);
  
  return (
    
      <div className="mt-4 mr-4">
        <div className="bg-white shadow-custom rounded-xlxl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 sm:p-6 lg:p-8">
            
             {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full cursor-pointer"
                >
                  {/* Title */}
                  <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 line-clamp-2 max-w-[350px]">
                  {`${resource.firstName} ${resource.lastName}`}
                  </h3>

                  {/* Tags */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* {resource?.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal  flex justify-center items-center break-words min-w-[80px]"
                        >
                          {tag}
                        </span>
                      ))} */}
                        {resource?.resourceSkills.length > 0 ? (
          resource.resourceSkills.map((skillObj, skillIndex) => (
            <span
              key={skillIndex}
              className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal flex justify-center items-center break-words min-w-[80px]"
            >
              {`${skillObj.skill.name} `}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No skills listed</span>
        )}
                    </div>

                    {/* Bottom section */}
                    <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
                      <span className="text-xs sm:text-sm truncate max-w-[60%] font-normal">
                        {/* {resource.status} */}
                    
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
