// import React, { useEffect, useRef, useState } from 'react';
// import useDealsApiService from '../../api/apiService/dealsApiService';
// import { Deal } from '../../api/apiService/dealsApiService';
// import "../Dashboard/Dashboard.css"
// import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';
// interface TopDeal {
//   name: string;
//   status: "In Progress" | "Closed" | "final";
//   amount: number;
//   type: string;
// }
// const topDeals: TopDeal[] = [
//   {
//     name: "Enterprise Solution",
//     status: "In Progress",
//     amount: 850000,
//     type: "Negotiable",
//   },
//   {
//     name: "Enterprise Solution",
//     status: "Closed",
//     amount: 850000,
//     type: "Negotiable",
//   },
//   {
//     name: "Enterprise Solution",
//     status: "final",
//     amount: 850000,
//     type: "Negotiable",
//   },
//   {
//     name: "Enterprise Solution",
//     status: "In Progress",
//     amount: 850000,
//     type: "Negotiable",
//   },
//   {
//     name: "Enterprise Solution",
//     status: "final",
//     amount: 850000,
//     type: "Negotiable",
//   },
// ];

// const TopDeals = () => {

//    const [showFilter, setShowFilter] = useState(false);
//     const [activeFilter, setActiveFilter] = useState("none");
//     const filterRef = useRef<HTMLDivElement>(null);


    
// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       filterRef.current &&
//       !filterRef.current.contains(event.target as Node)
//     ) {
//       setShowFilter(false);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);

// const handleFilterClick = (e: React.MouseEvent) => {
//   e.stopPropagation(); // Prevent event from bubbling
//   console.log('Filter clicked', !showFilter);
//   setShowFilter(prevState => !prevState);
// };

// const applyFilter = (filterType: string) => {
//   console.log('Applying filter:', filterType);
//   setActiveFilter(filterType);
//   setShowFilter(false);

//   switch(filterType) {
//     case "yearly":
//       // Example: Filter data for yearly view
//       break;
//     case "half-yearly":
//       // Example: Filter data for half-yearly view
//       break;
//     default:
//       // No filter
//       break;
//   }
// };
//   const { deals, loading, error } = useDealsApiService();



//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4 relative" ref={filterRef} >
//         <h3 className="text-2xl font-semibold text-bg-blue-12">Top Deals</h3>
//         <img 
//             src="filter.svg" 
//             alt="Filter" 
//             className="cursor-pointer" 
//             onClick={handleFilterClick} 
//           />
//           {showFilter && (
//             <div 
//               className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg"
//               style={{ minWidth: '150px' }}
//             >
//               <FilterDropdown
//                 showFilter={showFilter}
//                 toggleFilter={() => setShowFilter(false)}
//                 applyFilter={applyFilter}
//                 activeFilter={activeFilter}
//               />
//             </div>
//           )}
//       </div>
//       <div className="bg-white rounded-xl shadow-custom p-4">
//         <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
//           {deals.map((deal:Deal, index:number) => (
//             <div
//               key={index}
//               className="flex justify-between items-center p-4 border-b last:border-none"
//             >
//               <div>
//                 <p className="font-medium text-lg text-bg-blue-12">
//                   {deal.dealName}
//                 </p>
//                 {/* <p className="text-sm text-black mt-1">{deal.projectRequirements}</p> */}
//               </div>
//               <div className="flex flex-col items-end min-w-[100px]">
//               <div className="font-bold">{`$${Math.floor(Number(deal.dealAmount)).toLocaleString()}`}</div>
//                 <div
//                   className={`text-sm font-semibold text-black py-1 px-3 rounded-md mt-1 w-fit
//                   ${deal.dealStatus === "final" ? "bg-shadow-green" : "bg-bg-blue-16"}`}
//                 >
//                   {deal.dealStatus}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TopDeals;



import React, { useEffect, useRef, useState } from 'react';
import useDealsApiService from '../../api/apiService/dealsApiService';
import { Deal } from '../../api/apiService/dealsApiService';
import "../Dashboard/Dashboard.css"
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';

interface TopDeal {
  name: string;
  status: "In Progress" | "Closed" | "final";
  amount: number;
  type: string;
}

const TopDeals = () => {
   const [showFilter, setShowFilter] = useState(false);
   const [activeFilter, setActiveFilter] = useState("none");
   const filterRef = useRef<HTMLDivElement>(null);
   const [dateFilter, setDateFilter] = useState<{
     dealStartDateMin?: string;
     dealStartDateMax?: string;
   }>({});

   // Utility function to get date ranges
   const getDateRange = (period: string) => {
     const now = new Date();
     let startDate: Date;

     switch(period) {
       case 'yearly':
         startDate = new Date(now.getFullYear(), 0, 1);
         return {
           dealStartDateMin: startDate.toISOString().split('T')[0],
           dealStartDateMax: now.toISOString().split('T')[0]
         };
       case 'half-yearly':
         startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
         return {
           dealStartDateMin: startDate.toISOString().split('T')[0],
           dealStartDateMax: now.toISOString().split('T')[0]
         };
       case 'quarterly':
         startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
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
           <div 
             className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg"
             style={{ minWidth: '150px' }}
           >
             <FilterDropdown
               showFilter={showFilter}
               toggleFilter={() => setShowFilter(false)}
               applyFilter={applyFilter}
               activeFilter={activeFilter}
             />
           </div>
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