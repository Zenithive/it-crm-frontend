"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Controller, UseFormRegister, FieldErrors, UseFormWatch, Control } from "react-hook-form";
import { LeadFormData } from "../Interface/AddLeadModalInterface";
import { isValidPhoneNumber } from "libphonenumber-js";
import { getSelectTextColorClass } from "./LeadFormUtils";

interface ContactInfoSectionProps {
  control: Control<LeadFormData>;
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  control,
  register,
  errors,
  watch,
}) => {
  const leadSourceValue = watch("leadSource");
  const leadTypeValue = watch("leadType");

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Phone */}
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">Phone</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Phone number is required",
            validate: value =>
              isValidPhoneNumber(value || "") || "Enter a valid phone number",
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              international
              defaultCountry="IN"
              className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg text-sm"
            />
          )}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">Source</label>
        <select
          {...register("leadSource", {
            required: "Lead source is required",
          })}
          className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none ${getSelectTextColorClass(
            leadSourceValue
          )}`}
        >
          <option value="" disabled>Select a source</option>
          <option value="LINKEDIN">LinkedIn</option>
          <option value="UPWORK">Upwork</option>
          <option value="WEBSITE">Website Form</option>
          <option value="CALL">Direct Call</option>
          <option value="REFERRAL">Referral</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.leadSource && (
          <span className="text-red-500 text-sm">{errors.leadSource.message}</span>
        )}
      </div>

      {/* Lead Type */}
      <div>
        <label className="block text-sm text-bg-blue-12 mb-2">Lead Type</label>
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
          <span className="text-red-500 text-sm">{errors.leadType.message}</span>
        )}
      </div>
    </div>
  );
};

export default ContactInfoSection;
