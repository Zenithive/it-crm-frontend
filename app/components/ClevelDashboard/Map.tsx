// import React, { useEffect, useRef, useState } from 'react';
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import useDealsApiService from '../../api/apiService/dealsApiService';
// import worldTopo from "../../../public/world-topo.json";
// import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';

// const Map = () => {
//   const { dealsByCountry, loading, error } = useDealsApiService();
//   const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
//   const [showFilter, setShowFilter] = useState(false);
//     const [activeFilter, setActiveFilter] = useState("none");
//     const filterRef = useRef<HTMLDivElement>(null);
  
//   const getCountryColor = (countryName: string) => {
//     const deals = dealsByCountry[countryName] || [];
//     console.log("deals",deals);
//     const count = deals.length;

//     if (count === 0) return "#E0E7F4"; 
//     if (count < 5) return "#FFCB7C"; 
//     if (count < 10) return "#FFA500";
//     return "#FF6347"; 
//   };


//   const totalDeals = Object.values(dealsByCountry).reduce((sum, deals) => sum + deals.length, 0);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (
//           filterRef.current &&
//           !filterRef.current.contains(event.target as Node)
//         ) {
//           setShowFilter(false);
//         }
//       };
  
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, []);
  
//     const handleFilterClick = (e: React.MouseEvent) => {
//       e.stopPropagation(); // Prevent event from bubbling
//       console.log('Filter clicked', !showFilter);
//       setShowFilter(prevState => !prevState);
//     };
  
//     const applyFilter = (filterType: string) => {
//       console.log('Applying filter:', filterType);
//       setActiveFilter(filterType);
//       setShowFilter(false);
  
//       switch(filterType) {
//         case "monthly":
      
//           break;
//           case "quarterly":
         
//             break;
//             case "yearly":
             
//               break;
//         case "half-yearly":
       
//           break;
//         default:
//           // No filter
//           break;
//       }
//     };

//   return (
//     <div>
    
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-2xl font-semibold text-bg-blue-12">
//           Territory Wise Opportunity Count
//         </h3>
//         <img 
//             src="filter.svg" 
//             alt="Filter" 
//             className="cursor-pointer" 
//             onClick={handleFilterClick} 
//           />
//           {showFilter && (
//             <div 
//               // className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg"
//               // style={{ minWidth: '150px' }}
//               className="absolute left-0 top-full mt-2 z-50"
//               // Negative left positioning to align with the left side of the icon
//               style={{ 
//                 transform: 'translateX(-80%)', 
//                 minWidth: '250px' 
//               }}
//             >
//               <FilterDropdown
//                 showFilter={showFilter}
//                 toggleFilter={() => setShowFilter(false)}
//                 applyFilter={applyFilter}
//                 activeFilter={activeFilter}
//                 pageType="CircularProgress"
//               />
//             </div>
//           )}
//       </div>

//       {/* Map Container */}
//       <div className="bg-white rounded-xl shadow-custom p-4 h-auto flex flex-col">
//         <div className="flex-grow flex justify-center items-center">
//           <ComposableMap
//             projection="geoMercator"
//             projectionConfig={{ scale: 90, center: [0, 50] }}
//             width={900}
//             height={400}
//             style={{
//               backgroundColor: "transparent",
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <Geographies geography={worldTopo}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     strokeWidth={0.5}
//                     style={{
//                       default: { 
//                         outline: "none", 
//                         fill: getCountryColor(geo.properties.name) 
//                       },
//                       hover: {
//                         fill: "#FFAB48",
//                         outline: "none",
//                         cursor: "pointer",
//                       },
//                     }}
//                     onClick={() => {
//                       const countryName = geo.properties.name;
//                       setSelectedCountry(countryName);
//                     }}
//                   />
//                 ))
//               }
//             </Geographies>
//           </ComposableMap>
//         </div>
        

//         <div className="mt-4 text-center text-sm text-gray-600">
//           Total Countries with Deals: {Object.keys(dealsByCountry).length}
//           <br />
//           Total Deals: {totalDeals}
//         </div>

     
//         {selectedCountry && dealsByCountry[selectedCountry] && (
//           <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//             <h4 className="text-lg font-semibold mb-2">{selectedCountry} Deals</h4>
//             <div className="max-h-60 overflow-y-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2 text-left">Deal Name</th>
//                     <th className="p-2 text-left">Amount</th>
//                     <th className="p-2 text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dealsByCountry[selectedCountry].map((deal) => (
//                     <tr key={deal.dealID} className="border-b">
//                       <td className="p-2">{deal.dealName}</td>
//                       <td className="p-2">{deal.dealAmount}</td>
//                       <td className="p-2">{deal.dealStatus}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Map;


import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import useDealsApiService from '../../api/apiService/dealsApiService';
import worldTopo from "../../../public/world-topo.json";
import FilterDropdown from '../CleveldashboardFilter/cleveldashboard.filter';

const Map = () => {
  // Ensure consistent hook order
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("none");
  const filterRef = useRef<HTMLDivElement>(null);

  // Move API service hook to the top of the function component
  const { dealsByCountry, loading, error } = useDealsApiService();

  // Consistent filter-related side effects
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
  }, []); // Empty dependency array to run only once
  
  // Handlers outside render method
  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilter(prevState => !prevState);
  };
  
  const applyFilter = (filterType: string) => {
    console.log('Applying filter:', filterType);
    setActiveFilter(filterType);
    setShowFilter(false);

    // You can add specific filter logic here
    switch(filterType) {
     
      case "yearly":
        // Yearly filter logic
        break;
      case "half-yearly":
        // Half-yearly filter logic
        break;
      default:
        // No filter
        break;
    }
  };

  // Compute derived values outside render
  const totalDeals = Object.values(dealsByCountry).reduce((sum, deals) => sum + deals.length, 0);

  // Early returns for loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getCountryColor = (countryName: string) => {
    const deals = dealsByCountry[countryName] || [];
    const count = deals.length;

    if (count === 0) return "#E0E7F4"; 
    if (count < 5) return "#FFCB7C"; 
    if (count < 10) return "#FFA500";
    return "#FF6347"; 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 relative"ref={filterRef}>
        <h3 className="text-2xl font-semibold text-bg-blue-12">
          Territory Wise Opportunity Count
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
            ref={filterRef}
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

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-custom p-4 h-auto flex flex-col">
        <div className="flex-grow flex justify-center items-center">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 90, center: [0, 50] }}
            width={900}
            height={400}
            style={{
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={worldTopo}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    strokeWidth={0.5}
                    style={{
                      default: { 
                        outline: "none", 
                        fill: getCountryColor(geo.properties.name) 
                      },
                      hover: {
                        fill: "#FFAB48",
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      const countryName = geo.properties.name;
                      setSelectedCountry(countryName);
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Total Countries with Deals: {Object.keys(dealsByCountry).length}
          <br />
          Total Deals: {totalDeals}
        </div>

        {selectedCountry && dealsByCountry[selectedCountry] && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">{selectedCountry} Deals</h4>
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Deal Name</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dealsByCountry[selectedCountry].map((deal) => (
                    <tr key={deal.dealID} className="border-b">
                      <td className="p-2">{deal.dealName}</td>
                      <td className="p-2">{deal.dealAmount}</td>
                      <td className="p-2">{deal.dealStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;