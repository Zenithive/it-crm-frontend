"use client";
import React, { useState } from "react";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import Search from "../microComponents/Search";
import Pagination from "../microComponents/Pagination"
import { Todolisttitle } from "./Path/TitlePaths";
import { headerbutton, search } from "./Path/TaskData";

// Define TypeScript interfaces
interface Todo {
  id: string;
  taskName: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  status: "Scheduled" | "In Progress" | "Completed";
}

const TodoList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [resources, setResources] = useState<Resource[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [itemsPerPage, setItemsPerPage] = useState(9); 
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      taskName: "CRM",
      priority: "Low",
      dueDate: "01/01/2024",
      status: "Scheduled",
    },
    {
      id: "2",
      taskName: "CRM",
      priority: "Medium",
      dueDate: "01/01/2024",
      status: "Completed",
    },
    {
      id: "3",
      taskName: "CRM",
      priority: "High",
      dueDate: "01/01/2024",
      status: "In Progress",
    },
    {
      id: "4",
      taskName: "CRM",
      priority: "High",
      dueDate: "01/01/2024",
      status: "In Progress",
    },
    {
      id: "5",
      taskName: "CRM",
      priority: "Medium",
      dueDate: "01/01/2024",
      status: "Completed",
    },
  ]);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = resources.slice(startIndex, endIndex);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-purple-100 text-purple-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
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
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-custom">
        <table className="min-w-full bg-white ">
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
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{todo.taskName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
                      todo.priority
                    )}`}
                  >
                    {todo.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{todo.dueDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      todo.status
                    )}`}
                  >
                    {todo.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <img src="/edit.svg" className=""></img>

                    <img src="/delete.svg" className="ml-6"></img>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Pagination
          totalItems={resources.length}
          initialItemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default TodoList;
