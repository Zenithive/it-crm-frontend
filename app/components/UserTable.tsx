import React, { useState } from "react";
import { formatText } from "../utils/formatHelpers";
import { getRoleColor } from "../utils/colorHelpers";
import UserForm from "./UserForm";

export interface User {
  userID: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  password?: string;
  campaigns: {
    campaignID: string;
    campaignName: string;
    campaignCountry: string;
    industryTargeted: string;
  }[];
}

interface UserTableProps {
  users: User[];
  onDelete: (userID: string) => void;
  onEdit: (userID: string, input: { name?: string; email?: string; phone?: string; role?: string }) => void; // Updated onEdit type
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onEdit }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

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
                        user.role
                      )}`}
                    >
                      {formatText(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-6">{user.email}</td>
                  <td className="flex px-6 py-6 space-x-2">
                    <img
                      src="/edit.svg"
                      alt="Edit"
                      className="cursor-pointer"
                      onClick={() => handleEdit(user)}
                    />
                    <img
                      src="/delete.svg"
                      alt="Delete"
                      className="cursor-pointer px-4"
                      onClick={() => onDelete(user.userID)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <UserForm user={selectedUser} onClose={handleClose} onUpdate={onEdit} />
      )}
    </div>
  );
};

export default UserTable;