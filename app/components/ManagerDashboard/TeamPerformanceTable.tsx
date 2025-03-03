'use client'
import React from 'react';
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';
import { SlidersHorizontal } from 'lucide-react';

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

const TeamPerformanceTable: React.FC<TeamPerformanceTableProps> = ({ teamData }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-indigo-500">Team Performance</CardTitle>
        <SlidersHorizontal className="w-5 h-5 text-gray-500" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-2 text-left text-indigo-500 font-medium">Employee Name</th>
                <th className="p-2 text-left text-indigo-500 font-medium">Total Lead</th>
                <th className="p-2 text-left text-indigo-500 font-medium">Total Won</th>
                <th className="p-2 text-left text-indigo-500 font-medium">Total Lost</th>
                <th className="p-2 text-left text-indigo-500 font-medium">Average Close Rate</th>
                <th className="p-2 text-left text-indigo-500 font-medium">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 border-t">{member.name}</td>
                  <td className="p-2 border-t">{member.totalLead}</td>
                  <td className="p-2 border-t">{member.totalWon}</td>
                  <td className="p-2 border-t">{member.totalLost}</td>
                  <td className="p-2 border-t">{member.averageCloseRate}</td>
                  <td className="p-2 border-t">{member.totalRevenue}</td>
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