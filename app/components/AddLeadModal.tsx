"use client";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "antd";
import PubSub from "../pubsub/Pubsub";
import { useUpdateLead } from "../api/apiService/OverallLeadApiService";
import { useAddLead } from "../api/apiService/addLeadModalApiService";
import useOverallLeadsData from "../api/apiService/OverallLeadApiService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

interface LeadFormData {
  firstName: string;
  lastName: string;
  linkedIn: string;
  phone: string;
  leadSource: string;
  leadStage: string;
  leadType: string;
  campaignName: string;
  initialContactDate: string;
  organizationName: string;
  email: string;
  country: string;
}

const LEAD_STAGES = [
  { value: "NEW", label: "Lead Created" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "NEGOTIATION", label: "Negotiation" },
  { value: "CLOSED_WON", label: "Closed Win" },
  { value: "CLOSED_LOST", label: "Closed Lost" },
];

interface AddLeadModalProps {
  onClose: () => void;
  leadId?: string;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose, leadId }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  const { lead, loading: fetchLoading, error: fetchError, refetch } = useOverallLeadsData(
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
      const formattedDate = lead.initialContactDate
        ? new Date(lead.initialContactDate).toISOString().split("T")[0]
        : "";
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setValue("initialContactDate", selectedDate, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<LeadFormData> = async (data) => {
    // setLoading(true);
    try {
      if (leadId) {
        console.log("Updating lead with data:", data);

        try{  const updatedLead = await updateLead(leadId, {
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
        
        });}
        catch(error){
          PubSub.publish("LEAD_UPDATE_ERROR", { 
          
            leadName: `${data.firstName} ${data.lastName}`,
          
          });

        }
      
        
      } else {

        try{
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
        
        });}catch(error){
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
                {/* Personal Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">First Name</label>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: { value: 2, message: "Minimum 2 characters required" },
                      })}
                      placeholder="Enter First name"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Last Name</label>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: { value: 2, message: "Minimum 2 characters required" },
                      })}
                      placeholder="Enter Last Name"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">LinkedIn Profile URL</label>
                    <input
                      {...register("linkedIn", {
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                          message: "Enter a valid LinkedIn URL",
                        },
                      })}
                      placeholder="Link"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                    {errors.linkedIn && (
                      <span className="text-red-500 text-sm">{errors.linkedIn.message}</span>
                    )}
                  </div>
                </div>

                {/* Contact and Campaign Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Phone</label>
                    <div className="flex">
                      <select
                        className="w-12 mr-2 py-2 border border-bg-blue-12 rounded-lg text-gray-400 text-sm focus:outline-none"
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
                      <span className="text-red-500 text-sm">{errors.phone.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Source</label>
                    <select
                      {...register("leadSource", { required: "Lead source is required" })}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                      <option value="" disabled>
                        Select a source
                      </option>
                      <option value="Linkedin">LinkedIn</option>
                      <option value="Upwork">Upwork</option>
                    </select>
                    {errors.leadSource && (
                      <span className="text-red-500 text-sm">{errors.leadSource.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Lead Type</label>
                    <select
                      {...register("leadType", { required: "Lead type is required" })}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
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

                {/* Lead Stage and Campaign */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Lead Stage</label>
                    <select
                      {...register("leadStage", { required: "Lead stage is required" })}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                      {LEAD_STAGES.map((stage) => (
                        <option key={stage.value} value={stage.value}>
                          {stage.label}
                        </option>
                      ))}
                    </select>
                    {errors.leadStage && (
                      <span className="text-red-500 text-sm">{errors.leadStage.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Name of Campaign</label>
                    <select
                      {...register("campaignName")}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                      <option value="Campaign">Campaign</option>
                      <option value="Campaign1">Campaign1</option>
                      <option value="Campaign2">Campaign2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Lead Date</label>
                    <input
                      type="date"
                      {...register("initialContactDate", { required: "Lead date is required" })}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    />
                    {errors.initialContactDate && (
                      <span className="text-red-500 text-sm">{errors.initialContactDate.message}</span>
                    )}
                  </div>
                </div>

                <div className="text-bg-blue-12 font-bold text-2xl py-3">Organization</div>
                {/* Organization Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Organization Name</label>
                    <input
                      {...register("organizationName", {
                        required: "Organization name is required",
                      })}
                      placeholder="Enter name"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                    {errors.organizationName && (
                      <span className="text-red-500 text-sm">{errors.organizationName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      placeholder="email"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Country</label>
                    <select
                      {...register("country", { required: "Country is required" })}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                    {errors.country && (
                      <span className="text-red-500 text-sm">{errors.country.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-5">
                <button
                  type="submit"
                  className="w-full py-2 bg-bg-blue-12 text-white rounded-lg"
                  disabled={loading || updateLoading || addLoading}
                >
                  {loading || updateLoading || addLoading ? "Saving..." : "Save"}
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