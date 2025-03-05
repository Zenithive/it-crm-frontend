'use client';
import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';

// Import world topology
import worldTopo from '../../../public/world-topo.json';

// Define lead status colors
const LEAD_COLORS = {
  newLead: 'bg-blue-500',
  qualified: 'bg-green-500',
  negotiations: 'bg-orange-400',
  closedWin: 'bg-green-700',
  closedLost: 'bg-red-500'
};

// Sample lead data
const leadData = [
  { 
    country: 'CAN', 
    newLeads: 12, 
    qualified: 10, 
    negotiations: 8, 
    closedWin: 5, 
    closedLost: 5 
  },
  { 
    country: 'IND', 
    newLeads: 10, 
    qualified: 8, 
    negotiations: 6, 
    closedWin: 4, 
    closedLost: 3 
  }
];

const PipelineMap: React.FC = () => {
  // Color mapping function
  const getCountryColor = (countryCode: string) => {
    const countryData = leadData.find(d => d.country === countryCode);
    
    if (countryData) {
      // Customize color logic based on different metrics
      return countryData.newLeads > 10 ? '#3B82F6' : '#93C5FD';
    }
    
    return '#F3F4F6'; // Light gray for countries without data
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-indigo-500">Lead Pipeline Trends</CardTitle>
        <button>
          <img src='/filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
        </button>
      </CardHeader>
      <div className='border-b border-content-border ml-5 mr-5'></div>
      <CardContent className="p-4">
        <div className="flex flex-col justify-center items-center">
          {/* World Map */}
          <div className="w-full h-[350px]">
            <ComposableMap 
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [0, 20]
              }}
              width={800}
              height={400}
              style={{ backgroundColor: 'transparent' }}
            >
              <Geographies geography={worldTopo}>
                {({ geographies }) => 
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(geo.id)}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { 
                          outline: 'none',
                          transition: 'all 0.3s'
                        },
                        hover: { 
                          fill: '#FFAB48', 
                          outline: 'none',
                          cursor: 'pointer'
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </div>
          
          {/* Legend */}
          <div className="flex flex-col items-center gap-2">
  {/* First Row - 3 items */}
  <div className="grid grid-cols-3 gap-3">
    {Object.entries(LEAD_COLORS)
      .slice(0, 3) // Take the first 3 items
      .map(([key, colorClass]) => (
        <div key={key} className="flex items-center gap-1">
          <div className={`w-9 h-3 rounded-sm ${colorClass}`}></div>
          <span className="text-sm font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
        </div>
      ))}
  </div>

  {/* Second Row - 2 items */}
  <div className="grid grid-cols-2 gap-3">
    {Object.entries(LEAD_COLORS)
      .slice(3) // Take the remaining 2 items
      .map(([key, colorClass]) => (
        <div key={key} className="flex items-center gap-1">
          <div className={`w-9 h-3 rounded-sm ${colorClass}`}></div>
          <span className="text-sm font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
        </div>
      ))}
  </div>
</div>

        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineMap;