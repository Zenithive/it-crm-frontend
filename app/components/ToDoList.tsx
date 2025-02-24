"use client"
import React, { useState, useEffect } from "react";
import Pagination from "../microComponents/Pagination";
import axios from "axios";
import HeaderButtons from "../microComponents/HeaderButtons";
import Title from "../microComponents/Title";
import { Todolisttitle } from "./Path/TitlePaths";
import Search from "../microComponents/Search";
import { headerbutton, search } from "./Path/TaskData";
import CreateTaskModal from "./CreateTaskModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const TodoList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10
  const [totalItems, setTotalItems] = useState(0);

  const user = useSelector((state: RootState) => state.auth);

  console.log(`user`, user);
  console.log(`user.token`, user.token);


  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "https://crmbackendapis.onrender.com/graphql",
          {
            query: `
              query GetTasks($page: Int!, $pageSize: Int!) {
                getTasks(
                  pagination: { page: $page, pageSize: $pageSize },
                  sort: { field: DUE_DATE, order: DESC }
                ) {
                  items {
                    taskID
                    title
                    status
                    priority
                    dueDate
                  }
                  totalCount
                }
              }
            `,
            variables: {
              page: currentPage,
              pageSize: itemsPerPage,
            },
          },
          {
            // headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDAzNzU4NDYsIm5hbWUiOiJkZW1vIiwicm9sZSI6IkFETUlOIiwidXNlcl9pZCI6IjljYjA3YmFmLWI2OGItNDY4MC1iY2E3LTA3NWQ3Y2E2ZDFhOSJ9.KTxKrEMNI2f0SldlEWZjygSFAhttpO2Vsx9i7ATVLdU`, // Replace with a valid token
            //               },

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Using user.token from Redux
            },
          }
        );

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setTodos(response.data.data.getTasks.items);
        setTotalItems(response.data.data.getTasks.totalCount);
      } catch (err) {
        setError(err.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage, itemsPerPage]); // Reload data when page or itemsPerPage changes

    const getPriorityColor = (priority: string) => {
    const priorityMap: Record<string, string> = {
      LOW: "bg-green-100 text-green-800",
      MEDIUM: "bg-yellow-100 text-yellow-800",
      HIGH: "bg-red-100 text-red-800",
      URGENT: "bg-red-600 text-white",
    };
    return priorityMap[priority] || "";
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      TODO: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      ON_HOLD: "bg-gray-300 text-gray-800",
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
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Task Name</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-left">Due Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <tr key={todo.taskID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{todo.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(todo.dueDate).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(todo.status)}`}>
                      {todo.status.replace("_", " ")}
                    </span>
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
