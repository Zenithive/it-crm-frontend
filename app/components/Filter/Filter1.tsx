  // "use client";
  // import React, { useState } from "react";
  // import { X, Search } from "lucide-react";

  // interface FilterProps {
  //   onClose: () => void;
  //   onApply: (filter: any) => void;
  //   sections: {
  //     id: string;
  //     title: string;
  //     options: { id: string; label: string; checked: boolean }[]
  //   }[];
  //   renderRightPanel: (
  //     activeSection: string,
  //     selectedOptions: string[],
  //     searchTerm: string
  //   ) => React.ReactNode;
  //   selectedOptions: string[]; // Kept for backward compatibility
  //   startDate?: string;
  //   endDate?: string;
  //   setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>; // Kept for backward compatibility
  //   pageType?: string;
  //   clearFilters?: () => void; // New prop
  //   selectedOptionsByCategory?: { [category: string]: string[] }; // New prop
  // }

  // const Filter1: React.FC<FilterProps> = ({
  //   onClose,
  //   onApply,
  //   sections,
  //   renderRightPanel,
  //   selectedOptions,
  //   setSelectedOptions,
  //   pageType,
  //   clearFilters,
  //   selectedOptionsByCategory = {}
  // }) => {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");


  

  //   const filteredSections = pageType === 'deals' 
  //     ? sections.filter(section => section.id !== 'stage')
  //     : sections;

  //   const handleApply = () => {
  //     onApply({});
  //   };

  //   const getSectionTitle = (sectionId: string) => {
  //     const section = sections.find(s => s.id === sectionId);
  //     return section ? section.title.toLowerCase() : sectionId;
  //   };

  //   // Count total selected filters across all categories
  //   const getTotalSelectedCount = () => {
  //     return Object.values(selectedOptionsByCategory).reduce(
  //       (sum, options) => sum + options.length, 0
  //     );
  //   };

  //   return (
  //     <div
  //       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  //       onClick={onClose} // Close when clicking outside
  //     >
  //       <div
  //         className="bg-white rounded-xl w-full max-w-[600px] overflow-hidden"
  //         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
  //       >
  //         <div className="bg-bg-blue-12 px-6 py-4 flex justify-between items-center">
  //           <h2 className="text-xl font-semibold text-white">
  //             Filters {getTotalSelectedCount() > 0 && `(${getTotalSelectedCount()})`}
  //           </h2>
  //           <button onClick={onClose} className="text-white hover:text-gray-200">
  //             <X className="w-5 h-5" />
  //           </button>
  //         </div>
  //         <div className="flex h-[500px]">
  //           <div className="w-[200px] border-r border-gray-200 p-4">
  //             {sections.map((section) => {
  //               const selectedCount = selectedOptionsByCategory[section.id]?.length || 0;
                
  //               return (
  //                 <div
  //                   key={section.id}
  //                   onClick={() => {
  //                     setActiveSection(section.id);
  //                     setSearchTerm(""); // Reset search when switching sections
  //                   }}
  //                   className={`flex items-center gap-2 py-3 px-3 rounded-lg cursor-pointer ${
  //                     activeSection === section.id ? "bg-indigo-50" : ""
  //                   }`}
  //                 >
  //                   {/* <div className="w-4 h-4 border-2 border-bg-blue-12 rounded-full bg-white flex items-center justify-center">
  //                     {activeSection === section.id && (
  //                       <div className="w-2 h-2 bg-bg-blue-12 rounded-full"></div>
  //                     )}
  //                   </div> */}
  //                   <input
  //         type="checkbox"
  //         checked={activeSection === section.id}
  //         onChange={() => {
  //           setActiveSection(section.id);
  //           setSearchTerm("");
  //         }}
  //         className="h-4 w-4 border-gray-300 text-bg-blue-12 focus:ring-bg-blue-12"
  //       />
  //                   <span className="text-sm font-medium">
  //                     {section.title}
  //                     {selectedCount > 0 && ` (${selectedCount})`}
  //                   </span>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //           <div className="flex-1 p-6 overflow-y-auto">
  //             <div className="mt-1">
  //               {activeSection !== "type" &&
  //                 activeSection !== "stage" &&
  //                 activeSection !== "date" &&
  //                 activeSection !== "priority" &&
  //                 activeSection !== "status" &&
  //                 activeSection !== "rating" &&
  //                 activeSection !== "experienceYear" &&
  //                 activeSection !== "role" && (
  //                   <div className="relative">
  //                     <input
  //                       type="text"
  //                       value={searchTerm}
  //                       onChange={(e) => setSearchTerm(e.target.value)}
  //                       placeholder={`Search ${getSectionTitle(activeSection)}...`}
  //                       className="w-full p-2 pl-8 border rounded-lg focus:outline-none"
  //                     />
  //                     <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
  //                   </div>
  //                 )}
  //             </div>
  //             {renderRightPanel(activeSection, selectedOptions, searchTerm)}
  //           </div>
  //         </div>
  //         <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
  //           <button className="flex justify-center items-center">
  //             <img src="/cross_icon.svg" alt="cancel" className="w-3 h-3 mr-2" />
  //             <div
  //               className="text-gray-600 hover:text-gray-800"
  //               onClick={() => {
  //                 setSearchTerm("");
  //                 setSelectedOptions([]);
  //               onApply({
  //                 filter: {},
  //                 pagination: { page: 1, pageSize: 9 },
  //                 sort: { field: "createdAt", order: "DESC" }
  //               });
  //             }}
  //           >
  //             Clear Filter
  //           </div>
  //         </button>
  //         <button
  //           className="px-6 py-2 bg-bg-blue-12 text-white rounded-lg"
  //           onClick={handleApply}
  //         >
  //           Show Result
  //         </button>
  //       </div>
  //     </div>
  //     </div>
  //   );
  // };

  // export default Filter1;


//   "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { X, Search } from "lucide-react";

// interface FilterProps {
//   onClose: () => void;
//   onApply: (filter: any) => void;
//   sections: {
//     id: string;
//     title: string;
//     options: { id: string; label: string; checked: boolean }[]
//   }[];
//   renderRightPanel: (
//     activeSection: string,
//     selectedOptions: string[],
//     searchTerm: string
//   ) => React.ReactNode;
//   selectedOptions: string[]; // Kept for backward compatibility
//   startDate?: string;
//   endDate?: string;
//   setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>; // Kept for backward compatibility
//   pageType?: string;
//   clearFilters?: () => void; // New prop
//   selectedOptionsByCategory?: { [category: string]: string[] }; // New prop
// }

// // Create a global reference to store the active section
// // This will persist between component unmounts/remounts
// const lastActiveSection = {
//   value: ""
// };

// const Filter1: React.FC<FilterProps> = ({
//   onClose,
//   onApply,
//   sections,
//   renderRightPanel,
//   selectedOptions,
//   setSelectedOptions,
//   pageType,
//   clearFilters,
//   selectedOptionsByCategory = {}
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Initialize the active section from the global reference or default to first section
//   const [activeSection, setActiveSection] = useState<string>(() => {
//     // Use the stored value if it exists
//     if (lastActiveSection.value && sections.some(s => s.id === lastActiveSection.value)) {
//       return lastActiveSection.value;
//     }
    
//     // Otherwise look for a section with selections
//     for (const sectionId in selectedOptionsByCategory) {
//       if (selectedOptionsByCategory[sectionId]?.length > 0) {
//         return sectionId;
//       }
//     }
    
//     // Default to first section
//     return sections[0]?.id || "";
//   });

//   // Update the global reference whenever active section changes
//   useEffect(() => {
//     lastActiveSection.value = activeSection;
//   }, [activeSection]);

//   const filteredSections = pageType === 'deals' 
//     ? sections.filter(section => section.id !== 'stage')
//     : sections;

//   const handleApply = () => {
//     // The global reference will keep track of the active section
//     onApply({});
//   };

//   const getSectionTitle = (sectionId: string) => {
//     const section = sections.find(s => s.id === sectionId);
//     return section ? section.title.toLowerCase() : sectionId;
//   };

//   // Count total selected filters across all categories
//   const getTotalSelectedCount = () => {
//     return Object.values(selectedOptionsByCategory).reduce(
//       (sum, options) => sum + options.length, 0
//     );
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//       onClick={onClose} // Close when clicking outside
//     >
//       <div
//         className="bg-white rounded-xl w-full max-w-[600px] overflow-hidden"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//       >
//         <div className="bg-bg-blue-12 px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-white">
//             Filters {getTotalSelectedCount() > 0 && `(${getTotalSelectedCount()})`}
//           </h2>
//           <button onClick={onClose} className="text-white hover:text-gray-200">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="flex h-[500px]">
//           <div className="w-[200px] border-r border-gray-200 p-4">
//             {sections.map((section) => {
//               const selectedCount = selectedOptionsByCategory[section.id]?.length || 0;
//               const isActive = activeSection === section.id;
              
//               return (
//                 <div
//                   key={section.id}
//                   onClick={() => {
//                     setActiveSection(section.id);
//                     setSearchTerm(""); // Reset search when switching sections
//                   }}
//                   className={`flex items-center gap-2 py-3 px-3 rounded-lg cursor-pointer ${
//                     isActive ? "bg-indigo-50" : ""
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={isActive}
//                     onChange={() => {
//                       setActiveSection(section.id);
//                       setSearchTerm("");
//                     }}
//                     className="h-4 w-4 border-gray-300 text-bg-blue-12 focus:ring-bg-blue-12"
//                   />
//                   <span className="text-sm font-medium">
//                     {section.title}
//                     {selectedCount > 0 && ` (${selectedCount})`}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="flex-1 p-6 overflow-y-auto">
//             <div className="mt-1">
//               {activeSection !== "type" &&
//                 activeSection !== "stage" &&
//                 activeSection !== "date" &&
//                 activeSection !== "priority" &&
//                 activeSection !== "status" &&
//                 activeSection !== "rating" &&
//                 activeSection !== "experienceYear" &&
//                 activeSection !== "role" && (
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       placeholder={`Search ${getSectionTitle(activeSection)}...`}
//                       className="w-full p-2 pl-8 border rounded-lg focus:outline-none"
//                     />
//                     <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   </div>
//                 )}
//             </div>
//             {renderRightPanel(activeSection, selectedOptions, searchTerm)}
//           </div>
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
//           <button className="flex justify-center items-center">
//             <img src="/cross_icon.svg" alt="cancel" className="w-3 h-3 mr-2" />
//             <div
//               className="text-gray-600 hover:text-gray-800"
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedOptions([]);
//                 onApply({
//                   filter: {},
//                   pagination: { page: 1, pageSize: 9 },
//                   sort: { field: "createdAt", order: "DESC" }
//                 });
//               }}
//             >
//               Clear Filter
//             </div>
//           </button>
//           <button
//             className="px-6 py-2 bg-bg-blue-12 text-white rounded-lg"
//             onClick={handleApply}
//           >
//             Show Result
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter1;



"use client";
import React, { useState, useEffect } from "react";
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
    searchTerm: string,
    handleOptionClick: (optionId: string) => void // Added this parameter
  ) => React.ReactNode;
  selectedOptions: string[]; // All selected options across categories
  startDate?: string;
  endDate?: string;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  pageType?: string;
  clearFilters?: () => void;
  selectedOptionsByCategory?: { [category: string]: string[] };
}

// Global variable to store the last active section
let storedActiveSection= "";

const Filter1: React.FC<FilterProps> = ({
  onClose,
  onApply,
  sections,
  renderRightPanel,
  selectedOptions,
  setSelectedOptions,
  pageType,
  clearFilters,
  selectedOptionsByCategory = {}
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use the stored active section if available, otherwise find section with selections
  const initialSection = () => {
    // First check if we have a stored section
    if (storedActiveSection && sections.some(s => s.id === storedActiveSection)) {
      return storedActiveSection;
    }

    for (const sectionId in selectedOptionsByCategory) {
      if (selectedOptionsByCategory[sectionId]?.length > 0) {
        return sectionId;
      }
    }
 
    return sections[0]?.id || "";
  };
  
  const [activeSection, setActiveSection] = useState(initialSection);
  

  useEffect(() => {
    storedActiveSection = activeSection;
  }, [activeSection]);

 
  useEffect(() => {
    sections.forEach(section => {
      const selectedOptionsForSection = selectedOptionsByCategory[section.id] || [];
      section.options.forEach(option => {
        option.checked = selectedOptionsForSection.includes(option.id);
      });
    });
  }, [sections, selectedOptionsByCategory]);

  // This function will handle clicking on an option in the right panel
  const handleOptionClick = (optionId: string) => {
    // Find the section and option
    const section = sections.find(s => s.id === activeSection);
    if (!section) return;

    const option = section.options.find(o => o.id === optionId);
    if (!option) return;

    // Toggle the checked state
    const isCurrentlySelected = selectedOptionsByCategory[activeSection]?.includes(optionId) || false;
    
    // Update selected options
    setSelectedOptions(prev => {
      if (isCurrentlySelected) {
        // Remove option if already selected
        return prev.filter(id => id !== optionId);
      } else {
        // Add option if not selected
        return [...prev, optionId];
      }
    });

    // You may need to update your selectedOptionsByCategory state here as well
    // This depends on how your parent component manages this state
  };

  const filteredSections = pageType === 'deals' 
    ? sections.filter(section => section.id !== 'stage')
    : sections;

  const handleApply = () => {
    // Store the current active section before closing
    storedActiveSection = activeSection;
    onApply({});
  };

  const getSectionTitle = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? section.title.toLowerCase() : sectionId;
  };

  // Count total selected filters across all categories
  const getTotalSelectedCount = () => {
    return Object.values(selectedOptionsByCategory).reduce(
      (sum, options) => sum + options.length, 0
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-bg-blue-12 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Filters {getTotalSelectedCount() > 0 && `(${getTotalSelectedCount()})`}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex h-[500px]">
          <div className="w-[200px] border-r border-gray-200 p-4">
            {sections.map((section) => {
              const selectedCount = selectedOptionsByCategory[section.id]?.length || 0;
              const isActive = activeSection === section.id;
              
              return (
                <div
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSearchTerm(""); // Reset search when switching sections
                  }}
                  className={`flex items-center gap-2 py-3 px-3 rounded-lg cursor-pointer ${
                    isActive ? "bg-indigo-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => {
                      setActiveSection(section.id);
                      setSearchTerm("");
                    }}
                    className="h-4 w-4 border-gray-300 text-bg-blue-12 focus:ring-bg-blue-12"
                  />
                  <span className="text-sm font-medium">
                    {section.title}
                    {selectedCount > 0 && ` (${selectedCount})`}
                  </span>
                </div>
              );
            })}
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
            {renderRightPanel(activeSection, selectedOptions, searchTerm, handleOptionClick)}
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
                storedActiveSection = sections[0]?.id || ""; // Reset stored section
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
    </div>
  );
};

export default Filter1;