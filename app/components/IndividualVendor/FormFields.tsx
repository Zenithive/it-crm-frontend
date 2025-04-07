import React from "react";
import { UseFormRegister, FieldErrors, Control, UseFormSetValue } from "react-hook-form";
import { VendorFormData } from "./VendorFormInterface";
import { CountrySelection } from "./CountrySelection";

interface FormFieldsProps {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
  control: Control<VendorFormData>;
  setValue: UseFormSetValue<VendorFormData>;
  
}

const FormFields: React.FC<FormFieldsProps> = ({ register, errors, control, setValue }) => {

  const getSelectTextColorClass = (value: string | undefined) => {
    return value ? "text-black" : "text-gray-400";
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-bg-blue-12 mb-1">Company Name</label>
          <input
            {...register("companyName", {
              required: "Company name is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            type="text"
            placeholder="Enter name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
          />
          {errors.companyName && (
            <span className="text-red-500 text-sm">{errors.companyName.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-bg-blue-12 mb-1">Address</label>
          <input
            {...register("address", {
              required: "Address is required",
              minLength: { value: 5, message: "Minimum 5 characters required" },
            })}
            type="text"
            placeholder="Address"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address.message}</span>
          )}
        </div>
        <div>
          <CountrySelection
            register={register}
            setValue={setValue}
            control={control}
            errors={errors}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-bg-blue-12 mb-1">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
          >
            <option value="" disabled>Select Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">{errors.status.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-bg-blue-12 mb-1">Vendor Skills</label>
          <select
            {...register("vendorSkills", { required: "Vendor skills are required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
          >
            <option value="" disabled>Select Skills</option>
            <option value="GOLANG">Golang</option>
            <option value="POSTGRESQL">PostgreSQL</option>
          </select>
          {errors.vendorSkills && (
            <span className="text-red-500 text-sm">{errors.vendorSkills.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-bg-blue-12 mb-1">Payment Terms</label>
          <select
            {...register("paymentTerms", { required: "Payment terms are required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
          >
            <option value="" disabled>Select Terms</option>
            <option value="NET_30">NET 30</option>
            <option value="NET_60">NET 60</option>
            <option value="NET_90">NET 90</option>
          </select>
          {errors.paymentTerms && (
            <span className="text-red-500 text-sm">{errors.paymentTerms.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-bg-blue-12 mb-1">VAT/GST</label>
          <input
            {...register("gstOrVatDetails", {
              pattern: {
                value: /^[A-Z0-9]{5,15}$/,
                message: "Enter a valid GST/VAT number (5-15 alphanumeric characters)",
              },
            })}
            type="text"
            placeholder="GST or VAT Number"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
          />
          {errors.gstOrVatDetails && (
            <span className="text-red-500 text-sm">{errors.gstOrVatDetails.message}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default FormFields;