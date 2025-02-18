"use client";
import React, { useEffect, useState } from "react";
import { getJsonData } from "../api/jsonService/todoListJsonService";
import { getApiData } from "../api/apiService/todoListApiService"
import { Edit, Trash } from "lucide-react";

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const useDummyData = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = useDummyData ? await getJsonData() : await getApiData();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [useDummyData]);

  const getPriorityColor = (priority: string) => {
    return priority === "High" ? "bg-red-100 text-red-600" :
           priority === "Medium" ? "bg-yellow-100 text-yellow-600" :
           "bg-green-100 text-green-600";
  };

  const getStatusColor = (status: string) => {
    return status === "Completed" ? "bg-green-100 text-green-600" :
           status === "In Progress" ? "bg-yellow-100 text-yellow-600" :
           "bg-purple-100 text-purple-600";
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-600 text-white">
            {["Task Name", "Priority", "Due Date", "Status", "Actions"].map((header) => (
              <th key={header} className="py-3 px-4 text-left font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{task.name}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="py-3 px-4">{task.dueDate}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="py-3 px-4 flex gap-2">
                <button className="text-green-500 hover:text-green-700">
                  <Edit size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;