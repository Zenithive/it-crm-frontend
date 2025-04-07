


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
import Pagination from "../../microComponents/Pagination";




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

   
  const [itemsPerPage, setItemsPerPage] = useState(9);
   const [startDate, setStartDate] = useState<string | undefined>(undefined);
   const [endDate, setEndDate] = useState<string | undefined>(undefined);
  // const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  // const [campaignFilter, setCampaignFilter] = useState<string | undefined>(undefined);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [campaignFilters, setCampaignFilters] = useState<string[]>([]);
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

    // setTypeFilter(filter.type);
    // setCampaignFilter(filter.campaign);
    // setStartDate(filter.startDate);
    // setEndDate(filter.endDate);
    // setCurrentPage(1);
    
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
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const { leads, totalCount, loading, refetch } = useOverallLeadsData(
    currentPage,
    itemsPerPage,
    searchQuery,
    "deal",
    // typeFilter,
    // campaignFilter,
    typeFilters.length>0 ?typeFilters.join(','):undefined,
    campaignFilters.length>0 ?campaignFilters.join(','):undefined,
    startDate,
    endDate

  );
  const getActiveFiltersDisplay = () => {
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
    
    

    if (campaignFilters.length > 0) {
      filters.push(`campaigns: ${campaignFilters.join(', ')}`);
    }
   
    
    return filters.length > 0 ? (
      <div className="flex items-center gap-2 mt-2 mb-4">
        <span className="text-sm text-gray-500">Active filters:</span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
              {filter}
            </span>
          ))}
        </div>
        <button 
          className="text-sm text-red-500 hover:text-red-700 ml-2"
          onClick={() => {
            setTypeFilters([]);
            setCampaignFilters([]);
         
            setStartDate("");
            setEndDate("");
            refetch();
          }}
        >
          Clear all
        </button>
      </div>
    ) : null;
  };
  
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
      {getActiveFiltersDisplay()}
        {loading ? (
          <div className="text-center p-6">Loading data...</div>
        ) :  (
          <>
            <MicroTable rowData={leads} columnDefs={columnDefs} />
            {/* <Pagination2
              current={currentPage}
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
        
        )}
      </div>

      {showAddLeadModal && <AddLeadModal onClose={() => setShowAddLeadModal(false)} />}
    </>
  );
};

export default Deals;
