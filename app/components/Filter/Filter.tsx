

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
  renderRightPanel: (activeSection: string, selectedOptions: string[]) => React.ReactNode;
  selectedOptions: string[];
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
    <div className="bg-white rounded-2xl w-full max-w-[600px] overflow-hidden">
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
            {activeSection !== "type" && activeSection !== "priority" && activeSection !== "status" &&  activeSection !== "stage" && activeSection !== "date" &&( 
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${getSectionTitle(activeSection)}...`}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>)}
          </div>
          {renderRightPanel(activeSection, selectedOptions)}
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
