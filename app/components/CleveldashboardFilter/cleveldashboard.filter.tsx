import React from "react";

interface FilterDropdownProps {
  showFilter: boolean;
  toggleFilter: () => void;
  applyFilter: (filterType: string) => void;
  activeFilter: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  showFilter,
  toggleFilter,
  applyFilter,
  activeFilter,
}) => {
  if (!showFilter) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
      <div className="p-2">
        <div
          className={`px-4 py-2 cursor-pointer rounded-md ${
            activeFilter === "none"
              ? "bg-bg-blue-16 text-bg-blue-12 font-medium"
              : "hover:bg-gray-100"
          }`}
          onClick={() => applyFilter("none")}
        >
          No Filter
        </div>
        <div
          className={`px-4 py-2 cursor-pointer rounded-md ${
            activeFilter === "yearly"
              ? "bg-bg-blue-16 text-bg-blue-12 font-medium"
              : "hover:bg-gray-100"
          }`}
          onClick={() => applyFilter("yearly")}
        >
          Yearly
        </div>
        <div
          className={`px-4 py-2 cursor-pointer rounded-md ${
            activeFilter === "half-yearly"
              ? "bg-bg-blue-16 text-bg-blue-12 font-medium"
              : "hover:bg-gray-100"
          }`}
          onClick={() => applyFilter("half-yearly")}
        >
          Half Yearly
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;