// src/components/AddLeadModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import PubSub from "../pubsub/Pubsub";
import { useUpdateLead } from "../api/apiService/OverallLeadApiService";
import { useAddLead } from "../api/apiService/addLeadModalApiService";
import useOverallLeadsData from "../api/apiService/OverallLeadApiService";
import { RootState } from "../redux/store/store";
import { AddLeadModalProps, LeadFormData } from "./Interface/AddLeadModalInterface";

// Import form sections
import PersonalInfoSection from "./Interface/PersonalInfoSection";
import ContactInfoSection from "./Interface/ContactInfoSection";
import LeadDetailsSection from "./Interface/LeadDetailsSection";
import OrganizationInfoSection from "./Interface/OrganizationInfoSection";
import { formatDate } from "./Interface/LeadFormUtils";


const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose, leadId }) => {
  const {
    register,
    trigger,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: {
      leadStage: "NEW",
      leadType: "SMALL",
      firstName: "",
      lastName: "",
      linkedIn: "",
      phone: "",
      leadSource: "",
      campaignName: "",
      initialContactDate: "",
      organizationName: "",
      organizationWebsite: "",
      email: "",
      country: "",
      organizationID: "", // Added for existing organization
      createNewOrganization: false, // Flag to track if we should create a new organization
    },
  });

  const [loading, setLoading] = useState(false);
  const { token, id: userID } = useSelector((state: RootState) => state.auth);
  const [selectedOrganization, setSelectedOrganization] = useState<{ id: string, name: string, website : string } | null>(null);

  const overallLeadData = leadId
    ? useOverallLeadsData(
        1,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        leadId
      )
    : { lead: null, loading: false, error: null, refetch: () => {} };

  const { lead, loading: fetchLoading, error: fetchError, refetch } = overallLeadData;

  const { updateLead, loading: updateLoading } = useUpdateLead();
  const { addLead, loading: addLoading } = useAddLead();

  // Watch for createNewOrganization value
  const createNewOrganization = watch("createNewOrganization");
  const organizationName = watch("organizationName");
  const organizationWebsite = watch("organizationWebsite");

  useEffect(() => {
    if (leadId && !fetchLoading && !fetchError && lead) {
      const formattedDate = formatDate(lead.initialContactDate);
      
      setValue("firstName", lead.firstName || "");
      setValue("lastName", lead.lastName || "");
      setValue("linkedIn", lead.linkedIn || "");
      setValue("phone", lead.phone || "");
      setValue("leadSource", lead.leadSource || "");
      setValue("leadStage", lead.leadStage || "NEW");
      setValue("leadType", lead.leadType || "SMALL");
      setValue("campaignName", lead.campaign?.campaignName || "");
      setValue("initialContactDate", formattedDate);
      setValue("organizationName", lead.organization?.organizationName || "");
      setValue("organizationWebsite", lead.organization?.organizationWebsite || "");
      setValue("email", lead.email || "");
      setValue("country", lead.country || "");
      
      // Set organization ID for existing organization
      if (lead.organization?.organizationID) {
        setValue("organizationID", lead.organization.organizationID);
        setSelectedOrganization({
          id: lead.organization.organizationID,
          name: lead.organization.organizationName,
          website: lead.organization.organizationWebsite,
        });
        setValue("createNewOrganization", false);
      }

      console.log("Pre-filled lead data:", lead);
    }
  }, [lead, fetchLoading, fetchError, setValue, leadId]);

  // Handle organization selection
  const handleOrganizationSelect = (organizationID: string, organizationName: string, organizationWebsite:string) => {
    setValue("organizationID", organizationID);
    setSelectedOrganization({ id: organizationID, name: organizationName, website: organizationWebsite });
    setValue("organizationWebsite", organizationWebsite);
    setValue("createNewOrganization", false);
  };

  // Handle new organization creation
  const handleCreateNewOrganization = () => {
    setValue("organizationID", "");
    setSelectedOrganization(null);
    setValue("createNewOrganization", true);
  };

  const onSubmit = async (data: LeadFormData) => {

    console.log("Full form data in onSubmit:", data);
  console.log("Organization specific fields:", {
    annualRevenue: data.annualRevenue,
    city: data.city,
    noOfEmployees: data.noOfEmployees,
    organizationLinkedIn: data.organizationLinkedIn,
    organizationWebsite: data.organizationWebsite
  });
    setLoading(true);
    try {
      if (leadId) {
        // Update existing lead
        console.log("Updating lead with data:", data);

        try {
          await updateLead(leadId, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            linkedIn: data.linkedIn,
            country: data.country,
            phone: data.phone,
            leadSource: data.leadSource,
            leadStage: data.leadStage,
            leadType: data.leadType,
            initialContactDate: data.initialContactDate,
            // If organization was changed, include the ID
            ...(data.organizationID && { organizationID: data.organizationID }),
          });
          PubSub.publish("LEAD_UPDATE_SUCCESS", {
            leadName: `${data.firstName} ${data.lastName}`,
            component: "addlead",
          });
        } catch (error) {
          PubSub.publish("LEAD_UPDATE_ERROR", {
            leadName: `${data.firstName} ${data.lastName}`,
          });
          throw error;
        }
      } else {
        // Create new lead
        try {
          const leadData: any = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            linkedIn: data.linkedIn,
            country: data.country,
            phone: data.phone,
            leadType: data.leadType,
            leadSource: data.leadSource,
            leadStage: data.leadStage,
            initialContactDate: data.initialContactDate,
          };

          // If using existing organization
          if (!data.createNewOrganization && data.organizationID) {
            leadData.organizationID = data.organizationID;
          }
          // If creating new organization
          else if (data.createNewOrganization && data.organizationName) {
            // Add the organization name to create a new organization
            leadData.organizationName = data.organizationName;
            leadData.organizationWebsite = data.organizationWebsite || "";
            leadData.organizationEmail = data.organizationEmail || data.email || "";
            leadData.organizationLinkedIn = data.organizationLinkedIn || "";
            leadData.city = data.city || "";
            leadData.orgCountry = data.orgCountry || data.country || "";
            leadData.noOfEmployees = data.noOfEmployees || "";
            leadData.annualRevenue = data.annualRevenue || "";
          }

          // Add campaign ID if selected
          if (data.campaignName) {
            // Here you would typically lookup the campaign ID based on the name
            // For now, we'll assume there's a mapping or API call to fetch this
            // leadData.campaignID = getCampaignIdByName(data.campaignName);
            
            // Example hardcoded ID for now (should be replaced with actual lookup)
            leadData.campaignID = "ff823c53-d9f9-4a77-817a-88e258828619";
          }

          console.log("Creating new lead with data:", leadData);
          await addLead(leadData);
          
          PubSub.publish("LEAD_ADD_SUCCESS", {
            leadName: `${data.firstName} ${data.lastName}`,
          });
        } catch (error) {
          PubSub.publish("LEAD_ADD_ERROR", {
            leadName: `${data.firstName} ${data.lastName}`,
          });
          throw error;
        }
      }
      reset();
      onClose();
    } catch (error: any) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div className="p-6 relative" onClick={(e) => e.stopPropagation()}>
        <div className="bg-bg-blue-12 rounded-t-xl p-2 flex justify-between">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">
              {leadId ? "Edit Lead" : "Lead Form"}
            </h2>
          </div>
          <div className="p-2">
            <button
              className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
              onClick={onClose}
            >
              <img src="/cross_icon.svg" alt="Cross" className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full max-w-4xl">
          {fetchLoading ? (
            <div className="p-6">Loading lead data...</div>
          ) : fetchError ? (
            <div className="p-6">Error loading lead data: {fetchError}</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="space-y-2">
                <PersonalInfoSection
                  register={register}
                  trigger={trigger}
                  errors={errors}
                />
                
                <ContactInfoSection 
                  register={register} 
                  errors={errors} 
                  watch={watch} 
                  control={control} 
                />
                
                <LeadDetailsSection 
                  register={register} 
                  errors={errors} 
                  watch={watch} 
                  setValue={setValue}
                />
                
                <OrganizationInfoSection 
                  register={register} 
                  errors={errors} 
                  watch={watch}
                  selectedOrganization={selectedOrganization}
                  onOrganizationSelect={(id: string, name: string, website: string) => handleOrganizationSelect(id, name, website)}
                  onCreateNewOrganization={handleCreateNewOrganization}
                  createNewOrganization={createNewOrganization ?? false}
                />
              </div>

              <div className="flex space-x-4 mt-5">
                <button
                  type="submit"
                  className="w-full py-2 bg-bg-blue-12 text-white rounded-lg"
                  disabled={loading || updateLoading || addLoading}
                >
                  {loading || updateLoading || addLoading
                    ? "Saving..."
                    : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;