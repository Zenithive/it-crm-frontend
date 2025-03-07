"use client";
import React from "react";
import { Card } from "../../microComponents/CardForIndividualDashboard";
import { CardContent } from "../../microComponents/CardContent";
import { CardHeader } from "../../microComponents/CardHeader";
import { CardTitle } from "../../microComponents/CardTitle";

// Define the type for team member data
interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

// Define the props interface
interface TeamPerformanceTableProps {
  teamData: TeamMember[];
}

const TeamPerformanceTable: React.FC<TeamPerformanceTableProps> = ({
  teamData,
}) => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between ml-6 mb-2 mt-6">
        <CardTitle className="text-bg-blue-12">Team Performance</CardTitle>
        <button>
        <img src='filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
        </button>
      </CardHeader>

      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full rounded-2xl overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-bg-blue-12 text-white">
                <th className="p-4 text-left font-medium">Employee Name</th>
                <th className="p-4 text-left font-medium">Total Lead</th>
                <th className="p-4 text-left font-medium">Total Won</th>
                <th className="p-4 text-left font-medium">Total Lost</th>
                <th className="p-4 text-left font-medium">
                  Average Close Rate
                </th>
                <th className="p-2 text-left  font-medium">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="border-spacing-y-5 border-separate">
              {teamData.map((member, index) => (
                <tr key={index} className={`bg-white`}>
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
    </>
  );
};

export default TeamPerformanceTable;
