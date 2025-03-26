

// export const Filter: React.FC<FilterProps> = ({
//   onClose,
//   onApply,
//   currentIndustry,
//   currentTechnology
// }) => {
//   const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(currentIndustry);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCategory, setActiveCategory] = useState<"industry" | "technology">("industry");
//   const [selectedTechnology, setSelectedTechnology] = useState<string | undefined>(currentTechnology);

//   const industries = [
//     "E-Commerce",
//     "Real Estate",
//     "Pet Store",
//     "Finance",
//     "Technology",
//     "Healthcare",
//     "Education",
//     "Manufacturing",
//   ];

//   const technologies = [
//     "SaaS",
//     "Network Security",
//     "Databases",
//     "Mobile Apps",
//     "Cloud Computing",
//     "AI/ML",
//     "Node.js", // Example technology for testing
//   ];

//   const currentList = activeCategory === "industry" ? industries : technologies;
//   const filteredItems = currentList.filter(item =>
//     item.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleApply = () => {
//     let filterPayload = {};

//     // Determine the filter structure based on the active category
//     if (activeCategory === "industry") {
//       filterPayload = { industryTarget: selectedIndustry };
//     } else if (activeCategory === "technology") {
//       filterPayload = { techStack: selectedTechnology };
//     }

//     // Construct the final payload
//     const finalPayload = {
//       filter: filterPayload,
//       pagination: {
//         page: 1,
//         pageSize: 9,
//       },
//       sort: {
//         field: "createdAt",
//         order: "DESC",
//       },
//     };

//     console.log("Applying filter with payload:", finalPayload);
//     onApply(finalPayload); // Send the final payload
//   };

//   const handleClear = () => {
//     setSelectedIndustry(undefined);
//     setSelectedTechnology(undefined);
//     setSearchTerm("");
//   };

//   return (
//     <div className="bg-white rounded-xl w-full max-w-[600px] overflow-hidden">
//       {/* Header */}
//       <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-white">Filters</h2>
//         <button onClick={onClose} className="text-white hover:text-gray-200">
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="flex h-[500px]">
//         {/* Left sidebar */}
//         <div className="w-[200px] border-r border-gray-200 p-4">
//           <div
//             onClick={() => setActiveCategory("industry")}
//             className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer ${
//               activeCategory === "industry" ? "bg-indigo-50" : ""
//             }`}
//           >
//             <div className="w-4 h-4 border-2 border-indigo-600 rounded-full bg-white flex items-center justify-center">
//               {activeCategory === "industry" && (
//                 <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
//               )}
//             </div>
//             <span className="text-sm font-medium">Industry</span>
//           </div>

//           <div
//             onClick={() => setActiveCategory("technology")}
//             className={`flex items-center gap-2 py-2 px-3 mt-2 rounded-lg cursor-pointer ${
//               activeCategory === "technology" ? "bg-indigo-50" : ""
//             }`}
//           >
//             <div className="w-4 h-4 border-2 border-indigo-600 rounded-full bg-white flex items-center justify-center">
//               {activeCategory === "technology" && (
//                 <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
//               )}
//             </div>
//             <span className="text-sm font-medium">Technology</span>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 p-6">
//           {/* Search input */}
//           <div className="relative mb-6">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder={`Search ${activeCategory === "industry" ? "Industry" : "Technology"}...`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>

//           {/* Options list */}
//           <div className="space-y-2">
//             {filteredItems.map((item) => (
//               <div
//                 key={item}
//                 onClick={() => {
//                   if (activeCategory === "industry") {
//                     setSelectedIndustry(item === selectedIndustry ? undefined : item);
//                   } else {
//                     setSelectedTechnology(item === selectedTechnology ? undefined : item);
//                   }
//                 }}
//                 className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
//               >
//                 <div className={`w-5 h-5 rounded border ${
//                   (activeCategory === "industry" ? selectedIndustry === item : selectedTechnology === item)
//                     ? 'border-indigo-600 bg-indigo-600 flex items-center justify-center'
//                     : 'border-gray-300'
//                 }`}>
//                   {((activeCategory === "industry" ? selectedIndustry === item : selectedTechnology === item)) && (
//                     <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
//                       <polyline points="20 6 9 17 4 12"></polyline>
//                     </svg>
//                   )}
//                 </div>
//                 <span className="text-sm text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
//         <button
//           onClick={handleClear}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
//         >
//          <img src="/cross_icon.svg" alt="cancle" className="w-3 h-3"></img>
//           Clear Filter
//         </button>
//         <button
//           onClick={handleApply}
//           className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           Show Result
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useState } from "react";
import { X, Search } from "lucide-react";
interface FilterProps {
  onClose: () => void;
  onApply: (filter: any) => void;
  sections: {
    id: string;
    title: string;
    options: { id: string; label: string; checked: boolean }[]
  }[];
  renderRightPanel: (
    activeSection: string,
    selectedOptions: string[],
    searchTerm: string // Add searchTerm as a parameter
  ) => React.ReactNode;
  selectedOptions: string[];
  startDate?: string;
  endDate?: string;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}
const Filter: React.FC<FilterProps> = ({
  onClose,
  onApply,
  sections,
  renderRightPanel,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const handleApply = () => {
    const filterPayload = {
      filter: {
        [activeSection]: selectedOptions.length > 0 ? selectedOptions[0] : undefined
      },
      pagination: {
        page: 1,
        pageSize: 9,
      },
      sort: {
        field: "createdAt",
        order: "DESC",
      },
    };
    onApply(filterPayload);
  };
  const getSectionTitle = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? section.title.toLowerCase() : sectionId;
  };
  return (
    <div className="bg-white rounded-xl w-full max-w-[600px] overflow-hidden">
      <div className="bg-bg-blue-12 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Filters</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex h-[500px]">
        <div className="w-[200px] border-r border-gray-200 p-4">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setSelectedOptions([]);
                setSearchTerm(""); // Reset search when switching sections
              }}
              className={`flex items-center gap-2 py-3 px-3 rounded-lg cursor-pointer ${
                activeSection === section.id ? "bg-indigo-50" : ""
              }`}
            >
              <div className="w-4 h-4 border-2 border-bg-blue-12 rounded-full bg-white flex items-center justify-center">
                {activeSection === section.id && (
                  <div className="w-2 h-2 bg-bg-blue-12 rounded-full"></div>
                )}
              </div>
              <span className="text-sm font-medium">{section.title}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mt-1">
            {activeSection !== "type" &&
              activeSection !== "stage" &&
              activeSection !== "date" &&
              activeSection !== "priority" &&
              activeSection !== "status" &&
              activeSection !== "rating" &&
              activeSection !== "experienceYear" &&
              activeSection !== "role" && (
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search ${getSectionTitle(activeSection)}...`}
                    className="w-full p-2 pl-8 border rounded-lg focus:outline-none"
                  />
                  <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              )}
          </div>
          {renderRightPanel(activeSection, selectedOptions, searchTerm)}
        </div>
      </div>
      <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
        <button className="flex justify-center items-center">
          <img src="/cross_icon.svg" alt="cancel" className="w-3 h-3 mr-2" />
          <div
            className="text-gray-600 hover:text-gray-800"
            onClick={() => {
              setSearchTerm("");
              setSelectedOptions([]);
              onApply({
                filter: {},
                pagination: { page: 1, pageSize: 9 },
                sort: { field: "createdAt", order: "DESC" }
              });
            }}
          >
            Clear Filter
          </div>
        </button>
        <button
          className="px-6 py-2 bg-bg-blue-12 text-white rounded-lg"
          onClick={handleApply}
        >
          Show Result
        </button>
      </div>
    </div>
  );
};

export default Filter;
