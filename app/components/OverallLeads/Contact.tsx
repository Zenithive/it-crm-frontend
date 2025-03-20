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

type ViewType = "list" | "kanban";

interface FilterPayload {
  filter: {
    [key: string]: string | undefined; // Dynamic filter keys
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
  const [pageSize, setPageSize] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>("");

   
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [campaignFilter, setCampaignFilter] = useState<string | undefined>(undefined);
  const [stageFilter, setStageFilter] = useState<string | undefined>(undefined);
// const {  refetch } =  useOverallLeadsData(1,100,stageFilter,typeFilter,campaignFilter);

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
    setStageFilter(filter.stage);
    setTypeFilter(filter.type);
    setCampaignFilter(filter.campaign);
    setCurrentPage(1);
    
    // Remove this separate refetch call - it's causing confusion
    // The hook will automatically refetch when the state changes
  };
  
  // const handleFilter = async (payload: FilterPayload) => {
  //   const { filter } = payload;
   
  //   setStageFilter(filter.stage);
  //   setTypeFilter(filter.type);
  //   setCampaignFilter(filter.campaign);
  //   setCurrentPage(1);
  //   await refetch({
  //     pagination: { page: 1, pageSize: 100 },
  //     sort: { field: "EMAIL", order: "ASC" },
  //     filter: {
  //       leadStage: filter.stage,
  //       leadType: filter.type,
  //       campaign: filter.campaign,
       
  //     },
  //   });
  // };
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
    pageSize,
    searchQuery,
    stageFilter,
    typeFilter,
    campaignFilter
  );
  
  
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
        onViewChange={handleViewChange}
      />

      <div className="pt-[40px]">
        {loading ? (
          <div className="text-center p-6">Loading data...</div>
        ) : activeView === "list" ? (
          <>
            <MicroTable rowData={leads} columnDefs={columnDefs} />
            <Pagination2
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <KanbanView />
          </DndProvider>
        )}
      </div>

      {showAddLeadModal && <AddLeadModal onClose={() => setShowAddLeadModal(false)} />}
    </>
  );
};

export default Contact;