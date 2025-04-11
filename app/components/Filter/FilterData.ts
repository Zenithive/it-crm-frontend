export interface FilterSection {
    id: string;
    title: string;
    options: { id: string; label: string; checked: boolean }[];
  }



  
  
 export interface FilterPayload {
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


  export interface FilterHandlerProps {
    filterSections: FilterSection[];
    onFilterApply: (payload: FilterPayload) => void | Promise<void>;
    setShowFilter: (show: boolean) => void;
    pageType?: string;
    reloadLeads?: (variables?: Partial<any>) => Promise<any>;
  }



  export type FilterApplyParams = {
    selectedOptionsByCategory: { [category: string]: string[] };
    onFilterApply: (payload: FilterPayload) => Promise<void>;
    setShowFilter: (show: boolean) => void;
    startDate?: string;
    endDate?: string;
  };
  
  export interface FilterProps {
    onClose: () => void;
    onApply: (filter: any) => void;
    sections: {
      id: string;
      title: string;
      options: { id: string; label: string; checked: boolean }[]
    }[];
    renderRightPanel: (
      activeSection: string,
      selectedOptions: string[],
      searchTerm: string,
      handleOptionClick: (sectionId: string, optionId: string) => void
    ) => React.ReactNode;
    selectedOptions: string[]; // All selected options across categories
    startDate?: string;
    endDate?: string;
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
    pageType?: string;
    clearFilters?: () => void;
    selectedOptionsByCategory: { [category: string]: string[] };
  }
  