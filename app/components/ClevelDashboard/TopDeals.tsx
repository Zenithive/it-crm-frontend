

import React, { useEffect, useRef, useState } from 'react';
import useDealsApiService from '../../api/apiService/dealsApiService';
import { Deal } from '../../api/apiService/dealsApiService';
import "../Dashboard/Dashboard.css"
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';


const TopDeals = () => {
   const [showFilter, setShowFilter] = useState(false);
   const [activeFilter, setActiveFilter] = useState("none");
   const filterRef = useRef<HTMLDivElement>(null);
   const [dateFilter, setDateFilter] = useState<{
     dealStartDateMin?: string;
     dealStartDateMax?: string;
   }>({});

   const getDateRange = (period: string) => {
    if (period === 'none') return {};
    const now = new Date();
    let startDate: Date;
  
    switch(period) {
      case 'yearly':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return {
          dealStartDateMin: startDate.toISOString().split('T')[0],
          dealStartDateMax: now.toISOString().split('T')[0]
        };
      case 'half-yearly':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        return {
          dealStartDateMin: startDate.toISOString().split('T')[0],
          dealStartDateMax: now.toISOString().split('T')[0]
        };
      case 'quarterly':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        return {
          dealStartDateMin: startDate.toISOString().split('T')[0],
          dealStartDateMax: now.toISOString().split('T')[0]
        };
      default:
        return {};
    }
  };

   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (
         filterRef.current &&
         !filterRef.current.contains(event.target as Node)
       ) {
         setShowFilter(false);
       }
     };

     document.addEventListener('mousedown', handleClickOutside);
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, []);

   const handleFilterClick = (e: React.MouseEvent) => {
     e.stopPropagation();
     setShowFilter(prevState => !prevState);
   };

   const applyFilter = (filterType: string) => {
     console.log('Applying filter:', filterType);
     setActiveFilter(filterType);
     setShowFilter(false);

     // Get date range based on filter type
     const newDateFilter = getDateRange(filterType);
     setDateFilter(newDateFilter);
   };

   // Pass date filter to the API service
   const { deals, loading, error } = useDealsApiService(dateFilter);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
     <div>
       <div className="flex justify-between items-center mb-4 relative" ref={filterRef}>
         <h3 className="text-2xl font-semibold text-bg-blue-12">
           Top Deals 
           {activeFilter !== 'none' && ` (${activeFilter})`}
         </h3>
         <img 
           src="filter.svg" 
           alt="Filter" 
           className="cursor-pointer" 
           onClick={handleFilterClick} 
         />
         {showFilter && (
          
               
             <FilterDropdown
               showFilter={showFilter}
               toggleFilter={() => setShowFilter(false)}
               applyFilter={applyFilter}
               activeFilter={activeFilter}
             />
        
         )}
       </div>
       <div className="bg-white rounded-xl shadow-custom p-4">
         <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
           {deals.length === 0 ? (
             <p className="text-center text-gray-500">No deals found for the selected period</p>
           ) : (
             deals.map((deal:Deal, index:number) => (
               <div
                 key={index}
                 className="flex justify-between items-center p-4 border-b last:border-none"
               >
                 <div>
                   <p className="font-medium text-lg text-bg-blue-12">
                     {deal.dealName}
                   </p>
                 </div>
                 <div className="flex flex-col items-end min-w-[100px]">
                   <div className="font-bold">
                     {`$${Math.floor(Number(deal.dealAmount)).toLocaleString()}`}
                   </div>
                   <div
                     className={`text-sm font-semibold text-black py-1 px-3 rounded-md mt-1 w-fit
                     ${deal.dealStatus === "final" ? "bg-shadow-green" : "bg-bg-blue-16"}`}
                   >
                     {deal.dealStatus}
                   </div>
                 </div>
               </div>
             ))
           )}
         </div>
       </div>
     </div>
   );
};

export default TopDeals;