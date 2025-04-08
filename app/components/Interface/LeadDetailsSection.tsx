// src/components/FormSections/LeadDetailsSection.tsx
"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { LeadFormData, LEAD_STAGES } from "../Interface/AddLeadModalInterface";
import { getSelectTextColorClass } from "./LeadFormUtils";

interface LeadDetailsSectionProps {
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
  setValue: UseFormSetValue<LeadFormData>;
}

const LeadDetailsSection: React.FC<LeadDetailsSectionProps> = ({
  register,
  errors,
  watch,
  setValue
}) => {
  const leadStageValue = watch("leadStage");
  const campaignNameValue = watch("campaignName");
  const dateValue = watch("initialContactDate");
  
  const showLeadStageField = leadStageValue !== "DEAL";
  
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setValue("initialContactDate", selectedDate, { shouldValidate: true });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {showLeadStageField && (
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Lead Stage
          </label>
          <select
            {...register("leadStage", {
              required: "Lead stage is required",
            })}
            className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none ${getSelectTextColorClass(
              leadStageValue
            )}`}
          >
            {LEAD_STAGES.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
          {errors.leadStage && (
            <span className="text-red-500 text-sm">
              {errors.leadStage.message}
            </span>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          Name of Campaign
        </label>
        <select
          {...register("campaignName")}
          className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none ${getSelectTextColorClass(
            campaignNameValue
          )}`}
        >
          <option value="" disabled hidden>
            Select a Campaign
          </option>
          {!["Campaign", "Campaign1", "Campaign2"].includes(
            campaignNameValue
          ) &&
            campaignNameValue && (
              <option value={campaignNameValue}>
                {campaignNameValue}
              </option>
            )}
          <option value="Campaign">Campaign</option>
          <option value="Campaign1">Campaign1</option>
          <option value="Campaign2">Campaign2</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">
          Lead Date
        </label>
        <input
          type="date"
          {...register("initialContactDate", {
            required: "Lead date is required",
          })}
          onChange={handleDateChange}
          className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-black ${getSelectTextColorClass(
            dateValue
          )}`}
        />
        {errors.initialContactDate && (
          <span className="text-red-500 text-sm">
            {errors.initialContactDate.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default LeadDetailsSection;