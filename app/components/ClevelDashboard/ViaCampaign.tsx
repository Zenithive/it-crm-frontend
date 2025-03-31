


import React, { useEffect, useRef, useState } from 'react';
import leadsApiService from '../../api/apiService/leadsApiService';
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';

const ViaCampaign = () => {
   const [showFilter, setShowFilter] = useState(false);
   const [activeFilter, setActiveFilter] = useState("none");
   const filterRef = useRef<HTMLDivElement>(null);
   const [startDate, setStartDate] = useState<string | undefined>(undefined);
   const [endDate, setEndDate] = useState<string | undefined>(undefined);

   // Use leadsApiService with date filters
   const { campaignCountryCounts } = leadsApiService(1, 10, true);

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
  
  // Set active filter
  setActiveFilter(filterType);
  
  // Close filter dropdown
  setShowFilter(false);
  
  // Reset dates first
  setStartDate(undefined);
  setEndDate(undefined);
  
  // Get current date
  const now = new Date();
  let startDate: Date;

  switch(filterType) {
    case "yearly":
      // From one year ago to today
      startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 1);
      
      setStartDate(startDate.toISOString().split('T')[0]);
      setEndDate(now.toISOString().split('T')[0]);
      break;
    
    case "quarterly":
      // From three months ago to today
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 3);
      
      setStartDate(startDate.toISOString().split('T')[0]);
      setEndDate(now.toISOString().split('T')[0]);
      break;
    
    case "half-yearly":
      // From six months ago to today
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 6);
      
      setStartDate(startDate.toISOString().split('T')[0]);
      setEndDate(now.toISOString().split('T')[0]);
      break;
    
    case "monthly":
      // From one month ago to today
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
      
      setStartDate(startDate.toISOString().split('T')[0]);
      setEndDate(now.toISOString().split('T')[0]);
      break;
    
    case "none":
      // No filter, reset to undefined
      setStartDate(undefined);
      setEndDate(undefined);
      break;
    
    default:
      break;
  }
};
   return (
     <div>
       <div className="flex justify-between items-center mb-4 relative">
         <h3 className="text-2xl font-semibold text-bg-blue-12">
           Opportunities via Campaigns
         </h3>
         <div>

         <img 
           src="filter.svg" 
           alt="Filter" 
           className="cursor-pointer" 
           onClick={handleFilterClick} 
         />
         {showFilter && (

          <div  ref={filterRef}>
           <FilterDropdown
             showFilter={showFilter}
             toggleFilter={() => setShowFilter(false)}
             applyFilter={applyFilter}
             activeFilter={activeFilter}
           />

           </div>
         )}
         </div>
         
       </div>

       {/* Opportunities Container */}
       <div className="bg-white rounded-xl shadow-custom p-4">
         <div className="space-y-4 scrollbar-custom overflow-y-auto max-h-[305px] pr-5 pl-4">
           {Object.entries(campaignCountryCounts).map(([country, count], index) => (
             <div
               key={index}
               className={`flex justify-between pb-2 ${
                 index !== Object.entries(campaignCountryCounts).length - 1
                   ? "border-b border-c ontent-border"
                   : ""
               }`}
             >
               <span>{country}</span>
               <span className="text-bg-blue-12 font-semibold">{count}</span>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
};

export default ViaCampaign;