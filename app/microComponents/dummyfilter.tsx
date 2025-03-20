import React, { useState } from "react";
import Search from "./Search";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FilterProps {
  closeFilter: () => void;
  sections: FilterSection[];
  renderRightPanel: (activeSection: string) => React.ReactNode;
}

const Filter: React.FC<FilterProps> = ({ closeFilter, sections, renderRightPanel }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-full md:w-[900px]">
          <div className="bg-bg-blue-12 rounded-t-xl flex justify-between items-center p-3">
            <h2 className="text-xl ml-3 font-semibold text-white">Filters</h2>
            <button className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg" onClick={closeFilter}>
              <img src="/cross_icon.svg" alt="Close" className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white rounded-b-xl shadow-lg w-full p-5 min-h-[500px] flex flex-col">
            <div className="flex-grow flex">
              <div className="w-1/3 border-r border-bg-blue-12 p-3 space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between py-3 ${index !== sections.length - 1 ? "border-b border-gray-200" : ""}`}
                  >
                    <span className="text-base flex-1">{section.title}</span>
                    <input
                      type="radio"
                      name="filter-section"
                      checked={activeSection === section.id}
                      onChange={() => setActiveSection(section.id)}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
              </div>

              <div className="w-2/3 p-3">{renderRightPanel(activeSection)}</div>
            </div>

            <div className="p-3 border-t border-bg-blue-12 flex justify-between items-center">
              <button className="flex items-center justify-center">
              <div className=" text-lg text-black font-medium">Clear Filter</div>
                 <img src="/cross_icon.svg" alt="cancle" className="w-3 h-3 ml-2 mt-1"></img> 
              </button>
              <button className="text-lg text-bg-blue-12 font-medium">Show Result</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
