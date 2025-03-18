import React, { useState } from "react";
import { formatText } from "../utils/formatHelpers";
import { getRoleColor } from "../utils/colorHelpers";
import UserForm from "./UserForm";

export interface User {
  userID: string;
  FirstName: string;
  LastName: string;
  role: string;
  email: string;
  phone: string;
  password?:string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal and set selected user
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
                  <td className="px-6 py-6">{user.FirstName} {user.LastName}</td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRoleColor(
                        user.role
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
                      onClick={() => handleEdit(user)} // Open modal
                    />
                    <img
                      src="/delete.svg"
                      alt="Delete"
                      className="cursor-pointer px-4"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render Edit Modal */}
      {isModalOpen && selectedUser && (
        <UserForm user={selectedUser} onClose={handleClose} />
      )}
    </div>
  );
};

export default UserTable;
