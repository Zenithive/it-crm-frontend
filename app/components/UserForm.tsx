import React, { useState, useEffect } from "react";
import { User } from "./UserTable";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (userID: string, input: { name?: string; email?: string; phone?: string; role?: string }) => void;
}

const UserForm: React.FC<EditUserModalProps> = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<User>({
    ...user,
    phone: user.phone || "",
  });

  useEffect(() => {
    setFormData({
      ...user,
      phone: user.phone || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      role: formData.role,
    };
    onUpdate(user.userID, input);
    console.log("Updated User Data:", input);
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
                <label className="block text-bg-blue-12">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                <label className="block text-bg-blue-12">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
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
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-bg-blue-12 text-white rounded-lg w-full"
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