// src/components/common/FormField.tsx
import React from "react";
import { FieldErrors, UseFormRegister, RegisterOptions } from "react-hook-form";
import { LeadFormData } from "./AddLeadModalInterface";
// import { LeadFormData } from "../../interfaces/AddLeadModalInterface";

interface FormFieldProps {
  label: string;
  name: keyof LeadFormData;
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  placeholder?: string;
  type?: string;
  validation?: RegisterOptions<LeadFormData, keyof LeadFormData>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  validation
}) => {
  return (
    <div>
      <label className="block text-sm text-bg-blue-12 mb-2">
        {label}
      </label>
      <input
        {...register(name, validation)}
        placeholder={placeholder}
        type={type}
        className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormField;