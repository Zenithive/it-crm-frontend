import React from "react";

interface FilterDropdownProps {
  showFilter: boolean;
  toggleFilter: () => void;
  applyFilter: (filterType: string) => void;
  activeFilter: string;
  pageType?: string;
  resetToGlobal?: () => void;
  isUsingLocalFilter?: boolean;
  globalFilter?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  showFilter,
  toggleFilter,
  applyFilter,
  activeFilter,
  pageType,
  resetToGlobal,
  isUsingLocalFilter,
  globalFilter
}) => {
  if (!showFilter) return null;

  return (
    <div className="absolute top-10 right-0 z-10 bg-white shadow-lg rounded-md overflow-hidden w-48">
      <div className="flex flex-col">
        {pageType === 'CircularProgress' && (
          <>
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
                activeFilter === "quarterly" ? "bg-blue-100 text-blue-700" : "text-black"
              }`}
            >
              Quarterly
            </button>
          </>
        )}
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
          className={`w-full text-left px-3 py-2 border-b font-semibold hover:bg-gray-100 ${
            activeFilter === "half-yearly" ? "bg-blue-100 text-blue-700" : "text-black"
          }`}
        >
          Half Yearly
        </button>
        <button
          onClick={() => applyFilter("weekly")}
          className={`w-full text-left px-3 py-2 border-b font-semibold hover:bg-gray-100 ${
            activeFilter === "weekly" ? "bg-blue-100 text-blue-700" : "text-black"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => applyFilter("today")}
          className={`w-full text-left px-3 py-2 border-b font-semibold hover:bg-gray-100 ${
            activeFilter === "today" ? "bg-blue-100 text-blue-700" : "text-black"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => applyFilter("none")}
          className={`w-full text-left px-3 py-2 hover:bg-gray-100 font-semibold ${
            activeFilter === "none" ? "bg-blue-100 text-blue-700" : "text-black"
          }`}
        >
          None
        </button>
        {isUsingLocalFilter && resetToGlobal && (
          <button
            onClick={resetToGlobal}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 font-semibold text-blue-600"
          >
            Reset to Global ({globalFilter})
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;