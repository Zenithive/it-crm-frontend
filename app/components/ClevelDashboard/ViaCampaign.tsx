import React from 'react';
import leadsApiService from '../../api/apiService/leadsApiService';

interface Opportunity {
  country: string;
  count: number;
}

const opportunities: Opportunity[] = [
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
  { country: "United States", count: 120 },
  { country: "UK", count: 60 },
  { country: "Ahmedabad", count: 40 },
];

const ViaCampaign = () => {

  const { campaignCountryCounts } = leadsApiService(1, 10, true);
  return (
  <div>
      {/* Title Outside the Box */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-bg-blue-12">
          Opportunities via Campaigns
        </h3>
        <img src="filter.svg" alt="Filter" />
      </div>

      {/* Opportunities Container */}
      <div className="bg-white rounded-2xl shadow-custom p-4 min-h-[340px]">
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
