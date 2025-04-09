// src/components/CaseStudy/AddCaseStudyForm/LeadCloseForm.tsx

import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { LeadCloseFormData } from "./AddCaseStudyInterface";

interface LeadCloseFormProps {
  form: UseFormReturn<LeadCloseFormData>;
  onSubmit: SubmitHandler<LeadCloseFormData>;
  loading: boolean;
}

const LeadCloseForm: React.FC<LeadCloseFormProps> = ({ form, onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Deal Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            {...register("dealName", {
              required: "Deal name is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.dealName && (
            <span className="text-red-500 text-sm">
              {errors.dealName.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Deal Start Date
          </label>
          <input
            type="date"
            {...register("dealStartDate", {
              required: "Deal start date is required",
            })}
            className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.dealStartDate && (
            <span className="text-red-500 text-sm">
              {errors.dealStartDate.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Project Requirement
          </label>
          <input
            type="text"
            placeholder="Project requirements"
            {...register("projectRequirement", {
              required: "Project requirement is required",
              minLength: { value: 5, message: "Minimum 5 characters required" },
            })}
            className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.projectRequirement && (
            <span className="text-red-500 text-sm">
              {errors.projectRequirement.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Deal Status
          </label>
          <select
            {...register("dealStatus", {
              required: "Deal status is required",
            })}
            className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Select status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED_WON">Closed Won</option>
            <option value="CLOSED_LOST">Closed Lost</option>
          </select>
          {errors.dealStatus && (
            <span className="text-red-500 text-sm">
              {errors.dealStatus.message}
            </span>
          )}
        </div>

        <div className="mt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LeadCloseForm;