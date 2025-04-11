// src/components/Lead/OrganizationInfoSection.tsx
"use client";

import React from "react";
import ExistingOrganizationSelector from "./ExistingOrganizationSelector";
import NewOrganizationForm from "./NewOrganizationForm";
import OrganizationTypeSelector from "./OrganizationTypeSelector";
import { OrganizationInfoSectionProps } from "./AddLeadModalInterface";

const OrganizationInfoSection: React.FC<OrganizationInfoSectionProps> = ({
  register,
  errors,
  watch,
  selectedOrganization,
  onOrganizationSelect,
  onCreateNewOrganization,
  createNewOrganization
}) => {
  return (
    <>
      <div className="text-bg-blue-12 font-bold text-2xl py-3">
        Organization
      </div>
      
      <OrganizationTypeSelector 
        createNewOrganization={createNewOrganization}
        onOrganizationSelect={() => onOrganizationSelect(
          selectedOrganization?.id || "", 
          selectedOrganization?.name || "", 
          selectedOrganization?.website || ""
        )}
        onCreateNewOrganization={onCreateNewOrganization}
        register={register}
        selectedOrganization={selectedOrganization}
      />
      
      {!createNewOrganization ? (
        <ExistingOrganizationSelector
          selectedOrganization={selectedOrganization}
          onOrganizationSelect={onOrganizationSelect}
          errors={errors}
        />
      ) : (
        <NewOrganizationForm 
          register={register}
          errors={errors}
          watch={watch}
        />
      )}
    </>
  );
};

export default OrganizationInfoSection;