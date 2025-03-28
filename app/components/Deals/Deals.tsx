


"use client";
import { useState, useCallback } from "react";


import MicroTable from "../../microComponents/Tabel";

import Pagination2 from "../../microComponents/Pagination2";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import _ from "lodash";
import AddLeadModal from "../AddLeadModal";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";
import HeaderComp from "../OverallLeads/HeaderComp";
import { columnDefs } from "../OverallLeads/OverallLeadsData";



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
const Deals = () => {

  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>("");

   const [startDate, setStartDate] = useState<string | undefined>(undefined);
   const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [campaignFilter, setCampaignFilter] = useState<string | undefined>(undefined);
 
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

    setTypeFilter(filter.type);
    setCampaignFilter(filter.campaign);
    setStartDate(filter.startDate);
    setEndDate(filter.endDate);
    setCurrentPage(1);
    
 
  };
  
 

  const { leads, totalCount, loading, refetch } = useOverallLeadsData(
    currentPage,
    pageSize,
    searchQuery,
    "deal",
    typeFilter,
    campaignFilter,
    startDate,
    endDate

  );
  
  
  return (
    <>
      <HeaderComp         
        data={{           
          title: " Deals",                    
          searchText: "Search Deals...",         
        }}         
        searchQuery={inputValue}         
        onSearchChange={handleSearchChange}                  
        onFilter={handleFilter}         
        pageType="deals"               
      />     

      <div className="pt-[40px]">
        {loading ? (
          <div className="text-center p-6">Loading data...</div>
        ) :  (
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
        
        )}
      </div>

      {showAddLeadModal && <AddLeadModal onClose={() => setShowAddLeadModal(false)} />}
    </>
  );
};

export default Deals;
