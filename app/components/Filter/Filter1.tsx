

"use client";
import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { FilterProps } from "./FilterData";


// Global variable to store the last active section
let storedActiveSection = "";

const Filter1: React.FC<FilterProps> = ({
  onClose,
  onApply,
  sections,
  renderRightPanel,
  selectedOptions,
  setSelectedOptions,
  pageType,
  clearFilters,
  selectedOptionsByCategory
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  

  
  const initialSection = () => {
 
    if (storedActiveSection && sections.some(s => s.id === storedActiveSection)) {
      return storedActiveSection;
    }
    
    
    if (storedActiveSection && selectedOptionsByCategory[storedActiveSection]?.length > 0) {
      return storedActiveSection;
    }
    for (const sectionId in selectedOptionsByCategory) {
      if (selectedOptionsByCategory[sectionId]?.length > 0) {
        return sectionId;
      }

    else {
      return sections[0]?.id || "";
    }


    }
   
    return sections[0]?.id || "";
  };
  
  const [activeSection, setActiveSection] = useState(initialSection);
  
  useEffect(() => {
    storedActiveSection = activeSection;
  }, [activeSection]);


  const handleOptionClick = (sectionId: string, optionId: string) => {
  
    const isCurrentlySelected = selectedOptionsByCategory[sectionId]?.includes(optionId) || false;
    
    if (isCurrentlySelected) {
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
    } else {
      setSelectedOptions(prev => [...prev, optionId]);
    }
  };

  const filteredSections = pageType === 'deals' 
    ? sections.filter(section => section.id !== 'stage')
    : sections;

  const handleApply = () => {
    storedActiveSection = activeSection;
    onApply({});
  };

  const getSectionTitle = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? section.title.toLowerCase() : sectionId;
  };

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
                    setSearchTerm("");
                  }}
                  className={`flex items-center gap-2 py-3 px-3 rounded-lg cursor-pointer ${
                    isActive ? "bg-indigo-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
            
                    checked={selectedCount > 0}
                    readOnly
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
            {renderRightPanel(
              activeSection, 
              selectedOptions, 
              searchTerm, 
              handleOptionClick
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
          <button className="flex justify-center items-center">
            <img src="/cross_icon.svg" alt="cancel" className="w-3 h-3 mr-2" />
            <div
              className="text-gray-600 hover:text-gray-800"
              onClick={() => {
                if (clearFilters) {
                  clearFilters();
                }
                setSearchTerm("");
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