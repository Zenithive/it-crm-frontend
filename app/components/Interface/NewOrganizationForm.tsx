import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import FormField from "./FormField";
import { LeadFormData } from "./AddLeadModalInterface";
import CountryDropdown from "./CountryDropdown";


interface NewOrganizationFormProps {
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
}

const NewOrganizationForm: React.FC<NewOrganizationFormProps> = ({
  register,
  errors,
  watch
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Organization Name"
          name="organizationName"
          register={register}
          validation={{ required: "Organization name is required" }}
          errors={errors}
          placeholder="Enter name"
        />
        
        <FormField
          label="Organization Email"
          name="organizationEmail"
          register={register}
          validation={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          }}
          errors={errors}
          placeholder="Enter organization email"
        />
        
        <FormField
          label="Organization Website"
          name="organizationWebsite"
          register={register}
          validation={{
            pattern: {
              value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
              message: "Enter a valid website URL",
            },
          }}
          errors={errors}
          placeholder="Enter website URL"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <FormField
          label="Organization LinkedIn"
          name="organizationLinkedIn"
          register={register}
          validation={{
            pattern: {
              value: /^(https?:\/\/)?(www\.)?linkedin\.com\/(company)\/[\w-]+\/?$/,
              message: "Enter a valid LinkedIn company URL",
            },
          }}
          errors={errors}
          placeholder="Enter LinkedIn company URL"
        />
        
        <FormField
          label="Annual Revenue"
          name="annualRevenue"
          register={register}
          errors={errors}
          placeholder="Enter annual revenue"
        />
        
        <FormField
          label="Number of Employees"
          name="noOfEmployees"
          register={register}
          errors={errors}
          placeholder="Enter number of employees"
          type="number"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <FormField
          label="City"
          name="city"
          register={register}
          errors={errors}
          placeholder="Enter city"
        />

        <CountryDropdown
          label="Organization Country"
          name="orgCountry"
          register={register}
          watch={watch}
          errors={errors}
        />
        
        <CountryDropdown
          label="Country"
          name="country"
          register={register}
          watch={watch}
          errors={errors}
          validation={{ required: "Country is required" }}
        />
      </div>
    </>
  );
};

export default NewOrganizationForm;