import React, { useState } from "react";
import useDealsApiService from "../../api/apiService/dealsApiService";
import { Deal } from "../../api/apiService/dealsApiService";
import FilterDropdown from "../CleveldashboardFilter/cleveldashboard.filter";

const TopDeals = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { 
    deals, 
    loading, 
    error, 
    activeFilter, 
    updateFilter,
    dateFilter
  } = useDealsApiService();

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const applyFilter = (filterType: string) => {
    updateFilter(filterType);
    setShowFilter(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">Top Deals</h3>
        <div className="relative">
          <div className="flex items-center">
            {dateFilter && (
              <span className="mr-2 text-sm text-gray-500">
                {dateFilter.dealStartDateMin} to {dateFilter.dealStartDateMax}
              </span>
            )}
            <img
              src="filter.svg"
              alt="Filter"
              className="cursor-pointer"
              onClick={toggleFilter}
            />
          </div>
          <FilterDropdown
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            applyFilter={applyFilter}
            activeFilter={activeFilter || "none"}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-custom p-4">
        <div className="space-y-2 scrollbar-custom overflow-y-auto max-h-[450px] pr-4">
          {deals.map((deal: Deal, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
              <div>
                <p className="font-medium text-lg text-bg-blue-12">
                  {deal.dealName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(deal.dealStartDate).toLocaleDateString()} - 
                  {deal.dealEndDate ? new Date(deal.dealEndDate).toLocaleDateString() : 'Ongoing'}
                </p>
              </div>

              <div className="flex flex-col items-end min-w-[100px]">
                <div className="font-bold">{`$${Math.floor(
                  Number(deal.dealAmount)
                ).toLocaleString()}`}</div>
                <div
                  className={`text-sm font-semibold text-black py-1 px-3 rounded-md mt-1 w-fit ${
                    deal.dealStatus === "final"
                      ? "bg-shadow-green"
                      : "bg-bg-blue-16"
                  }`}
                >
                  {deal.dealStatus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;