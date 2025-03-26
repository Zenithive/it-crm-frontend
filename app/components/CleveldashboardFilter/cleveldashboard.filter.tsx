

import React from "react";

interface FilterDropdownProps {
  showFilter: boolean;
  toggleFilter: () => void;
  applyFilter: (filterType: string) => void;
  activeFilter: string;
  pageType?:string
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  showFilter,
  toggleFilter,
  applyFilter,
  activeFilter,
  pageType
}) => {
  if (!showFilter) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-2 min-w-[250px] z-100 ">
     {pageType === 'CircularProgress' && (<>
     <button 
     onClick={() => applyFilter("monthly")} 
     className={`w-full text-left px-3 py-2 border-b font-semibold hover:bg-gray-100 ${
       activeFilter === "monthly" ? "bg-blue-100 text-blue-700" : "text-black"
     }`}
   >
     Monthly
   </button>
   <button 
     onClick={() => applyFilter("quarterly")} 
     className={`w-full text-left px-3 py-2 border-b font-semibold hover:bg-gray-100 ${
       activeFilter === "quartely" ? "bg-blue-100 text-blue-700" : "text-black"
     }`}
   >Quarterly 
   </button></>)}
      <button 
        onClick={() => applyFilter("yearly")} 
        className={`w-full text-left px-3 py-2 border-b font-semibold hover:bg-gray-100 ${
          activeFilter === "yearly" ? "bg-blue-100 text-blue-700" : "text-black"
        }`}
      >
        Yearly
      </button>
      <button 
        onClick={() => applyFilter("half-yearly")} 
        className={`w-full text-left px-3 py-2 hover:bg-gray-100 font-semibold ${
          activeFilter === "half-yearly" ? "bg-blue-100 text-blue-700" : "text-black"
        }`}
      >
        Half Yearly
      </button>
    </div>
  );
};

export default FilterDropdown;