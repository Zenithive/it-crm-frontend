import React, { useState, useEffect } from "react";
import { apiServiceIndividual } from "../../api/apiService/apiServiceIndividual";
import { jsonServiceIndividual } from "../../api/jsonService/jsonServiceIndividual";
import "../Dashboard/Dashboard.css";

const flag = false; // Change to false to use JSON instead of API

const LeftSide = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = flag ? await apiServiceIndividual() : await jsonServiceIndividual();
        setData(fetchedData);
      } catch (err) {
        setError("Error fetching left-side data");
        console.error(err);
        // Fallback to JSON data if API fails
        setData(await jsonServiceIndividual());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-lg shadow-custom bg-white p-1">
      <div className="scrollbar-custom overflow-y-auto h-screen">
        <div className="space-y-4 mt-3">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            data.map((item, index) => (
              <div key={index} className="ml-4">
                {/* Always Show Label */}
                <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">{item.label}</h2>
                <div className="flex items-center gap-2 text-gray-700">
                  {item.icon && <img src={item.icon} alt={item.label} />}
                  {item.value ? ( // Only show value if available
                    item.isLink ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-blue-600 hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div>{item.value}</div>
                    )
                  ) : (
                    <div className="text-gray-400">N/A</div> // Show placeholder when value is missing
                  )}
                </div>
                {/* Always Show Divider */}
                <div className="border border-bg-blue-12-[1.19px] mt-4 mr-4"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
