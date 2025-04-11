

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterDropdown from "../../microComponents/FiterDropdown";
import Filter1 from "./Filter1";
import { FilterHandlerProps, FilterPayload } from "./FilterData";
import { 
  handleFilterApplyContact,
  handleFilterApplyCaseStudy, 
  handleFilterApplyResource,
  handleFilterApplyVendor,
  handleFilterApplyTodo, 
  handleFilterApplydeal
} from "./FilterHandlerUtils";

import { selectFiltersByPageType, setDateRange, setSelectedOptions, clearReduxFilters } from "../../redux/slice/filterSlice";
import { RootState } from "../../redux/store/store";

const FilterHandler1: React.FC<FilterHandlerProps> = ({
  filterSections,
  onFilterApply,
  setShowFilter,
  pageType,
  reloadLeads,
}) => {
  const dispatch = useDispatch();
  
  // Fix the selector by explicitly typing the state
  const { selectedOptionsByCategory: reduxSelectedOptions, startDate: reduxStartDate, endDate: reduxEndDate } = 
    useSelector((state: RootState) => selectFiltersByPageType(state, pageType || ''));
  
  const [selectdata, setSelecteData] = useState("");
  const [selectedOptionsByCategory, setSelectedOptionsByCategory] = useState<{
    [category: string]: string[];
  }>(reduxSelectedOptions);
  
  const [allSelectedOptions, setAllSelectedOptions] = useState<string[]>(
    Object.values(reduxSelectedOptions).flat()
  );
  
  const [startDate, setStartDate] = useState<string>(reduxStartDate);
  const [endDate, setEndDate] = useState<string>(reduxEndDate);
  
  // Sync local state with Redux ONLY on mount or when pageType changes
  // To break the infinite loop, we're going to sync with Redux only when pageType changes
  useEffect(() => {
    if (pageType) {
      setSelectedOptionsByCategory(reduxSelectedOptions);
      setAllSelectedOptions(Object.values(reduxSelectedOptions).flat());
      setStartDate(reduxStartDate);
      setEndDate(reduxEndDate);
    }
  }, [pageType]); // Only depend on pageType, not on reduxSelectedOptions or dates
  
  // Sync Redux when local state changes - but use a flag to prevent re-triggering
  const [isSyncingToRedux, setIsSyncingToRedux] = useState(false);

  useEffect(() => {
    if (pageType && !isSyncingToRedux) {
      setIsSyncingToRedux(true);
      dispatch(setSelectedOptions({
        pageType,
        categoryOptions: selectedOptionsByCategory
      }));
      setIsSyncingToRedux(false);
    }
  }, [selectedOptionsByCategory, dispatch, pageType]);
  
  useEffect(() => {
    if (pageType && !isSyncingToRedux) {
      setIsSyncingToRedux(true);
      dispatch(setDateRange({
        pageType,
        startDate: startDate || '',
        endDate: endDate || ''
      }));
      setIsSyncingToRedux(false);
    }
  }, [startDate, endDate, dispatch, pageType]);
  
  // Add a useEffect to handle page changes/initialization
  useEffect(() => {
    if (!pageType || !filterSections) return;
    
    // Reset state if coming to this page and there are no valid filters for this page type
    const validSectionsForCurrentPage = filterSections.map(section => section.id);
    const hasInvalidFilters = Object.keys(selectedOptionsByCategory).some(
      category => !validSectionsForCurrentPage.includes(category)
    );
    
    if (hasInvalidFilters) {
      // Clear filters that don't belong to the current page
      const validFilters = Object.entries(selectedOptionsByCategory)
        .filter(([category]) => validSectionsForCurrentPage.includes(category))
        .reduce((acc, [category, options]) => {
          acc[category] = options;
          return acc;
        }, {} as {[category: string]: string[]});
        
      setSelectedOptionsByCategory(validFilters);
      setAllSelectedOptions(Object.values(validFilters).flat());
    }
  }, [pageType, filterSections, selectedOptionsByCategory]);

  // Add this useEffect to handle date-range filter selection when dates are set
  useEffect(() => {
    if (startDate || endDate) {
      const dateFilterId = "date-range";

      const isAlreadySelected =
        selectedOptionsByCategory["date"]?.includes(dateFilterId);

      if (!isAlreadySelected) {
        setSelectedOptionsByCategory((prev) => ({
          ...prev,
          date: [...(prev["date"] || []), dateFilterId],
        }));
        setAllSelectedOptions((prev) => [...prev, dateFilterId]);
      }
    } else {
      setSelectedOptionsByCategory((prev) => {
        const result = { ...prev };
        if (result["date"]) {
          result["date"] = result["date"].filter((id) => id !== "date-range");

          if (result["date"].length === 0) {
            delete result["date"];
          }
        }
        return result;
      });

      setAllSelectedOptions((prev) => prev.filter((id) => id !== "date-range"));
    }
  }, [startDate, endDate]);
  
  // Update clearFilters to use Redux
  const clearFilters = () => {
    if (!pageType) return;
    
    // Clear local state
    setSelectedOptionsByCategory({});
    setAllSelectedOptions([]);
    setStartDate("");
    setEndDate("");
    setSelecteData("");
    
    // Clear Redux state
    dispatch(clearReduxFilters({ pageType }));
    
    const emptyPayload = {
      filter: {},
      pagination: {
        page: 1,
        pageSize: 10,
      },
      sort: {
        field: "createdAt",
        order: "DESC",
      },
    };
  
    setShowFilter(false);
  
    setTimeout(() => {
      onFilterApply(emptyPayload);
    }, 0);
  };
  
  const isContactPage = pageType === "contact" || pageType === "deals";

  const handleSetSelectedOptions: React.Dispatch<
    React.SetStateAction<string[]>
  > = (action) => {
    if (typeof action === "function") {
      const newOptions = action(allSelectedOptions);
      setAllSelectedOptions(newOptions);

      const newSelectedByCategory = { ...selectedOptionsByCategory };

      const removedOptions = allSelectedOptions.filter(
        (opt) => !newOptions.includes(opt)
      );
      if (removedOptions.length > 0) {
        for (const categoryId in newSelectedByCategory) {
          newSelectedByCategory[categoryId] = newSelectedByCategory[
            categoryId
          ].filter((opt) => !removedOptions.includes(opt));
        }
      }

      const addedOptions = newOptions.filter(
        (opt) => !allSelectedOptions.includes(opt)
      );
      if (addedOptions.length > 0) {
        addedOptions.forEach((optionId) => {
          for (const section of filterSections) {
            if (section.options.some((opt) => opt.id === optionId)) {
              if (!newSelectedByCategory[section.id]) {
                newSelectedByCategory[section.id] = [];
              }
              if (!newSelectedByCategory[section.id].includes(optionId)) {
                newSelectedByCategory[section.id] = [
                  ...newSelectedByCategory[section.id],
                  optionId,
                ];
              }
              break;
            }
          }
        });
      }
      setSelectedOptionsByCategory(newSelectedByCategory);
    } else {
      setAllSelectedOptions(action);

      const newSelectedByCategory: { [key: string]: string[] } = {};
      action.forEach((optionId) => {
        for (const section of filterSections) {
          if (section.options.some((opt) => opt.id === optionId)) {
            if (!newSelectedByCategory[section.id]) {
              newSelectedByCategory[section.id] = [];
            }
            if (!newSelectedByCategory[section.id].includes(optionId)) {
              newSelectedByCategory[section.id] = [
                ...newSelectedByCategory[section.id],
                optionId,
              ];
            }
            break;
          }
        }
      });

      setSelectedOptionsByCategory(newSelectedByCategory);
    }
  };
  const toggleOption = (categoryId: string, optionId: string) => {
    setSelectedOptionsByCategory((prev) => {
      const currentCategorySelections = prev[categoryId] || [];

      let updatedSelections;
      if (currentCategorySelections.includes(optionId)) {
        updatedSelections = currentCategorySelections.filter(
          (id) => id !== optionId
        );

        setAllSelectedOptions((prevAll) =>
          prevAll.filter((id) => id !== optionId)
        );
      } else {
        updatedSelections = [...currentCategorySelections, optionId];

        setAllSelectedOptions((prevAll) => [...prevAll, optionId]);
      }

      const result = { ...prev };
      if (updatedSelections.length === 0) {
        delete result[categoryId];
      } else {
        result[categoryId] = updatedSelections;
      }

      return result;
    });
  };
  const renderFilterRightPanel = (
    activeSection: string,
    _: string[],
    searchTerm: string,
    handleOptionClick: (sectionId: string, optionId: string) => void
  ) => {
    const currentSection = filterSections.find(
      (section) => section.id === activeSection
    );
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
                  checked={
                    selectedOptionsByCategory[activeSection]?.includes(
                      option.id
                    ) || false
                  }
                  onChange={() => {
                    toggleOption(activeSection, option.id);
                    // Also call the handleOptionClick from Filter1 to sync both components
                    handleOptionClick(activeSection, option.id);
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
  
  const safeOnFilterApply = async (payload: FilterPayload): Promise<void> => {
    try {
      await onFilterApply(payload);
      return Promise.resolve();
    } catch (error) {
      console.error("Filter apply error:", error);
      return Promise.reject(error);
    }
  };
  
  const handleApplyFilters = async () => {
    if (!pageType) return;
    
    switch (pageType) {
      case "contact":
        await handleFilterApplyContact({
          selectedOptionsByCategory,
          startDate,
          endDate,
          onFilterApply: safeOnFilterApply,
          setShowFilter
        });
        break;

      case "deals":
        await handleFilterApplydeal({
          selectedOptionsByCategory,
          startDate,
          endDate,
          onFilterApply: safeOnFilterApply,
          setShowFilter
        });
        break;
      case "casestudy":
        await handleFilterApplyCaseStudy({
          selectedOptionsByCategory,
          onFilterApply: safeOnFilterApply,
          setShowFilter
        });
        break;
      case "resource":
        await handleFilterApplyResource({
          selectedOptionsByCategory,
          onFilterApply: safeOnFilterApply,
          setShowFilter
        });
        break;
      case "vendor":
        await handleFilterApplyVendor({
          selectedOptionsByCategory,
          onFilterApply: safeOnFilterApply,
          setShowFilter
        });
        break;
      default:
        await handleFilterApplyTodo({
          selectedOptionsByCategory,
          startDate,
          endDate,
          onFilterApply: safeOnFilterApply,
          setShowFilter
        });
        break;
    }
  };
  const preparedSections = filterSections.map((section) => ({
    ...section,
    options: section.options.map((option) => ({
      ...option,
      checked:
        selectedOptionsByCategory[section.id]?.includes(option.id) || false,
    })),
  }));

  return (
    <Filter1
      onClose={() => {
        setShowFilter(false);
      }}
      onApply={handleApplyFilters}
      sections={preparedSections}
      renderRightPanel={renderFilterRightPanel}
      selectedOptions={allSelectedOptions}
      setSelectedOptions={handleSetSelectedOptions}
      clearFilters={clearFilters}
      selectedOptionsByCategory={selectedOptionsByCategory}
    />
  );
};

export default FilterHandler1;