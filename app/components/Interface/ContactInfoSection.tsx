// src/components/FormSections/ContactInfoSection.tsx
"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { LeadFormData } from "../Interface/AddLeadModalInterface";
import { getSelectTextColorClass } from "./LeadFormUtils";

interface ContactInfoSectionProps {
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  register,
  errors,
  watch
}) => {
  const leadSourceValue = watch("leadSource");
  const leadTypeValue = watch("leadType");

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          Phone
        </label>
        <div className="flex">
          <select
            className="w-12 mr-2 py-2 border border-bg-blue-12 rounded-lg text-black text-sm focus:outline-none"
          >
            <option value="+91">+91</option>
            <option value="+92">+92</option>
          </select>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
            placeholder="9563251478"
            className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
        </div>
        {errors.phone && (
          <span className="text-red-500 text-sm">
            {errors.phone.message}
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          Source
        </label>
        <select
          {...register("leadSource", {
            required: "Lead source is required",
          })}
          className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none ${getSelectTextColorClass(
            leadSourceValue
          )}`}
        >
          <option value="" disabled>
            Select a source
          </option>
          <option value="Linkedin">LinkedIn</option>
          <option value="Upwork">Upwork</option>
        </select>
        {errors.leadSource && (
          <span className="text-red-500 text-sm">
            {errors.leadSource.message}
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          Lead Type
        </label>
        <select
          {...register("leadType", {
            required: "Lead type is required",
          })}
          className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none ${getSelectTextColorClass(
            leadTypeValue
          )}`}
        >
          <option value="SMALL">small</option>
          <option value="MEDIUM">medium</option>
          <option value="ENTERPRISE">enterprise</option>
        </select>
        {errors.leadType && (
          <span className="text-red-500 text-sm">
            {errors.leadType.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ContactInfoSection;