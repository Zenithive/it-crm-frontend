import React, { useState, useEffect } from "react";
import { User } from "./UserTable";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

const UserForm: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState<User>({ ...user });

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);
    onClose();
  };


  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="p-6 relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-bg-blue-12 rounded-t-xl flex justify-between items-center p-5">
          <h2 className="text-2xl font-semibold text-white">User Form</h2>
          <button
            className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
            onClick={onClose}
          >
            <img src="/cross_icon.svg" alt="Close" className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-bg-blue-12">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>
              <div>
                <label className="block text-bg-blue-12">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg"
                />
              </div>

              <div>
                <label className="block text-bg-blue-12">Password</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-bg-blue-12 focus:outline-none rounded-lg mb-3"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end ">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
