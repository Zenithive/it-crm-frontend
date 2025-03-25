import React, { useState } from 'react';
import { useSalesTeamData } from '../../api/apiService/salesTeamService';

const SalesTeamPerformance = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { salesTeamData, totalCount, isLoading, error, refetchUsers } = useSalesTeamData(page, pageSize);

  const calculateProgress = (amount: string) => {
    const cleanAmount = amount.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanAmount) || 0;
    const maxAmount = Math.max(...salesTeamData.map((team) => parseFloat(team.amount.replace(/[^0-9.]/g, '')) || 0));

    return Math.min(Math.round((numericValue / (maxAmount || 1)) * 100), 100);
  };

  if (isLoading) return <div>Loading sales team data...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">Sales Team Performance</h3>
        <img src="filter.svg" alt="Filter" onClick={() => refetchUsers()} />
      </div>

      {/* Sales Performance Container */}
      <div className="bg-white rounded-xl shadow-custom p-4">
        <div className="p-4 space-y-4 scrollbar-custom overflow-y-auto max-h-[450px] pr-5 pl-4">
          {salesTeamData.length > 0 ? (
            salesTeamData.map((team, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <div className="mb-2">
                  <div className="font-semibold">{team.name}</div>
                  <div>
                    {team.deals} deals - {team.amount}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-bg-blue-12 h-2.5 rounded-full"
                    style={{ width: `${calculateProgress(team.amount)}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No sales data available</div>
          )}
        </div>

        {totalCount > pageSize && (
          <div className="flex justify-between items-center mt-4 px-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-bg-blue-12 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(totalCount / pageSize)}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.ceil(totalCount / pageSize)}
              className="px-3 py-1 bg-bg-blue-12 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTeamPerformance;
