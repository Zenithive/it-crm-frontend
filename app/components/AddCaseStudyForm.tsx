"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddCaseStudy } from "../api/apiService/addCaseStudyApiService";
import { message } from "antd";

import Notes from "../microComponents/Notes";
import PubSub from "../pubsub/Pubsub";

// Define the interface for form data
interface CaseStudyFormData {
  projectName: string;
  clientName: string;
  // clientLocation: string;
  techStack: string;
  projectDuration: string;
  keyOutcomes: string;
  industryTarget: string;
  tags: string[];
  document: string;
  // details: string;
}

interface LeadCloseFormData {
  dealName: string;
  dealStartDate: string;
  projectRequirement: string;
  dealStatus: string;
}

type FormType = "caseStudy" | "leadClose";

interface CaseStudyPageProps {
  initialData?: CaseStudyFormData | LeadCloseFormData;
  onSubmit: (
    data: CaseStudyFormData | LeadCloseFormData,
    formType: FormType
  ) => Promise<void>;
  onClose: () => void;
  refetchCaseStudies?: () => void;
}

const AddCaseStudyForm: React.FC<CaseStudyPageProps> = ({
  initialData,
  onSubmit,
  onClose,
  refetchCaseStudies,
}) => {
  const [activeForm, setActiveForm] = useState<FormType>("caseStudy");
  const [loading, setLoading] = useState(false);

  // Form for Case Study
  const caseStudyForm = useForm<CaseStudyFormData>({
    defaultValues: initialData as CaseStudyFormData,
  });

  const {
    register: caseStudyRegister,
    handleSubmit: caseStudyHandleSubmit,
    watch: caseStudyWatch,
    setValue: caseStudySetValue,
    formState: { errors: caseStudyErrors },
  } = useForm<CaseStudyFormData>({
    defaultValues: initialData as CaseStudyFormData || {
      projectName: "",
      clientName: "",
      techStack: "",
      projectDuration: "",
      keyOutcomes: "",
      industryTarget: "",
      tags: [],
      document: "",
    },
  });

  // Form for Lead Close
  const leadCloseForm = useForm<LeadCloseFormData>({
    defaultValues: initialData as LeadCloseFormData,
  });

  const {
    register: leadCloseRegister,
    handleSubmit: leadCloseHandleSubmit,
    formState: { errors: leadCloseErrors },
  } = useForm<LeadCloseFormData>({
    defaultValues: initialData as LeadCloseFormData || {
      dealName: "",
      dealStartDate: "",
      projectRequirement: "",
      dealStatus: "",
    },
  });

  const { addCaseStudy } = useAddCaseStudy();

  const handleCaseStudySubmit: SubmitHandler<CaseStudyFormData> = async (
    data
  ) => {
    setLoading(true);
    try {
      await addCaseStudy(data);
      if (refetchCaseStudies) refetchCaseStudies();
      // No need to show success message here as it's already shown in the hook
      onClose(); // Close the form after successful submission
    } catch (error) {
      // Error is already logged and displayed in the hook
      console.error("Form submission failed:", error);
      // No need for another error message
    } finally {
      setLoading(false);
    }
  };

  const handleLeadCloseSubmit: SubmitHandler<LeadCloseFormData> = async (
    data
  ) => {
    setLoading(true);
    try {
      await onSubmit(data, "leadClose");
      // Reset form or show success message


      PubSub.publish("CASESTUDY_ADD_SUCCESS", { 
          
      component:"casestudy"

      
      });
    } catch (error) {
      console.error("Failed to submit lead close:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Case Study Form */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
        onClick={onClose} // Close modal when clicking outside
      >
        {activeForm === "caseStudy" && (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-[900px] "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-indigo-500 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">
                Case Study Form
              </h2>
              <button className="bg-white p-2 rounded-lg" onClick={onClose}>
                <img src="cross_icon.svg" alt="Cross" className="h-3 w-3"></img>
              </button>
            </div>

            <form
              onSubmit={caseStudyHandleSubmit(handleCaseStudySubmit)}
              className="p-6"
            >
              <div className="grid grid-cols-2 gap-2">
                {/* Project Name */}
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...caseStudyRegister("projectName", {
                      required: "Project name is required",
                      minLength: { value: 2, message: "Minimum 2 characters required" },
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.projectName && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.projectName.message}
                    </span>
                  )}
                </div>

                {/* Client Name */}
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    {...caseStudyRegister("clientName", {
                      required: "Client name is required",
                      minLength: { value: 2, message: "Minimum 2 characters required" },
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.clientName && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.clientName.message}
                    </span>
                  )}
                </div>

                {/* Client Location */}
                {/* <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Client Location
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    {...caseStudyForm.register("clientLocation")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div> */}

                {/* Project Duration */}
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Project Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Duration (e.g., 3 months)"
                    {...caseStudyRegister("projectDuration", {
                      required: "Project duration is required",
                      pattern: {
                        value: /^[0-9]+(\s*(months?|years?|days?))?$/i,
                        message: "Enter a valid duration (e.g., '3 months')",
                      },
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.projectDuration && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.projectDuration.message}
                    </span>
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    placeholder="Tech (e.g., React, Node.js)"
                    {...caseStudyRegister("techStack", {
                      required: "Tech stack is required",
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.techStack && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.techStack.message}
                    </span>
                  )}
                </div>

                {/* Industry Targeted */}
               <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Industry Targeted
                  </label>
                  <input
                    type="text"
                    placeholder="Targeted Industry"
                    {...caseStudyRegister("industryTarget", {
                      required: "Industry target is required",
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.industryTarget && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.industryTarget.message}
                    </span>
                  )}
                </div>

                {/* Document */}
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Industry Targeted
                  </label>
                  <input
                    type="text"
                    placeholder="Targeted Industry"
                    {...caseStudyRegister("industryTarget", {
                      required: "Industry target is required",
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.industryTarget && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.industryTarget.message}
                    </span>
                  )}
                </div>

                {/* Searchable Tags */}
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Searchable Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    {...caseStudyRegister("tags", {
                      required: "At least one tag is required",
                      setValueAs: (value) => {
                        if (!value || typeof value !== "string") return [];
                        return value.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
                      },
                      validate: (value) =>
                        (value && value.length > 0) || "At least one valid tag is required",
                    })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyErrors.tags && (
                    <span className="text-red-500 text-sm">
                      {caseStudyErrors.tags.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-md text-bg-blue-12 font-medium mb-2">
                  Key Outcomes
                </label>
                <Notes
                  vendorId={"1"}
                  value={caseStudyWatch("keyOutcomes") || ""}
                  onChange={(value) =>
                    caseStudySetValue("keyOutcomes", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                <input
                  type="hidden"
                  {...caseStudyRegister("keyOutcomes", {
                    required: "Key outcomes are required",
                    minLength: { value: 10, message: "Minimum 10 characters required" },
                  })}
                />
                {caseStudyErrors.keyOutcomes && (
                  <span className="text-red-500 text-sm">
                    {caseStudyErrors.keyOutcomes.message}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-bg-blue-12 text-white rounded-lg font-medium"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeForm === "leadClose" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-500 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Lead Close Form</h2>
              <button className="bg-white p-2 rounded-lg" onClick={onClose}>
                <img src="cross_icon.svg" alt="Close" className="h-3 w-3" />
              </button>
            </div>

            <form
              onSubmit={leadCloseHandleSubmit(handleLeadCloseSubmit)}
              className="p-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Deal Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...leadCloseRegister("dealName", {
                      required: "Deal name is required",
                      minLength: { value: 2, message: "Minimum 2 characters required" },
                    })}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {leadCloseErrors.dealName && (
                    <span className="text-red-500 text-sm">
                      {leadCloseErrors.dealName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Deal Start Date
                  </label>
                  <input
                    type="date"
                    {...leadCloseRegister("dealStartDate", {
                      required: "Deal start date is required",
                    })}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {leadCloseErrors.dealStartDate && (
                    <span className="text-red-500 text-sm">
                      {leadCloseErrors.dealStartDate.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Project Requirement
                  </label>
                  <input
                    type="text"
                    placeholder="Project requirements"
                    {...leadCloseRegister("projectRequirement", {
                      required: "Project requirement is required",
                      minLength: { value: 5, message: "Minimum 5 characters required" },
                    })}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {leadCloseErrors.projectRequirement && (
                    <span className="text-red-500 text-sm">
                      {leadCloseErrors.projectRequirement.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Deal Status
                  </label>
                  <select
                    {...leadCloseRegister("dealStatus", {
                      required: "Deal status is required",
                    })}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" disabled>Select status</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED_WON">Closed Won</option>
                    <option value="CLOSED_LOST">Closed Lost</option>
                  </select>
                  {leadCloseErrors.dealStatus && (
                    <span className="text-red-500 text-sm">
                      {leadCloseErrors.dealStatus.message}
                    </span>
                  )}
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCaseStudyForm;