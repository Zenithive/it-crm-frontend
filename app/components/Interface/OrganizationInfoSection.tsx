// src/components/FormSections/OrganizationInfoSection.tsx
"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { LeadFormData } from "../Interface/AddLeadModalInterface";
import { getSelectTextColorClass } from "./LeadFormUtils";

interface OrganizationInfoSectionProps {
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
}

const OrganizationInfoSection: React.FC<OrganizationInfoSectionProps> = ({
  register,
  errors,
  watch
}) => {
  const countryValue = watch("country");

  return (
    <>
      <div className="text-bg-blue-12 font-bold text-2xl py-3">
        Organization
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Organization Name
          </label>
          <input
            {...register("organizationName", {
              required: "Organization name is required",
            })}
            placeholder="Enter name"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.organizationName && (
            <span className="text-red-500 text-sm">
              {errors.organizationName.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="email"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Country
          </label>
          <select
            {...register("country", {
              required: "Country is required",
            })}
            className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none ${getSelectTextColorClass(
              countryValue
            )}`}
          >
            <option value="" disabled>
              Select a country
            </option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationInfoSection;