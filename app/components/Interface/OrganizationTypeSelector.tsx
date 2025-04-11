// src/components/Lead/OrganizationTypeSelector.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { LeadFormData, Organization } from "./AddLeadModalInterface";

interface OrganizationTypeSelectorProps {
  createNewOrganization: boolean;
  onOrganizationSelect: () => void;
  onCreateNewOrganization: () => void;
  register: UseFormRegister<LeadFormData>;
  selectedOrganization: Organization | null;
}

const OrganizationTypeSelector: React.FC<OrganizationTypeSelectorProps> = ({
  createNewOrganization,
  onOrganizationSelect,
  onCreateNewOrganization,
  register,
  selectedOrganization
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-3">
        <div className="mr-4">
          <input
            type="radio"
            id="existingOrg"
            name="orgType"
            checked={!createNewOrganization}
            onChange={onOrganizationSelect}
            className="mr-2"
          />
          <label htmlFor="existingOrg" className="text-sm text-bg-blue-12">Select Existing Organization</label>
        </div>
        
        <div>
          <input
            type="radio"
            id="newOrg"
            name="orgType"
            checked={createNewOrganization}
            onChange={onCreateNewOrganization}
            className="mr-2"
          />
          <label htmlFor="newOrg" className="text-sm text-bg-blue-12">Create New Organization</label>
        </div>
      </div>
      
      {/* Hidden field to track if we're creating a new organization */}
      <input
        type="hidden"
        {...register("createNewOrganization")}
        value={createNewOrganization ? "true" : "false"}
      />
      
      {/* Hidden field for organization ID */}
      <input
        type="hidden"
        {...register("organizationID")}
        value={selectedOrganization?.id || ""}
      />
    </div>
  );
};

export default OrganizationTypeSelector;