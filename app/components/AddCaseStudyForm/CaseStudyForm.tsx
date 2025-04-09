// src/components/CaseStudy/AddCaseStudyForm/CaseStudyForm.tsx

import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Notes from "../../microComponents/Notes";
import PubSub from "../../pubsub/Pubsub";
import { CaseStudyFormData } from "./AddCaseStudyInterface";

interface CaseStudyFormProps {
  form: UseFormReturn<CaseStudyFormData>;
  onSubmit: SubmitHandler<CaseStudyFormData>;
  loading: boolean;
}

const CaseStudyForm: React.FC<CaseStudyFormProps> = ({ form, onSubmit, loading }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="grid grid-cols-2 gap-2">
        {/* Project Name */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Project Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            {...register("projectName", {
              required: "Project name is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.projectName && (
            <span className="text-red-500 text-sm">
              {errors.projectName.message}
            </span>
          )}
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Client Name
          </label>
          <input
            type="text"
            placeholder="Name"
            {...register("clientName", {
              required: "Client name is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.clientName && (
            <span className="text-red-500 text-sm">
              {errors.clientName.message}
            </span>
          )}
        </div>

        {/* Project Duration */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Project Duration
          </label>
          <input
            type="text"
            placeholder="Duration (e.g., 3 months)"
            {...register("projectDuration", {
              required: "Project duration is required",
              pattern: {
                value: /^[0-9]+(\s*(months?|years?|days?))?$/i,
                message: "Enter a valid duration (e.g., '3 months')",
              },
            })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.projectDuration && (
            <span className="text-red-500 text-sm">
              {errors.projectDuration.message}
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Tech Stack
          </label>
          <input
            type="text"
            placeholder="Tech (e.g., React, Node.js)"
            {...register("techStack", {
              required: "Tech stack is required",
            })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.techStack && (
            <span className="text-red-500 text-sm">
              {errors.techStack.message}
            </span>
          )}
        </div>

        {/* Industry Targeted */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Industry Targeted
          </label>
          <input
            type="text"
            placeholder="Targeted Industry"
            {...register("industryTarget", {
              required: "Industry target is required",
            })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.industryTarget && (
            <span className="text-red-500 text-sm">
              {errors.industryTarget.message}
            </span>
          )}
        </div>

        {/* Document - Note: This field seems duplicated in original code */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Document
          </label>
          <input
            type="text"
            placeholder="Document Link"
            {...register("document")}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Searchable Tags */}
        <div>
          <label className="block text-md text-bg-blue-12 font-medium mb-2">
            Searchable Tags
          </label>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            {...register("tags", {
              required: "At least one tag is required",
              setValueAs: (value) => {
                if (!value || typeof value !== "string") return [];
                return value.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
              },
              validate: (value) =>
                (value && value.length > 0) || "At least one valid tag is required",
            })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.tags && (
            <span className="text-red-500 text-sm">
              {errors.tags.message}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2">
        <label className="block text-md text-bg-blue-12 font-medium mb-2">
          Key Outcomes
        </label>
        <Notes
          vendorId={"1"}
          value={watch("keyOutcomes") || ""}
          onChange={(value) =>
            setValue("keyOutcomes", value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
        <input
          type="hidden"
          {...register("keyOutcomes", {
            required: "Key outcomes are required",
            minLength: { value: 10, message: "Minimum 10 characters required" },
          })}
        />
        {errors.keyOutcomes && (
          <span className="text-red-500 text-sm">
            {errors.keyOutcomes.message}
          </span>
        )}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-bg-blue-12 text-white rounded-lg font-medium"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CaseStudyForm;