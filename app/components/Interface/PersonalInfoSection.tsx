// src/components/FormSections/PersonalInfoSection.tsx
"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { LeadFormData } from "../Interface/AddLeadModalInterface";

interface PersonalInfoSectionProps {
  register: UseFormRegister<LeadFormData>;
  trigger: UseFormTrigger<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  register,
  trigger,
  errors
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          First Name
        </label>
        <input
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
          })}
          placeholder="Enter First name"
          className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">
            {errors.firstName.message}
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          Last Name
        </label>
        <input
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
          })}
          placeholder="Enter Last Name"
          className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">
            {errors.lastName.message}
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          LinkedIn Profile URL
        </label>
        <input
          {...register("linkedIn", {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
              message: "Enter a valid LinkedIn URL",
            },
          })}
          onBlur={() => trigger("linkedIn")} // Validate on blur
          placeholder="Link"
          className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
/>
        {errors.linkedIn && (
          <span className="text-red-500 text-sm">
            {errors.linkedIn.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
