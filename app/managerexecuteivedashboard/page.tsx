"use client";
import React from "react";
import { Card } from "../microComponents/CardForIndividualDashboard";
import { MetricCard } from "../components/ManagerDashboard/MetricCard";
import TeamPerformanceTable from "../components/ManagerDashboard/TeamPerformanceTable";
import PipelineMap from "../components/ManagerDashboard/PipelineMap";
import LeadSourceChart from "../components/ManagerDashboard/LeadSource";
import dummyData from "../dummyData/dummydata.json";

// Define interfaces for your data structure
interface KeyMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface LeadSource {
  month: string;
  LinkedIn: number;
  UpWork: number;
  Contact: number;
  Direct?: number;
  Other: number;
}

interface TeamMember {
  name: string;
  totalLead: number;
  totalWon: number;
  totalLost: number;
  averageCloseRate: string;
  totalRevenue: string;
}

interface DummyData {
  keyMetrics: KeyMetric[];
  teamData: TeamMember[];
  leadSourceData: LeadSource[];
}

const SalesDashboard: React.FC = () => {
  // Import data from the JSON file and type it
  const { keyMetrics, teamData, leadSourceData } = dummyData as DummyData;

  return (
    <div className="">
      <div className="bg-blue-background">
        <div className="flex flex-col w-full gap-4 p-4 ">
          {/* Key Metrics Cards */}
          <Card className="bg-white shadow-custom rounded-xl overflow-hidden">
            <div className="justify-end items-end flex mr-4 mt-2">
              <img src="filterC.svg" alt="filter" className=""></img>
            </div>
            <div className="flex">
              {keyMetrics.map((metric, index) => (
                <div
                  key={index}
                  className={`relative  flex-1 px-4 pb-4 ${
                    index !== 0
                      ? "after:content-[''] after:absolute after:top-8 after:bottom-8 after:left-0 after:w-px after:bg-content-border"
                      : ""
                  }`}
                >
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    isPositive={metric.isPositive}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Charts and Map Section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {/* Pipeline Map */}
            <PipelineMap />

            {/* Lead Source Chart */}
            <LeadSourceChart/>
          </div>

          {/* Team Performance Table Component */}
          <TeamPerformanceTable />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
