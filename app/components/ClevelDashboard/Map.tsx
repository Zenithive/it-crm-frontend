import React from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import worldTopo from "../../../public/world-topo.json";

const Map = () => {
  return (
    <div>
      {/* Title Outside the Box */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">
          Territory Wise Opportunity Count
        </h3>
        <img src="filter.svg" alt="Filter" />
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl shadow-custom p-4 h-auto flex flex-col">
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
                      default: { outline: "none", fill: "#E0E7F4" },
                      hover: {
                        fill: "#FFAB48",
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default Map;
