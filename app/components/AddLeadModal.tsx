"use client";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "antd";
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

interface AddLeadModalProps {
  onClose: () => void;
  leadId?: string;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose, leadId }) => {
  const { register, handleSubmit, reset, setValue } = useForm<LeadFormData>({
    defaultValues: { leadStage: "NEW" },
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const { lead, loading: fetchLoading, error: fetchError } = leadId
    ? useOverallLeadsData(1, 10, undefined, undefined, undefined, undefined, leadId)
    : { lead: null, loading: false, error: null };

  const { updateLead, loading: updateLoading, error: updateError } = useUpdateLead();
  const { addLead, loading: addLoading, error: addError } = useAddLead();

  useEffect(() => {
    console.log("fetchLoading:", fetchLoading);
    console.log("fetchError:", fetchError);
    console.log("lead:", lead);
    if (!fetchLoading && !fetchError && lead) {
      setValue("firstName", lead.firstName || "");
      setValue("lastName", lead.lastName || "");
      setValue("linkedIn", lead.linkedIn || "");
      setValue("phone", lead.phone || "");
      setValue("leadSource", lead.leadSource || "");
      setValue("leadStage", lead.leadStage || "NEW");
      setValue("leadType", lead.leadType || "SMALL");
      setValue("campaignName", lead.campaign?.campaignName || "");
      setValue("initialContactDate", lead.initialContactDate || "");
      setValue("organizationName", lead.organization?.organizationName || "");
      setValue("email", lead.email || "");
      setValue("country", lead.country || "");
      console.log("Pre-filled lead data:", lead);
    }
  }, [lead, fetchLoading, fetchError, setValue]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setValue("initialContactDate", selectedDate);
  };

  const onSubmit: SubmitHandler<LeadFormData> = async (data) => {
    setLoading(true);
    try {
      if (leadId) {
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
        message.success("Lead updated successfully!");
      } else {
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
        message.success("Lead added successfully!");
      }
      reset();
      onClose();
    } catch (error: any) {
      message.error(`Failed to ${leadId ? "update" : "add"} lead: ${error.message || "Unknown error"}`);
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
                      {...register("firstName", { required: true })}
                      placeholder="Enter First name"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Last Name</label>
                    <input
                      {...register("lastName", { required: true })}
                      placeholder="Enter Last Name"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">LinkedIn Profile URL</label>
                    <input
                      {...register("linkedIn")}
                      placeholder="Link"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Contact and Campaign Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Phone</label>
                    <div className="flex">
                      <select
                        className="w-24 mr-2 px-2 py-2 border border-bg-blue-12 rounded-lg text-gray-400"
                      >
                        <option value="+91">+91</option>
                        <option value="+92">+92</option>
                      </select>
                      <input
                        {...register("phone")}
                        placeholder="9563251478"
                        className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Source</label>
                    <select
                      {...register("leadSource")}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                      <option value="" disabled>
                        Select a source
                      </option>
                      <option value="Linkedin">LinkedIn</option>
                      <option value="Upwork">Upwork</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Lead Type</label>
                    <select
                      {...register("leadType")}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                    <option value="SMALL">small</option>
                      <option value="MEDIUM">medium</option>
                      <option value="ENTERPRISE">enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Lead Type and Campaign */}
                <div className="grid grid-cols-3 gap-4">
                  
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Lead Stage</label>
                    <select
                      {...register("leadStage")}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                        <option value="NEW">Lead Created</option>
                        <option value="FOLLOW_UP">Qualified</option>
                        <option value="IN_PROGRESS">Negotiation</option>
                        <option value="CLOSED_WON">Closed Win</option>
                        <option value="CLOSED_LOST">Closed Lost</option>
                    </select>
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
                      {...register("initialContactDate")}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    />
                  </div>
                </div>

                <div className="text-bg-blue-12 font-bold text-2xl py-3">Organization</div>
                {/* Organization Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Organization Name</label>
                    <input
                      {...register("organizationName")}
                      placeholder="Enter name"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Email</label>
                    <input
                      {...register("email", { required: true })}
                      placeholder="email"
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-bg-blue-12 mb-2">Country</label>
                    <select
                      {...register("country")}
                      className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
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




