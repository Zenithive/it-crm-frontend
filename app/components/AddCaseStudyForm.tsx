"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the interface for form data
interface CaseStudyFormData {
  projectName: string;
  clientName: string;
  clientLocation: string;
  projectDuration: string;
  techStack: string;
  industryTargeted: string;
  document: string;
  searchableTags: string;
  keyOutcomes: string;
  details: string;
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
  onSubmit: (data: CaseStudyFormData | LeadCloseFormData, formType: FormType) => Promise<void>;
  onClose: () => void;
}

const AddCaseStudyForm: React.FC<CaseStudyPageProps> = ({ initialData, onSubmit , onClose }) => {
  const [activeForm, setActiveForm] = useState<FormType>("caseStudy");
  const [loading, setLoading] = useState(false);
  
  // Form for Case Study
  const caseStudyForm = useForm<CaseStudyFormData>({
    defaultValues: initialData as CaseStudyFormData
  });

  // Form for Lead Close
  const leadCloseForm = useForm<LeadCloseFormData>({
    defaultValues: initialData as LeadCloseFormData
  });

  const handleCaseStudySubmit: SubmitHandler<CaseStudyFormData> = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data, "caseStudy");
      // Reset form or show success message
    } catch (error) {
      console.error("Failed to submit case study:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadCloseSubmit: SubmitHandler<LeadCloseFormData> = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data, "leadClose");
      // Reset form or show success message
    } catch (error) {
      console.error("Failed to submit lead close:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Case Study Form */}
        {activeForm === "caseStudy" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
            <div className="bg-indigo-500 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Case Study Form</h2>
              <button className="bg-white p-2 rounded-lg"  onClick={onClose} >
              <img src="cross_icon.svg" alt="Cross" className="h-3 w-3"></img>
              </button>
            </div>

            <form onSubmit={caseStudyForm.handleSubmit(handleCaseStudySubmit)} className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {/* Project Name */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...caseStudyForm.register("projectName", { required: true })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyForm.formState.errors.projectName && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>

                {/* Client Name */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    {...caseStudyForm.register("clientName", { required: true })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {caseStudyForm.formState.errors.clientName && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>

                {/* Client Location */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Client Location
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    {...caseStudyForm.register("clientLocation")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Project Duration */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Project Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Duration"
                    {...caseStudyForm.register("projectDuration")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    placeholder="Tech"
                    {...caseStudyForm.register("techStack")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Industry Targeted */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Industry Targeted
                  </label>
                  <input
                    type="text"
                    placeholder="Targeted"
                    {...caseStudyForm.register("industryTargeted")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Document */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Document
                  </label>
                  <input
                    type="text"
                    placeholder="Document"
                    {...caseStudyForm.register("document")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Searchable Tags */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Searchable Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Tags"
                    {...caseStudyForm.register("searchableTags")}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="mt-2">
                <label className="block text-md text-indigo-600 font-medium mb-2">
                  Key Outcomes
                </label>
                <textarea
                  placeholder="Enter key outcomes..."
                  {...caseStudyForm.register("keyOutcomes")}
                  rows={3}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              {/* Details */}
              <div className="mt-2">
                <label className="block text-md text-indigo-600 font-medium mb-2">
                  Details
                </label>
                <textarea
                  placeholder="Enter details..."
                  {...caseStudyForm.register("details")}
                  rows={3}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              {/* Save Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lead Close Form */}
        {activeForm === "leadClose" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-500 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Lead Close Form</h2>
              <button className="bg-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={leadCloseForm.handleSubmit(handleLeadCloseSubmit)} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Deal Name */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Deal Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...leadCloseForm.register("dealName", { required: true })}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {leadCloseForm.formState.errors.dealName && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>

                {/* Deal Start Date */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Deal Start Date
                  </label>
                  <input
                    type="date"
                    placeholder="Start date"
                    {...leadCloseForm.register("dealStartDate", { required: true })}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {leadCloseForm.formState.errors.dealStartDate && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>

                {/* Project Requirement */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Project Requirement
                  </label>
                  <input
                    type="text"
                    placeholder="Project"
                    {...leadCloseForm.register("projectRequirement")}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Deal Status */}
                <div>
                  <label className="block text-md text-indigo-600 font-medium mb-2">
                    Deal Status
                  </label>
                  <input
                    type="text"
                    placeholder="Deal"
                    {...leadCloseForm.register("dealStatus")}
                    className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
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