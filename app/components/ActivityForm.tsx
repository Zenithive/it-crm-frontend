"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the interface for form data
interface ActivityFormData {
  activityType: string;
  followUp: string;
  dateTime: string;
  communicationChannel: string;
  note: string;
}

interface ActivityFormProps {
  onClose: () => void;
  onSubmit: (data: ActivityFormData) => Promise<void>;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ActivityFormData>();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit: SubmitHandler<ActivityFormData> = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Failed to submit activity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 relative max-w-2xl w-full">
        <div className="bg-bg-blue-12 rounded-t-xl p-2 flex justify-between items-center">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">Activity</h2>
          </div>
          <div className="p-2">
            <button
              className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
              onClick={onClose}
            >
               <img src="cross_icon.svg" alt="Cross" className="h-3 w-3"></img>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Activity Type */}
              <div>
                <label className="block text-md text-bg-blue-12 font-medium mb-2">
                  Activity Type
                </label>
                <input
                  type="text"
                  placeholder="Type"
                  {...register("activityType", { required: true })}
                  className="w-full px-4 py-3 border border-bg-blue-12 rounded-lg focus:outline-none "
                />
                {errors.activityType && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              {/* Follow up */}
              <div>
                <label className="block text-md text-bg-blue-12 font-medium mb-2">
                  Follow up
                </label>
                <input
                  type="text"
                  placeholder="Follow up"
                  {...register("followUp")}
                  className="w-full px-4 py-3 border border-bg-blue-12 rounded-lg focus:outline-none "
                />
              </div>

              {/* Date/Time */}
              <div>
                <label className="block text-md text-bg-blue-12 font-medium mb-2">
                  Date/Time
                </label>
                <input
                  type="datetime-local"
                  placeholder="Date/time"
                  {...register("dateTime", { required: true })}
                  className="w-full px-4 py-3 border border-bg-blue-12 rounded-lg focus:outline-none "
                />
                {errors.dateTime && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              {/* Communication Channel */}
              <div>
                <label className="block text-md text-bg-blue-12 font-medium mb-2">
                  Communication Channel
                </label>
                <input
                  type="text"
                  placeholder="Communication"
                  {...register("communicationChannel")}
                  className="w-full px-4 py-3 border border-bg-blue-12 rounded-lg focus:outline-none "
                />
              </div>
            </div>

            {/* Note */}
            <div className="mt-6">
              <label className="block text-md text-bg-blue-12 font-medium mb-2">
                Note
              </label>
              <textarea
                placeholder="Enter your notes here..."
                {...register("note")}
                rows={5}
                className="w-full px-4 py-3 border border-bg-blue-12 rounded-lg focus:outline-none  resize-none"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-bg-blue-12 text-white rounded-lg  font-medium"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;