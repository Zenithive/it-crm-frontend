

import React, { useState } from "react";
import Filter from "./Filter";
import FilterDropdown from "../../microComponents/FiterDropdown";



interface FilterSection {
  id: string;
  title: string;
  options: { id: string; label: string; checked: boolean }[];
}

interface FilterPayload {
  filter: {
    [key: string]: string | undefined;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {
    field: string;
    order: string;
  };
}

interface FilterHandlerProps {
  filterSections: FilterSection[];
  onFilterApply: (payload: FilterPayload) => void | Promise<void>;
  setShowFilter: (show: boolean) => void;
  pageType?: "contact" | "todo";
}

const FilterHandler: React.FC<FilterHandlerProps> = ({
  filterSections,
  onFilterApply,
  setShowFilter,

  pageType

}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectdata, setSelecteData] = useState('Last 7 Days');
  


  const isContactPage = pageType === "contact";
  const renderFilterRightPanel = (activeSection: string, selectedOptions: string[], searchTerm: string) => {
    const currentSection = filterSections.find(section => section.id === activeSection);
    if (!currentSection) return null;
    const filteredOptions = currentSection.options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

    if (activeSection === "date") {
      return (
        <FilterDropdown
          selectData={selectdata}
          // showRangeDropdown={true}
          showRangeDropdown={isContactPage}
          setSelectData={setSelecteData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      );
    }

    return (
      <div>
        <div className="space-y-8 max-h-[400px] overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 ml-2 mt-6"
              >
                <input
                  type="checkbox"
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => {
                    const newSelected = selectedOptions.includes(option.id)
                      ? selectedOptions.filter((id) => id !== option.id)
                      : [...selectedOptions, option.id];
                    setSelectedOptions(newSelected);
                  }}
                  className="w-5 h-5"
                />
                <label htmlFor={option.id} className="text-base">
                  {option.label}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6 ml-2">No options found</p>
          )}
        </div>
      </div>
    );
  };

  const handleFilterApply = async (payload: FilterPayload) => {
    await onFilterApply(payload);
    setShowFilter(false);
  };

  return (
    <Filter
      onClose={() => setShowFilter(false)}
      onApply={handleFilterApply}
      sections={filterSections}
      renderRightPanel={renderFilterRightPanel}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
    />
  );
};

export default FilterHandler;