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
      email: "",
      country: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const {
    lead,
    loading: fetchLoading,
    error: fetchError,
    refetch,
  } = useOverallLeadsData(
    1,
    10,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    leadId
  );

  const { updateLead, loading: updateLoading } = useUpdateLead();
  const { addLead, loading: addLoading } = useAddLead();

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
      setValue("email", lead.email || "");
      setValue("country", lead.country || "");

      console.log("Pre-filled lead data:", lead);
    }
  }, [lead, fetchLoading, fetchError, setValue, leadId]);

  const onSubmit = async (data: LeadFormData) => {
    try {
      if (leadId) {
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
          });
          PubSub.publish("LEAD_UPDATE_SUCCESS", {
            leadName: `${data.firstName} ${data.lastName}`,
            component: "addlead",
          });
        } catch (error) {
          PubSub.publish("LEAD_UPDATE_ERROR", {
            leadName: `${data.firstName} ${data.lastName}`,
          });
        }
      } else {
        try {
          await addLead({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            linkedIn: data.linkedIn,
            country: data.country,
            phone: data.phone,
            leadType: data.leadType,
            leadSource: data.leadSource,
            initialContactDate: data.initialContactDate,
          });
          PubSub.publish("LEAD_ADD_SUCCESS", {
            leadName: `${data.firstName} ${data.lastName}`,
          });
        } catch (error) {
          PubSub.publish("LEAD_ADD_ERROR", {
            leadName: `${data.firstName} ${data.lastName}`,
          });
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
        trigger={trigger} // pass trigger
        errors={errors}
      />
                
                <ContactInfoSection 
                  register={register} 
                  errors={errors} 
                  watch={watch} 
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