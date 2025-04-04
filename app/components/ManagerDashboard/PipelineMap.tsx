'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';
import { CountryLeadStats } from '../../api/apiService/leadApiInterface';
import DateFilter,{TimeFilterValue} from '../../microComponents/DateFilter';

import worldTopo from '../../../public/world-topo.json';

const LEAD_COLORS = {
  newLead: '#3B82F6',
  qualified: '#22C55E',
  negotiations: '#FB923C',
  closedWon: '#15803D',
  closedLost: '#EF4444'
};

// For bg classes
const LEAD_BG_COLORS = {
  newLead: 'bg-blue-500',
  qualified: 'bg-green-500',
  negotiations: 'bg-orange-400',
  closedWon: 'bg-green-700',
  closedLost: 'bg-red-500'
};

interface PipelineMapProps {
  countryLeadStats: { [key: string]: CountryLeadStats };
  onTimeFilterChange?: (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => void;
  currentTimeFilter?: string | null;
  defaultTimeFilter?: TimeFilterValue;
}

const PipelineMap: React.FC<PipelineMapProps> = ({ 
  countryLeadStats, 
  onTimeFilterChange,
  currentTimeFilter,
  defaultTimeFilter = 'monthly'
}) => {
  const [tooltipContent, setTooltipContent] = useState<{ 
    country: string; 
    stats: CountryLeadStats; 
    position: { x: number; y: number };
    countryCode?: string;
  } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const getCountryColor = (countryName: string) => {
    const stats = countryLeadStats[countryName];
    
    if (stats) {
      const totalLeads = stats.newLeads + stats.inProgress + stats.followUp + stats.closedWon + stats.closedLost;
      
      if (totalLeads > 10) return '#FFAB48';
      if (totalLeads > 5) return '#FFC57E';  
      return '#FFD7A8';                
    }
    return '#F3F4F6';                  
  };

  const handleMouseMove = (geo: any, event: React.MouseEvent) => {
    // Get the stats for this country
    const stats = countryLeadStats[geo.properties.name];
    if (!stats) return;

    // Get the map container's position
    const containerRect = mapContainerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate position relative to the container
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    // Get country code directly from geography properties if available
    const countryCode = geo.properties.ISO_A2 || geo.properties.iso || geo.properties.ISO_A3;

    // Update tooltip
    setTooltipContent({
      country: geo.properties.name,
      stats: stats,
      position: { x, y },
      countryCode: countryCode
    });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  // Handle global mouse movements
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!tooltipContent) return;
      
      // Check if mouse is still over the map container
      const containerRect = mapContainerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      
      const isInsideContainer = 
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;
      
      // If mouse has left the container, hide the tooltip
      if (!isInsideContainer) {
        setTooltipContent(null);
      }
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [tooltipContent]);

  // Handle filter changes
  const handleFilterChange = (filter: TimeFilterValue, customStartDate?: string, customEndDate?: string) => {
    if (onTimeFilterChange) {
      onTimeFilterChange(filter, customStartDate, customEndDate);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-indigo-500">Lead Pipeline Trends</CardTitle>
        {onTimeFilterChange && (
          <DateFilter
            onTimeFilterChange={handleFilterChange}
            currentTimeFilter={currentTimeFilter}
            defaultTimeFilter={defaultTimeFilter}
          />
        )}
      </CardHeader>
      
      <div className='border-b border-content-border ml-5 mr-5'></div>
      <CardContent className="p-4">
        <div className="flex flex-row justify-between gap-4">
          
          <div ref={mapContainerRef} className="w-4/4 h-[350px] relative center">
            <ComposableMap 
              projection="geoMercator"
              projectionConfig={{
                scale: 90,
                center: [0,25]
              }}
              width={900}
              height={400}
              style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}
            >
              <Geographies geography={worldTopo}>
                {({ geographies }) => 
                  geographies.map(geo => {
                    const hasData = !!countryLeadStats[geo.properties.name];
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getCountryColor(geo.properties.name)}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        onMouseMove={(event) => handleMouseMove(geo, event)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: { 
                            outline: 'none',
                            transition: 'all 0.3s',
                            cursor: hasData ? 'pointer' : 'default'
                          },
                          hover: { 
                            fill: hasData ? '#FFAB48' : '#F3F4F6', 
                            outline: 'none'
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            
            {tooltipContent && (
              <div
                style={{
                  position: 'absolute',
                  left: tooltipContent.position.x + 10,
                  top: tooltipContent.position.y - 10,
                  backgroundColor: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                  minWidth: '200px',
                  pointerEvents: 'none'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {tooltipContent.countryCode && (
                    <img 
                      src={`https://flagcdn.com/w20/${tooltipContent.countryCode.toLowerCase()}.png`} 
                      alt="" 
                      className="w-5 h-3"
                      onError={(e) => (e.currentTarget.style.display = 'none')} 
                    />
                  )}
                  <div className="font-bold text-gray-800">{tooltipContent.country}</div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <div style={{ backgroundColor: LEAD_COLORS.negotiations }} className="w-4 h-4 rounded-sm"></div>
                    <span className="font-medium">{tooltipContent.stats.followUp}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div style={{ backgroundColor: LEAD_COLORS.qualified }} className="w-4 h-4 rounded-sm"></div>
                    <span className="font-medium">{tooltipContent.stats.inProgress}</span>
                  </div>
              
                  <div className="flex items-center gap-1">
                    <div style={{ backgroundColor: LEAD_COLORS.newLead }} className="w-4 h-4 rounded-sm"></div>
                    <span className="font-medium">{tooltipContent.stats.newLeads}</span>
                  </div>
        
                  <div className="flex items-center gap-1">
                    <div style={{ backgroundColor: LEAD_COLORS.closedWon }} className="w-4 h-4 rounded-sm"></div>
                    <span className="font-medium">{tooltipContent.stats.closedWon}</span>
                  </div>
             
                  <div className="flex items-center gap-1">
                    <div style={{ backgroundColor: LEAD_COLORS.closedLost }} className="w-4 h-4 rounded-sm"></div>
                    <span className="font-medium">{tooltipContent.stats.closedLost}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
      
        </div>
        
        <div className="flex justify-center gap-4 mt-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${LEAD_BG_COLORS.newLead}`}></div>
            <span className="text-sm">New Lead</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${LEAD_BG_COLORS.qualified}`}></div>
            <span className="text-sm">Qualified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${LEAD_BG_COLORS.negotiations}`}></div>
            <span className="text-sm">Negotiations</span>
          </div>
      
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${LEAD_BG_COLORS.closedWon}`}></div>
            <span className="text-sm">Closed Won</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${LEAD_BG_COLORS.closedLost}`}></div>
            <span className="text-sm">Closed Lost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineMap;