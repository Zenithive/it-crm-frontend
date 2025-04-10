"use client";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HeaderComp from "./HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView";
import Pagination2 from "../../microComponents/Pagination2";
import { columnDefs } from "./OverallLeadsData";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import _ from "lodash";
import AddLeadModal from "../AddLeadModal";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";
import Pagination from "../../microComponents/Pagination";
import TodoListSkeleton from "../Skeleton/ToDoListSkeleton";

type ViewType = "list" | "kanban";

interface FilterPayload {
  filter: {
    [key: string]: string | string[] | undefined;
    // [key: string]: string | undefined; // Dynamic filter keys
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
const Contact = () => {
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
   
    const [itemsPerPage, setItemsPerPage] = useState(9);

  const [inputValue, setInputValue] = useState<string>("");

   const [startDate, setStartDate] = useState<string | undefined>(undefined);
   const [endDate, setEndDate] = useState<string | undefined>(undefined);
  // const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  // const [campaignFilter, setCampaignFilter] = useState<string | undefined>(undefined);
  // const [stageFilter, setStageFilter] = useState<string | undefined>(undefined);
// const {  refetch } =  useOverallLeadsData(1,100,stageFilter,typeFilter,campaignFilter);
const [typeFilters, setTypeFilters] = useState<string[]>([]);
const [campaignFilters, setCampaignFilters] = useState<string[]>([]);
const [stageFilters, setStageFilters] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth);

  // Debounced search handling
  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      if(query.length >=3 ){
        setCurrentPage(1); 
        setSearchQuery(query);
      }
    }, 500),
    []
  );

  const handleSearchChange = (query: string) => {
    setInputValue(query);

  if (query.length >= 3 || query.length === 0) {
    debouncedSearch(query);
  } else if (searchQuery) {
    setSearchQuery("");
    setCurrentPage(1);
  }
};

  const handleAddLead = () => {
    setShowAddLeadModal(true);
  };
  const handleFilter = async (payload: FilterPayload) => {
    const { filter } = payload;
    
    // Just update the state - the hook will handle the refetch
    // setStageFilter(filter.stage);
    // setTypeFilter(filter.type);
    // setCampaignFilter(filter.campaign);
    // setCurrentPage(1);

    if (filter.stage) {
      const stageStr = filter.stage as string;
      setStageFilters(stageStr.split(','));
    } else {
      setStageFilters([]);
    }
    
    // Handle technology filter
    if (filter.type) {
      const typeStr = filter.type as string;
      setTypeFilters(typeStr.split(','));
    } else {
      setTypeFilters([]);
    }
    if (filter.campaign) {
      const campaignStr = filter.campaign as string;
      setCampaignFilters(campaignStr.split(','));
    } else {
      setCampaignFilters([]);
    }
    setStartDate(Array.isArray(filter.startDate) ? undefined : filter.startDate);
    setEndDate(Array.isArray(filter.endDate) ? undefined : filter.endDate);
    setCurrentPage(1);
    await refetch();
    
    // Remove this separate refetch call - it's causing confusion
    // The hook will automatically refetch when the state changes
  };
  
 
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  // const { leads, totalCount, loading,refetch } = useOverallLeadsData(
  //   currentPage,
  //   pageSize,
  //   searchQuery,
  //   stageFilter,typeFilter,campaignFilter
  // );

  const { leads, totalCount, loading, refetch } = useOverallLeadsData(
    currentPage,
    itemsPerPage,
    searchQuery,
    stageFilters.length>0 ?stageFilters.join(','):undefined,
    typeFilters.length>0 ?typeFilters.join(','):undefined,
    campaignFilters.length>0 ?campaignFilters.join(','):undefined,
    startDate,
    endDate

  );
  
  // const getActiveFiltersDisplay = () => {
  //   const filters = [];
    
  //   if (typeFilters.length > 0) {
  //     filters.push(`Types: ${typeFilters.join(', ')}`);
  //   }

  //   if (startDate && endDate) {
  //     filters.push(`Date range: ${startDate} to ${endDate}`);
  //   } else if (startDate) {
  //     filters.push(`From date: ${startDate}`);
  //   } else if (endDate) {
  //     filters.push(`To date: ${endDate}`);
  //   }
    
  //   if (stageFilters.length > 0) {
  //     filters.push(`stages: ${stageFilters.join(', ')}`);
  //   }

  //   if (campaignFilters.length > 0) {
  //     filters.push(`campaigns: ${campaignFilters.join(', ')}`);
  //   }
   
    
  //   return filters.length > 0 ? (
  //     <div className="flex items-center gap-2 mt-2 mb-4">
  //       <span className="text-sm text-gray-500">Active filters:</span>
  //       <div className="flex flex-wrap gap-2">
  //         {filters.map((filter, index) => (
  //           <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
  //             {filter}
  //           </span>
  //         ))}
  //       </div>
  //       <button 
  //         className="text-sm text-red-500 hover:text-red-700 ml-2"
  //         onClick={() => {
  //           setTypeFilters([]);
  //           setCampaignFilters([]);
  //           setStageFilters([]);
  //           setStartDate("");
  //           setEndDate("");
  //           refetch();
  //         }}
  //       >
  //         Clear all
  //       </button>
  //     </div>
  //   ) : null;
  // };

  const getActiveFiltersCount = () => {
    const filters = [];
    
    if (typeFilters.length > 0) {
      filters.push(`Types: ${typeFilters.join(', ')}`);
    }

    if (startDate && endDate) {
      filters.push(`Date range: ${startDate} to ${endDate}`);
    } else if (startDate) {
      filters.push(`From date: ${startDate}`);
    } else if (endDate) {
      filters.push(`To date: ${endDate}`);
    }
    
    if (stageFilters.length > 0) {
      filters.push(`stages: ${stageFilters.join(', ')}`);
    }

    if (campaignFilters.length > 0) {
      filters.push(`campaigns: ${campaignFilters.join(', ')}`);
    }

    // Return the number of active filters (just the count)
    return filters.length;
};






  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <HeaderComp
        data={{
          title: "Lead",
          Listlogo: "viewList.svg",
          Kanbanlogo: "kanban.svg",
          searchText: "Search Leads...",
        }}
        searchQuery={inputValue}
        onSearchChange={handleSearchChange}
        onAddLead={handleAddLead}
        onFilter={handleFilter}
        count={getActiveFiltersCount()}
        onViewChange={handleViewChange}
        pageType="contact"
      />

      <div className="pt-[40px]">

      {/* {getActiveFiltersDisplay()} */}
        {loading ? (
          // <div className="text-center p-6">Loading data...</div>
          <TodoListSkeleton />
        ) : activeView === "list" ? (
          <>
            <MicroTable rowData={leads} columnDefs={columnDefs} />
            {/* <Pagination2
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            /> */}

<Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />


          </>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <KanbanView />
          </DndProvider>
        )}
      </div>

      {showAddLeadModal && <AddLeadModal onClose={() => setShowAddLeadModal(false)}/>}
    </>
  );
};

export default Contact;
