"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { CardContent } from "../../microComponents/CardContent";
import { CardHeader } from "../../microComponents/CardHeader";
import { CardTitle } from "../../microComponents/CardTitle";
import leadsApiService from "../../api/apiService/leadsApiService";



interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

const TeamPerformanceTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  

  const { 
    teamPerformance, 
    loading, 
    error 
  } = leadsApiService(currentPage, itemsPerPage, true);

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
          <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p>Loading team performance data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
          <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p>Error loading team data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
        <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
        <button>
          <img src='filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
        </button>
      </CardHeader>

      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full rounded-xlxl overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-bg-blue-12 text-white">
                <th className="p-4 text-left font-medium">Employee Name</th>
                <th className="p-4 text-left font-medium">Total Lead</th>
                <th className="p-4 text-left font-medium">Total Won</th>
                <th className="p-4 text-left font-medium">Total Lost</th>
                <th className="p-4 text-left font-medium">
                  Average Close Rate
                </th>
                <th className="p-2 text-left font-medium">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="border-spacing-y-5 border-separate">
              {teamPerformance.map((member, index) => (
                <tr key={index} className="bg-white">
                  <td className="p-4 border-t rounded-l-lg">{member.name}</td>
                  <td className="p-4 border-t">{member.totalLead}</td>
                  <td className="p-4 border-t">{member.totalWon}</td>
                  <td className="p-4 border-t">{member.totalLost}</td>
                  <td className="p-4 border-t">{member.averageCloseRate}</td>
                  <td className="p-4 border-t rounded-r-lg">
                    {member.totalRevenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceTable;