"use client";
import React from "react";
import MonthlyLead from "./Dashboard/MonthlyLead";
import Navbar from "./Navbar";
import Dashboard_Title from "./Dashboard/Dashboard_Title";
import Task from "./Dashboard/Task";
import Meetings from "./Dashboard/Meetings";
import UnreadMessages from "./Dashboard/UnreadMessages";
import TotalLeadLine from "./Dashboard/TotalLeadLine";
import {
  unread_messages,
  tasks,
  followup,
  chartData,
  recent,
  meetings,
} from "../components/Path/TaskData";
import { Dashboardtitle } from "../components/Path/TitlePaths";

const CRMDashboard = () => {

  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-4 md:p-6 lg:p-8">
        <Dashboard_Title data-testid="dashboard-title"Dashboardtitle={Dashboardtitle} />

        <div className="mb-4 md:mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-6 space-y-4 md:space-y-6">
            <Task data-testid="task-section"tasks={tasks} followup={followup} />
            <Meetings data-testid="meetings-section"meetings={meetings} recent={recent} />
          </div>

          <div className="lg:col-span-6 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <div className="w-full sm:w-1/2">
                <MonthlyLead data-testid="monthly-lead-section"/>
              </div>
              <div className="w-full sm:w-1/2">
                <UnreadMessages unread_messages={unread_messages} />
              </div>
            </div>

            <TotalLeadLine chartData={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRMDashboard;
