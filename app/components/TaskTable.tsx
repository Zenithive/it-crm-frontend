import React from "react";
import { formatText } from "../utils/formatHelpers";
import { getPriorityColor, getStatusColor } from "../utils/colorHelpers";

interface Task {
  taskID: string;
  title: string;
  priority: string;
  dueDate: string;
  status: string;
}

interface TaskTableProps {
  todos: Task[];
  onDelete: (taskID: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ todos, onDelete }) => {
  return (
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
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${getPriorityColor(
                    todo.priority
                  )}`}
                >
                  {formatText(todo.priority)}
                </span>
              </td>
              <td className="px-6 py-6">
                {new Date(todo.dueDate).toLocaleString()}
              </td>
              <td className="px-6 py-6">
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(
                    todo.status
                  )}`}
                >
                  {formatText(todo.status).replace("_", " ")}
                </span>
              </td>
              <td className="flex px-6 py-6 space-x-2">
                <img src="/edit.svg" alt="Edit" className="cursor-pointer" />
                <img
                  src="/delete.svg"
                  alt="Delete"
                  className="cursor-pointer px-4"
                  onClick={() => onDelete(todo.taskID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
