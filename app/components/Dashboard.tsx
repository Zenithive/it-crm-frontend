"use client";
import React from "react";
import MonthlyLead from "./Dashboard/MonthlyLead";
import Dashboard_Title from "./Dashboard/DashboardTitle";
import Task from "./Dashboard/Task";
import Meetings from "./Dashboard/Meetings";
import UnreadMessages from "./Dashboard/UnreadMessages";
import TotalLeadLine from "./Dashboard/TotalLeadLine";
import { RootState } from "../redux/store/store";
import { nav } from "../components/Path/TaskData";
import { Dashboardtitle } from "../components/Path/TitlePaths";
import { useSelector } from "react-redux";


const CRMDashboard = () => {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar nav={nav[0]}/> */}
      {/* <div>
      <h1>Welcome, {user?.name || "Guest"}!</h1> 
    </div> */}

      <main className="p-4 md:p-6 lg:p-8">
        <Dashboard_Title Dashboardtitle={Dashboardtitle} />

        <div className="mb-4 md:mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-6 space-y-4 md:space-y-6">
            <Task />
            <Meetings />
          </div>

          <div className="lg:col-span-6 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <div className="w-full sm:w-1/2">
                <MonthlyLead />
              </div>
              <div className="w-full sm:w-1/2">
                <UnreadMessages />
              </div>
            </div>

            <TotalLeadLine />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRMDashboard;
