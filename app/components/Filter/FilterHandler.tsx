import React, { useState } from "react";
import Filter from "./Filter";

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
}

const FilterHandler: React.FC<FilterHandlerProps> = ({
  filterSections,
  onFilterApply,
  setShowFilter,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const renderFilterRightPanel = (
    activeSection: string,
    selectedOptions: string[]
  ) => {
    const currentSection = filterSections.find(
      (section) => section.id === activeSection
    );
    if (!currentSection) return null;

    return (
      <div>
        <div className="space-y-8 max-h-[300px] overflow-y-auto">
          {currentSection.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 ml-2 mt-6">
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
          ))}
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