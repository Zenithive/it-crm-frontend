import React, { useState } from "react";
import { formatText } from "../utils/formatHelpers";
import { getRoleColor, getStatusColor } from "../utils/colorHelpers";

export interface User {
  userID: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-custom">
        <table className="min-w-full bg-white">
          <thead className="bg-bg-blue-12 text-white">
            <tr>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone Number</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user.userID} className="hover:bg-gray-50">
                  <td className="px-6 py-6">{user.name}</td>

                  <td className="px-6 py-6">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRoleColor(
                        user.role.trim().toUpperCase()
                      )}`}
                    >
                 {formatText(user.role)}
                    </span>
                  </td>
            

                  <td className="px-6 py-6">{user.email}</td>
                  <td className="px-6 py-6">{user.phone}</td>


                  <td className="flex px-6 py-6 space-x-2">
                    <img
                      src="/edit.svg"
                      alt="Edit"
                      className="cursor-pointer"
                      // onClick={() => onEdit(user)}
                    />
                    <img
                      src="/delete.svg"
                      alt="Delete"
                      className="cursor-pointer px-4"
                      // onClick={() => onDelete(user.userID)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
