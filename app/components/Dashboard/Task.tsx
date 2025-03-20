import React, { useState } from "react";
import "./Dashboard.css";
import {
  dashboardFollowupJson,
} from "../../api/jsonService/dashboardJsonService";
import {
  dashboardFollowupApi,
} from "../../api/apiService/dashboardApiService";
import useTasksData from "../../hooks/useGetTaskForDashboard"; // Import the new hook

const Task = () => {
  interface Followup {
    profileImage: string;
    name: string;
    message: string;
  }

  const { tasks, loading, error, refetch } = useTasksData(); // Use the custom hook
  const [followup, setFollowup] = useState<Followup[]>([]);
  const [activeView, setActiveView] = useState("today"); // 'today' or 'followup'
  const [followupLoading, setFollowupLoading] = useState(true);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  React.useEffect(() => {
    const fetchFollowupData = async () => {
      setFollowupLoading(true);
      try {
        const followupData = useDummyData
          ? dashboardFollowupJson() // JSON data
          : await dashboardFollowupApi(); // API data

        setFollowup(
          useDummyData ? followupData ?? [] : followupData.followup ?? []
        );
      } catch (error) {
        console.error("Error fetching followup data:", error);
      } finally {
        setFollowupLoading(false);
      }
    };

    fetchFollowupData();
  }, [useDummyData]);

  const handleCheckboxChange = (taskIndex: number) => {
    // Here you would implement the API call to update the task status
    console.log(`Task ${tasks[taskIndex].taskID} status toggled`);
    
    // After the API call succeeds, you can refetch the tasks
    // This is a simple approach - you could optimize this with optimistic UI updates
    refetch();
  };

  return (
    <div className="w-full ">
      <div className="bg-white rounded-xl shadow-custom min-h-[300px]">
        <div className="border-b border-bg-blue-12">
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
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p>Loading tasks...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-32 text-red-500">
                <p>{error}</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <p>No tasks for today</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task.taskID}
                  className={`flex items-center justify-between pb-4 ${
                    index !== tasks.length - 1
                      ? "border-b border-content-border mr-4"
                      : "mr-4"
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-4 mt-3">
                    <h3 className="task_title">{task.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {task.dueTime}
                    </p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      id={`task-${task.taskID}`}
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-5 h-5 border-2 border-bg-blue-12 rounded-md bg-white 
                checked:bg-bg-blue-12 checked:border-bg-blue-12 
                cursor-pointer appearance-none checked:after:content-['✓'] 
                after:absolute after:text-white after:text-xl after:font-bold
                flex items-center justify-center"
                      style={{
                        backgroundColor: task.completed ? "#6158FF" : "white",
                        position: "relative",
                      }}
                    />
                    {task.completed && (
                      <span
                        className="absolute text-white text-xl font-bold pointer-events-none"
                        style={{
                          transform: "translate(-50%, -50%)",
                          left: "50%",
                          top: "50%",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="scrollbar-custom overflow-y-auto max-h-[220px] pl-6 pr-6 pb-6">
            {followupLoading ? (
              <div className="flex justify-center items-center h-32">
                <p>Loading follow-ups...</p>
              </div>
            ) : followup.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <p>No follow-ups</p>
              </div>
            ) : (
              followup.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between pb-4 mr-4 ${
                    index !== followup.length - 1
                      ? "border-b border-content-border"
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
