import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import useDealsApiService from '../../api/apiService/dealsApiService';
import worldTopo from "../../../public/world-topo.json";
import FilterDropdown from '../ManagerExecuteiveDashboard/ManagerExecuteiveDashboardFilter';
import { 
  subYears, 
  subMonths, 
  format, 
  startOfToday, 
  endOfToday, 
  subDays
} from 'date-fns';

interface MapProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const Map:React.FC<MapProps> = ({ activeFilter, setActiveFilter })=> {

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  // const [activeFilter, setActiveFilter] = useState("yearly");
  const filterRef = useRef<HTMLDivElement>(null);
  const [dateFilter, setDateFilter] = useState<{
    dealStartDateMin?: string;
    dealStartDateMax?: string;
  }>({});
  
  const { dealsByCountry, loading, error } = useDealsApiService(dateFilter);
  
   const getDateRange = (period: string) => {
    const now = new Date();
    switch (period) {
      case 'today':
        return { dealStartDateMin: format(now, 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'weekly':
        return { dealStartDateMin: format(subDays(now, 7), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'monthly':
        return { dealStartDateMin: format(subMonths(now, 1), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'quarterly':
        return { dealStartDateMin: format(subMonths(now, 3), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'half-yearly':
        return { dealStartDateMin: format(subMonths(now, 6), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      case 'yearly':
        return { dealStartDateMin: format(subYears(now, 1), 'yyyy-MM-dd'), dealStartDateMax: format(now, 'yyyy-MM-dd') };
      default:
        return {};
    }
  };
  
 useEffect(() => {
    setDateFilter(getDateRange(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilter((prevState) => !prevState);
  };

  const applyFilter = (filterType: string) => {
    setActiveFilter(filterType); // Update filter in parent
    setShowFilter(false);
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
      <div className="flex justify-between items-center mb-4 relative">
        <div className="flex justify-center items-center" ref={filterRef}>
          <h3 className="text-2xl font-semibold text-bg-blue-12">
            Territory Wise Opportunity Count
          </h3>
        </div>
        <div ref={filterRef} className="relative">
      
            <img 
              src="filterC.svg" 
              alt="filter" 
              className="w-7 h-7 text-gray-500" 
              onClick={handleFilterClick}
            />
     
     {showFilter && (
          <FilterDropdown showFilter={showFilter} toggleFilter={() => setShowFilter(false)} applyFilter={applyFilter} activeFilter={activeFilter as  'today'|'weekly'|'monthly' | 'quarterly' | 'yearly' | 'half-yearly'} />
        )}
        </div>
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