import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  dashboardTaskJson,
  dashboardFollowupJson,
} from "../../api/jsonService/dashboardJsonService";
import {
  dashboardTaskApi,
  dashboardFollowupApi,
} from "../../api/apiService/dashboardApiService";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [followup, setFollowup] = useState([]);
  const [activeView, setActiveView] = useState("today"); // 'today' or 'followup'

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

    useEffect(() => {
      const fetchData = async () => {
        try {
      
          const [taskData, followupData] = useDummyData
            ? await Promise.all([dashboardTaskApi(), dashboardFollowupApi()]) // API data
            : [dashboardTaskJson(), dashboardFollowupJson()]; // JSON data
  
          setTasks(useDummyData ? taskData.tasks ?? [] : taskData ?? []);
          setFollowup(useDummyData ? followupData.followup ?? [] : followupData ?? []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [useDummyData]);
  
  return (
    <div className="w-full ">
      <div className="bg-white rounded-xl shadow-custom ">
        <div className="border-b ">
          <div className="flex space-x-4 md:space-x-8 mb-4 overflow-x-auto ml-4">
            <button
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2 mt-4 ${
                activeView === "today" ? "border-b-2 border-bg-blue-12 " : ""
              }`}
              onClick={() => setActiveView("today")}
            >
              Today Task
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2 mt-4 ${
                activeView === "followup" ? "border-b-2 border-bg-blue-12" : ""
              }`}
              onClick={() => setActiveView("followup")}
            >
              Follow-Ups
            </button>
          </div>
        </div>

        {activeView === "today" ? (
          <div className="scrollbar-custom overflow-y-auto max-h-[220px] pl-6 pr-6 pb-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 ${
                  index !== tasks.length - 1 ? "border-b border-bg-blue-12-[1px] mr-4" : "mr-4"
                }`}
              >
                <div className="min-w-0 flex-1 pr-4 mt-3">
                  <h3 className="task_title">{task.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {task.dueTime}
                  </p>
                </div>
                <input type="checkbox" className="task_checkbox mr-4 " />
              </div>
            ))}
          </div>
        ) : (
          <div className="scrollbar-custom overflow-y-auto max-h-[220px] pl-6 pr-6 pb-6">
            {followup.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 mr-4 ${
                  index !== followup.length - 1
                    ? "border-b border-bg-blue-12-[1px]"
                    : ""
                }`}
              >
                <img
                  src={msg.profileImage}
                  alt={msg.name}
                  className="w-8 h-8 md:w-10 md:h-10 mt-4 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 mx-3">
                  <h4 className="font-medium text-gray-800 text-sm md:text-base truncate mt-4">
                    {msg.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {msg.message}
                  </p>
                </div>
                <button>
                <img src="arrow.svg" alt="Arrow" className="mr-4"></img>
              </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
