import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "./Dashboard.css";
import useTasksData from "../../hooks/useGetTaskForDashboard";
import { GET_LEADS } from "../../../graphQl/queries/leads.queries";
import { useUpdateTask } from "../../hooks/useUpdateTask";

export interface Lead {
  leadID: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  leadSource: string;
  leadStage: string;
  leadPriority: string;
  linkedIn: string;
  leadType: string;
  initialContactDate: string;
  leadCreatedBy: {
    userID: string;
    name: string;
    email: string;
  };
  leadAssignedTo: {
    userID: string;
    name: string;
    email: string;
  };
  activities: LeadActivity[];
  organization: {
    organizationID: string;
    organizationName: string;
  };
  campaign: {
    campaignID: string;
    campaignName: string;
    campaignCountry: string;
    campaignRegion: string;
    industryTargeted: string;
  };
}

export interface LeadActivity {
  activityID: string;
  activityType: string;
  dateTime: string;
  communicationChannel: string;
  contentNotes: string;
  participantDetails: string;
  followUpActions: string;
}

export interface Followup {
  profileImage?: string;
  name: string;
  message: string;
  activityID?: string;
  dateTime?: string;
}
const Task = () => {
  const { tasks, loading, error, refetch } = useTasksData();
  const [followup, setFollowup] = useState<Followup[]>([]);
  const [activeView, setActiveView] = useState("today");

  // Use the useUpdateTask hook
  const { handleConfirmUpdate } = useUpdateTask(refetch);

  const {
    loading: leadsLoading,
    error: leadsError,
    data: leadsData
  } = useQuery(GET_LEADS, {
    variables: {
      filter: { email: "faizm@zenithive.com" }, 
      pagination: { page: 1, pageSize: 20 },
      sort: { field: "EMAIL", order: "ASC" }
    },
    skip: activeView !== "followup"
  });

  // Transform lead activities to followup format
  useEffect(() => {
    if (leadsData?.getLeads?.items) {
      const uniqueActivities = new Set<string>();
      const transformedFollowups: Followup[] = [];

      leadsData.getLeads.items.forEach((lead: Lead) => {
        lead.activities.forEach((activity: LeadActivity) => {
          // Create a unique key based on activity details
          const activityKey = `${activity.activityID}-${activity.contentNotes}-${activity.dateTime}`;
          
          // Only add if this activity hasn't been seen before
          if (!uniqueActivities.has(activityKey)) {
            transformedFollowups.push({
              name: `${lead.firstName} ${lead.lastName}`,
              message: activity.contentNotes,
              activityID: activity.activityID,
              dateTime: activity.dateTime,
              profileImage: '' 
            });
            uniqueActivities.add(activityKey);
          }
        });
      });

      setFollowup(transformedFollowups);
    }
  }, [leadsData]);

  const handleCheckboxChange = (taskIndex: number) => {
    const task = tasks[taskIndex];
    
    // Prepare the input for updating the task status
    const updateInput = {
      status: task.completed ? "TODO" : "COMPLETED"
    };

    // Call the mutation to update the task
    handleConfirmUpdate(task.taskID, updateInput);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-custom min-h-[330px]">
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
          <div className="scrollbar-custom overflow-y-auto max-h-[330px] pl-6 pr-6 pb-6">
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
                  <div className="min-w-0 flex-1 pr-4 mt-3 relative">
                    <div className="flex items-center">
                      <h3 className="task_title mr-2">{task.title}</h3>
                      {task.completed && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
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
          // Follow-ups section remains the same
          <div className="scrollbar-custom overflow-y-auto max-h-[220px] pl-6 pr-6 pb-6">
            {leadsLoading ? (
              <div className="flex justify-center items-center h-32">
                <p>Loading follow-ups...</p>
              </div>
            ) : leadsError ? (
              <div className="flex justify-center items-center h-32 text-red-500">
                <p>Error loading follow-ups</p>
              </div>
            ) : followup.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <p>No follow-ups</p>
              </div>
            ) : (
              followup.map((msg, index) => (
                <div
                  key={msg.activityID || index}
                  className={`flex items-center justify-between pb-4 mr-4 ${
                    index !== followup.length - 1
                      ? "border-b border-content-border"
                      : ""
                  }`}
                >
                  {/* <img
                    src={msg.profileImage || '/default-profile.png'}
                    alt={msg.name}
                    className="w-8 h-8 md:w-10 md:h-10 mt-4 flex-shrink-0 rounded-full"
                  /> */}
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