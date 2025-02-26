"use client"
import React, { useState, useEffect } from "react";
import Pagination from "../microComponents/Pagination";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import { Todolisttitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import CreateTaskModal from "./CreateTaskModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import todoListApiService from "../api/apiService/todoListApiService";

const TodoList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10
  
  const { todos, loading, error, totalItems } = todoListApiService(currentPage, itemsPerPage);
  const user = useSelector((state: RootState) => state.auth);

  const formatText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

    const getPriorityColor = (priority: string) => {
    const priorityMap: Record<string, string> = {
      LOW: "bg-green-shadow-color text-green-text",
      MEDIUM: "bg-orange-shadow-color text-orange-text",
      HIGH: "bg-red-shadow-color text-red-text",
      URGENT: "bg-red-600 text-white",
    };
    return priorityMap[priority] || "";
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      TODO: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      ON_HOLD: "bg-gray-300 text-gray-800",
      COMPLETED: "bg-green-100 text-green-800",
    };
    return statusMap[status] || "";
  };

  return (
    
    <div className="p-4 max-w-[1350px] mx-auto">

      <div>
      <h1>Welcome, {user?.name || "Guest"}!</h1> 
    </div>
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex">
        <Title title={Todolisttitle[0].titleName} />
        <div className="ml-5">
        <Search searchText={search[2].searchText} />
        </div>
        </div>
        <div className="">
        <HeaderButtons
          button1Text={headerbutton[2].button1text}
          button1img={headerbutton[2].button1img}
          button2Text={headerbutton[2].button2text}
          button2img={headerbutton[2].button2img}
          button1width="w-[120px]"
          button2width="w-[200px]"
        />
        <CreateTaskModal/>
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-custom">
          <table className="min-w-full bg-white">
            <thead className="bg-bg-blue-12 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Task Name</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-left">Due Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <tr key={todo.taskID} className="hover:bg-gray-50">
                  <td className="px-6 py-6">{todo.title}</td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getPriorityColor(todo.priority)}`}>
                      {formatText(todo.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-6">{new Date(todo.dueDate).toLocaleString()}</td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(todo.status)}`}>
                      {formatText(todo.status).replace("_", " ")}
                    </span>
                  </td>
                  <td className="flex px-6 py-6 space-x-2">
                    <img src="/edit.svg" alt="Edit" className=""></img>
                    <img src="/delete.svg" alt="Delete" className="px-4"></img>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination with Dropdown for Items Per Page */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default TodoList;
