import React, { useState } from "react";
import FilterDropdown from "../../microComponents/FiterDropdown";
import Filter1 from "./Filter1";

interface FilterSection {
  id: string;
  title: string;
  options: { id: string; label: string; checked: boolean }[];
}

interface FilterPayload {
  filter: {
    [key: string]: string | string[] | undefined;
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
  pageType?: string;
}

const FilterHandler1: React.FC<FilterHandlerProps> = ({
  filterSections,
  onFilterApply,
  setShowFilter,
  pageType
}) => {
  // Change to store selected options by category
  const [selectedOptionsByCategory, setSelectedOptionsByCategory] = useState<{
    [category: string]: string[];
  }>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectdata, setSelecteData] = useState('');

  const isContactPage = pageType === "contact";

  const isOptionSelected = (categoryId: string, optionId: string) => {
    return selectedOptionsByCategory[categoryId]?.includes(optionId) || false;
  };

  const toggleOption = (categoryId: string, optionId: string) => {
    setSelectedOptionsByCategory(prev => {
      const currentCategorySelections = prev[categoryId] || [];
      
      // If option is already selected, remove it; otherwise add it
      const updatedSelections = currentCategorySelections.includes(optionId)
        ? currentCategorySelections.filter(id => id !== optionId)
        : [...currentCategorySelections, optionId];
      
      return {
        ...prev,
        [categoryId]: updatedSelections
      };
    });
  };

  const renderFilterRightPanel = (activeSection: string, _: any, searchTerm: string) => {
    const currentSection = filterSections.find(section => section.id === activeSection);
    if (!currentSection) return null;
    
    const filteredOptions = currentSection.options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeSection === "date") {
      return (
        <FilterDropdown
          selectData={selectdata}
          showRangeDropdown={isContactPage}
          setSelectData={setSelecteData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          pageType={isContactPage ? "leads" : "todo"}
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
                  
                  checked={isOptionSelected(activeSection, option.id)}
                  onChange={() => toggleOption(activeSection, option.id)}
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

  const handleFilterApplyCaseStudy = async () => {
    const industrySelections = selectedOptionsByCategory['industry'] || [];
    const technologySelections = selectedOptionsByCategory['technology'] || [];
    
    // Create filter object
    const filterObj: any = {};
    
    // Only add filters if options are selected
    if (industrySelections.length > 0) {
      filterObj.industryTarget = industrySelections.join(',');
    }
    
    if (technologySelections.length > 0) {
      filterObj.techStack = technologySelections.join(',');
    }

    const payload: FilterPayload = {
      filter: filterObj,
      pagination: {
        page: 1,
        pageSize: 10
      },
      sort: {
        field: 'createdAt',
        order: 'DESC'
      }
    };

    await onFilterApply(payload);
    setShowFilter(false);
  };

  // Keeping other handlers but will only implement case study handler for now
  const handleFilterApply = async () => {
    // Your existing code for contacts

const dateSelections=selectedOptionsByCategory['date']||[];
    const typeSelections = selectedOptionsByCategory['type'] || [];
    const stageSelections = selectedOptionsByCategory['stage'] || [];
    const campaignSelections = selectedOptionsByCategory['campaign'] || [];
    
    // Create filter object
    const filterObj: any = {};
    if (startDate) {
      filterObj.startDate = startDate;
    }
    if (endDate) {
      filterObj.endDate = endDate;
    }
    // Only add filters if options are selected
    if (typeSelections.length > 0) {
      filterObj.type = typeSelections.join(',');
    }
    
    if (dateSelections.length > 0) {
      filterObj.date = dateSelections.join(',');
    }
    
    if (stageSelections.length > 0) {
      filterObj.stage= stageSelections.join(',');
    }
    if (campaignSelections.length > 0) {
      filterObj.campaign= campaignSelections.join(',');
    }
    const payload: FilterPayload = {
      filter:filterObj,
      pagination: {
        page: 1,
        pageSize: 10
      },
      sort: {
        field: 'createdAt',
        order: 'DESC'
      }
    };

    await onFilterApply(payload);
    setShowFilter(false);
  };

  const handleFilterApplyResource = async () => {
    // Your existing code for resources

    
    const filterObj: any = {};
    const skillsSelections = selectedOptionsByCategory['skills'] || [];
    const experienceYearSelections = selectedOptionsByCategory['experienceYear'] || [];
    
    
    // Only add filters if options are selected
    if (skillsSelections.length > 0) {
      filterObj.skills = skillsSelections.join(',');
    }
    
    if (experienceYearSelections.length > 0) {
      filterObj.experienceYear = experienceYearSelections.join(',');
    }


    await onFilterApply({
      filter:filterObj,
      pagination: { page: 1, pageSize: 10 },
      sort: { field: 'createdAt', order: 'DESC' }
    });
    setShowFilter(false);
  };

  
  const handleFilterApplyVendor = () => {
    // Get the selected options by category
    const statusSelections = selectedOptionsByCategory['status'] || [];
    const locationSelections = selectedOptionsByCategory['location'] || [];
    const ratingSelections = selectedOptionsByCategory['rating'] || [];
    
    // Create filter object - only include populated filters
    const filterObj: { status?: string; country?: string;  reviewFromPerformanceRating?:string } = {};
    
    if (statusSelections.length > 0) {
      // Make sure to transform values to match API expectations
      // For example, if backend expects "ACTIVE" instead of "active"
      const formattedStatuses = statusSelections.map(status => 
        status.toUpperCase()
      );
      filterObj.status = formattedStatuses.join(',');
    }
    
    if (locationSelections.length > 0) {
      // Make sure these match country values in your backend exactly
      filterObj.country = locationSelections.join(',');
    }
    if (ratingSelections.length > 0) {
      // Make sure these match country values in your backend exactly
      filterObj. reviewFromPerformanceRating = ratingSelections.join(',');
    }
    // Apply filters once, with a single call
    onFilterApply({
      filter: filterObj,
      pagination: { page: 1, pageSize: 10 },
      sort: { field: 'createdAt', order: 'DESC' }
    });
    
    // Close filter modal
    setShowFilter(false);
  };
  const handleFilterApplyTodo = async () => {
    // Your existing code for todos
    const filterObj: any = {};
    const statusSelections = selectedOptionsByCategory['status'] || [];
    const prioritySelections = selectedOptionsByCategory['priority'] || [];
    const dateSelections=selectedOptionsByCategory['date']||[];
    if (startDate) {
      filterObj.startDate = startDate;
    }
    if (endDate) {
      filterObj.endDate = endDate;
    }

    if (statusSelections.length > 0) {
      filterObj.status = statusSelections.join(',');
    }
    
    if (prioritySelections.length > 0) {
      filterObj.priority = prioritySelections.join(',');
    }

    if (dateSelections.length > 0 && !startDate && !endDate) {
      filterObj.date = dateSelections.join(',');
    }
    await onFilterApply({
      filter: filterObj,
      pagination: { page: 1, pageSize: 10 },
      sort: { field: 'createdAt', order: 'DESC' }
    });
    setShowFilter(false);
  };

  const clearFilters = () => {
    setSelectedOptionsByCategory({});
    setStartDate('');
    setEndDate('');
  };

  return (
    <Filter1
      onClose={() => setShowFilter(false)}
      onApply={
        pageType === 'contact' 
          ? handleFilterApply 
          : pageType === 'casestudy'
          ? handleFilterApplyCaseStudy
          : pageType === 'resource'
          ? handleFilterApplyResource
          : pageType === 'vendor'
          ? handleFilterApplyVendor
          : handleFilterApplyTodo
      }
      sections={filterSections}
      renderRightPanel={renderFilterRightPanel}
      selectedOptions={[]} // No longer used, kept for compatibility
      setSelectedOptions={() => {}} // No longer used, kept for compatibility
      clearFilters={clearFilters} // New prop for clearing filters
      selectedOptionsByCategory={selectedOptionsByCategory} // New prop
    />
  );
};

export default FilterHandler1;