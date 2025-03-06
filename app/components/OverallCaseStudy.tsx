"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../microComponents/Pagination"
import { overallcasestudyDataApi } from "../api/apiService/overallcasestudyApiService"; 
import { overallcasestudyDataJson } from "../api/jsonService/overallcasestudyJsonService"
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search, nav } from "./Path/TaskData";
import { useRouter } from "next/navigation";
import { OverallCaseStudytitle } from "./Path/TitlePaths";
import Title from "../microComponents/Title";
import TablerLayout from "./OverallCaseStudy/TablerLayout";

interface Resource {
  title: string;
  company: string;
  tags: string[];
}

const ResourceContainer = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default value moved inside component

  const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = useDummyData
          ? await overallcasestudyDataApi()
          : overallcasestudyDataJson();
          
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

  const router = useRouter();
  const handleLayoutChange = () => {
    router.push("/tableviewoverallcase");
  };
  
  const handleResourceClick = (resource: Resource) => {
    // Handle resource click - can be customized as needed
    console.log('Resource clicked:', resource);
  };

  return (
<>
     {/* Header Section */}
     <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
     <div className="flex justify-between items-center w-full">
       {/* Left Side: Title & Search Bar */}
       <div className="flex items-center space-x-4">
         <Title title={OverallCaseStudytitle[0].titleName} />
         <Search searchText={search[1].searchText} />
       </div>

       {/* Right Side: Header Buttons & Toggle Buttons */}
       <div className="flex items-center space-x-6">
         {/* Toggle Buttons */}
         <div className="flex space-x-4">
           <button  className="w-7 h-7">
             <img
               src="/overallCaseStudy.svg"
               alt="Overall View"
               className="w-full h-full"
             />
           </button>
           <button onClick={handleLayoutChange} className="w-7 h-7">
             <img
               src="/tabler_layout-list.svg"
               alt="List View"
               className="w-full h-full"
             />
           </button>
         </div>

         {/* Header Buttons */}
         <HeaderButtons
           button1Text={headerbutton[1].button1text}
           button1img={headerbutton[1].button1img}
           button2Text={headerbutton[1].button2text}
           button2img={headerbutton[1].button2img}
           button1width="w-[109px]"
           button2width="w-[160px]"
         />
       </div>
     </div>
   </div>

    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[70px]">
      {loading ? (
        <p className="text-gray-500 text-center">Loading resources...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <div className="flex-grow mt-6">
            <div className="bg-white shadow-custom rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
                {currentItems.map((resource, index) => (
                  <div
                    key={index}
                    className="bg-blue_shadow p-4 sm:p-6 rounded-xl shadow-custom transition-all duration-300 flex flex-col min-h-[170px] h-full cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <h3 className="text-bg-blue-12 text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 line-clamp-2 max-w-[350px]">
                      {resource.title}
                    </h3>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1.5 bg-white text-bg-blue-12 rounded-lg text-md font-medium whitespace-normal break-words flex items-center justify-center min-w-[100px] flex-shrink-0">
                            {tag}
                          </span>
                        ))}
                      </div>
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
                ))}
              </div>
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
                    } } currentPage={0}            />
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default ResourceContainer;







// const router = useRouter();
//   const [itemsPerPage, setItemsPerPage] = useState(9);

//   const handleLayoutChange = () => {
//     router.push("/overallcasestudy");
//   };

//   return (
//     <div>
//       {/* Header Section */}
//       <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
//         <div className="flex justify-between items-center w-full">
//           {/* Left Side: Title & Search Bar */}
//           <div className="flex items-center space-x-4">
//             <Title title={OverallCaseStudytitle[0].titleName} />
//             <Search searchText={search[1].searchText} />
//           </div>

//           {/* Right Side: Header Buttons & Toggle Buttons */}
//           <div className="flex items-center space-x-6">
//             {/* Toggle Buttons */}
//             <div className="flex space-x-4">
//               <button onClick={handleLayoutChange} className="w-6 h-6">
//                 <img
//                   src="/overallCaseStudy_2.svg"
//                   alt="Overall View"
//                   className="w-full h-full"
//                 />
//               </button>
//               <button className="w-7 h-7">
//                 <img
//                   src="/tabler_layout-list_2.svg"
//                   alt="List View"
//                   className="w-full h-full"
//                 />
//               </button>
//             </div>
