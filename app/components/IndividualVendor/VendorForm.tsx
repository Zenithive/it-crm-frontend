"use client";

import React, { useState, useRef, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useCreateVendor } from "../../api/apiService/addVendorApiService";
import { useVendors } from "../../api/apiService/overallvendorApiService";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Minus,
  Check,
} from "lucide-react";
import { CountrySelection } from "./CountrySelection";
import PerformanceFormModal from "./PerformanceModal";
import PubSub from "../../pubsub/Pubsub";

interface PerformanceRatingData {
  pastProjectsCount: number;
  rating: number;
  review: string;
}

interface VendorFormData {
  companyName: string;
  address: string;
  status: string;
  vendorSkills: string;
  paymentTerms: string;
  gstOrVatDetails: string;
  performanceRatings: PerformanceRatingData[];
  notes: string;
  country: string;
  vendorDetails: VendorDetail[];
}

interface VendorDetail {
  name: string;
  contact: string;
  number: string;
  designation: string;
}

interface AddVendorFormProps {
  onClose: () => void;
  vendorData?: CompanyProfile | null;
  vendorId?: string;
  refetchVendors?: () => void;
}

interface CompanyProfile {
  companyName: string;
  status: string;
  address: string;
  skills: Array<{ skillID: string; name: string; description?: string }>;
  paymentTerms: string;
  gstOrVatDetails?: string;
  notes?: string;
  primaryContact?: {
    email: string;
    phone: string;
    location: string;
  };
  performanceRatings?: PerformanceRatingData[];
}

const VendorForm: React.FC<AddVendorFormProps> = ({ onClose, vendorData, vendorId, refetchVendors }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<VendorFormData>({
    defaultValues: vendorData && vendorId ? {
      companyName: vendorData.companyName || "",
      address: vendorData.address || "",
      status: vendorData.status || "ACTIVE",
      vendorSkills: vendorData.skills && vendorData.skills.length > 0 ? vendorData.skills[0].name : "",
      paymentTerms: vendorData.paymentTerms || "",
      gstOrVatDetails: vendorData.gstOrVatDetails || "",
      performanceRatings: vendorData.performanceRatings || [],
      notes: vendorData.notes || "",
      country: vendorData.primaryContact?.location || "",
      vendorDetails: [{ name: "", contact: "", number: "", designation: "" }],
    } : {
      companyName: "",
      address: "",
      status: "ACTIVE",
      vendorSkills: "",
      paymentTerms: "NET30",
      gstOrVatDetails: "",
      performanceRatings: [],
      notes: "",
      country: "",
      vendorDetails: [{ name: "", contact: "", number: "", designation: "" }],
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [performanceRatings, setPerformanceRatings] = useState<PerformanceRatingData[]>(vendorData?.performanceRatings || []);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const { createVendor, loading: mutationLoading } = useCreateVendor();
  const { updateVendor, loading: updateLoading } = useVendors();
  const isEditMode = !!vendorData && !!vendorId;

  useEffect(() => {
    if (isEditMode && vendorData) {
      const skillName = vendorData.skills && vendorData.skills.length > 0 
        ? vendorData.skills[0].name.toUpperCase()
        : "";
      reset({
        companyName: vendorData.companyName || "",
        address: vendorData.address || "",
        status: vendorData.status || "ACTIVE",
        vendorSkills: skillName,
        paymentTerms: vendorData.paymentTerms || "NET30",
        gstOrVatDetails: vendorData.gstOrVatDetails || "",
        performanceRatings: vendorData.performanceRatings || [],
        notes: vendorData.notes || "",
        country: vendorData.primaryContact?.location || "",
        vendorDetails: [{ name: "", contact: "", number: "", designation: "" }],
      });
      setPerformanceRatings(vendorData.performanceRatings || []);
      if (noteRef.current) noteRef.current.innerHTML = vendorData.notes || "";
    }
  }, [vendorData, setValue, isEditMode, reset]);

  const applyFormat = (command: string, value: string = "") => {
    if (noteRef.current) {
      noteRef.current.focus();
      document.execCommand(command, false, value);
      setValue("notes", noteRef.current.innerHTML, { shouldValidate: true });
    }
  };

  const applyListFormat = (command: string) => {
    if (noteRef.current) {
      noteRef.current.focus();
      if (noteRef.current.innerHTML.trim() === "") {
        noteRef.current.innerHTML = "<p><br></p>";
      }
      document.execCommand(command, false, "");
      setValue("notes", noteRef.current.innerHTML, { shouldValidate: true });
    }
  };

  const handleNoteChange = () => {
    if (noteRef.current) {
      setValue("notes", noteRef.current.textContent || "", { shouldValidate: true });
    }
  };

  const getSkillIDs = (skill: string): string[] => {
    switch (skill) {
      case "Golang":
      case "GOLANG":
        return ["a442dcee-2ea7-4f25-b710-99a8e6411be7"];
      case "PostgreSQL":
      case "POSTGRESQL":
        return ["0b73f7ea-a3e8-44f4-93bd-648fc8e57275"];
      default:
        return [];
    }
  };

  const addPerformance = (data: PerformanceRatingData) => {
    const newPerformanceRatings = [...performanceRatings, data];
    setPerformanceRatings(newPerformanceRatings);
    setValue("performanceRatings", newPerformanceRatings, { shouldValidate: true });
  };

  const mapFormDataToMutationInput = (data: VendorFormData) => {
    return {
      companyName: data.companyName,
      status: data.status,
      paymentTerms: data.paymentTerms,
      address: data.address || "",
      gstOrVatDetails: data.gstOrVatDetails || "",
      notes: data.notes || "",
      skillIDs: getSkillIDs(data.vendorSkills),
      country: data.country,
      performanceRatings: data.performanceRatings.map((perf) => ({
        pastProjectsCount: perf.pastProjectsCount,
        rating: perf.rating,
        review: perf.review,
      })),
    };
  };

  const onSubmit: SubmitHandler<VendorFormData> = async (data) => {
    setLoading(true);
    try {
      const mutationInput = mapFormDataToMutationInput(data);
      console.log("Mutation Input:", mutationInput);
      if (isEditMode) {
        await updateVendor({ vendorID: vendorId!, ...mutationInput });
      

        PubSub.publish("VENDOR_UPDATE_SUCCESS", { 
          
          vendorName: `${data.companyName}`,
          
        
        });
      } else {
        await createVendor(mutationInput);
   
        PubSub.publish("VENDOR_ADD_SUCCESS", { 
          
          vendorName: `${data.companyName}`,
        
        });
        if (refetchVendors) refetchVendors();
      }
      reset();
      onClose();
    } catch (error) {
      
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="p-6 relative" onClick={(e) => e.stopPropagation()}>
        <div className="bg-bg-blue-12 rounded-t-xl p-2 flex justify-between">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">
              {isEditMode ? "Edit Vendor" : "Vendor Form"}
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
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
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

              <div>
                <label className="block text-sm font-medium text-bg-blue-12 mb-1">Performance Ratings</label>
                <button
                  type="button"
                  onClick={() => setShowPerformanceModal(true)}
                  className="px-4 py-2 bg-blue-100 text-bg-blue-12 rounded-lg hover:bg-blue-200"
                >
                  Add Performance
                </button>
                {performanceRatings.length > 0 && (
                  <div className="mt-2">
                    {performanceRatings.map((perf, index) => (
                      <div key={index} className="flex gap-4 text-sm text-gray-600">
                        <span>Past Projects: {perf.pastProjectsCount}</span>
                        <span>Rating: {perf.rating}</span>
                        <span>Review: {perf.review}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Optional: Add validation message if no ratings are added */}
                {errors.performanceRatings && (
                  <span className="text-red-500 text-sm">{errors.performanceRatings.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-bg-blue-12 mb-1">Note</label>
                <div className="border rounded-lg">
                  <div className="flex gap-1 border-b p-2">
                    <button type="button" onClick={() => applyFormat("bold")} className="p-1 hover:bg-gray-100 rounded">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => applyFormat("italic")} className="p-1 hover:bg-gray-100 rounded">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => applyFormat("underline")} className="p-1 hover:bg-gray-100 rounded">
                      <Underline className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => applyFormat("createLink", prompt("Enter URL:") || "")} className="p-1 hover:bg-gray-100 rounded">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Image className="w-4 h-4" />
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-1" />
                    <button type="button" onClick={() => applyFormat("justifyLeft")} className="p-1 hover:bg-gray-100 rounded">
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => applyFormat("justifyCenter")} className="p-1 hover:bg-gray-100 rounded">
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => applyFormat("justifyRight")} className="p-1 hover:bg-gray-100 rounded">
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-1" />
                    <button type="button" onClick={() => applyListFormat("insertUnorderedList")} className="p-1 hover:bg-gray-100 rounded">
                      <List className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => applyListFormat("insertOrderedList")} className="p-1 hover:bg-gray-100 rounded">
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Minus className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                  <div
                    ref={noteRef}
                    contentEditable="true"
                    onInput={handleNoteChange}
                    className="p-3 min-h-[80px] outline-none border-none w-full focus:ring-0 text-gray-900"
                  />
                  <input
                    type="hidden"
                    {...register("notes", {
                      required: "Notes are required",
                      minLength: { value: 5, message: "Minimum 5 characters required" },
                    })}
                  />
                  {errors.notes && (
                    <span className="text-red-500 text-sm">{errors.notes.message}</span>
                  )}
                  <div className="p-3">
                    <div className="flex gap-2 text-sm text-bg-blue-12">
                      <button type="button" className="hover:underline">@ Mention</button>
                      <button type="button" className="hover:underline">Document</button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-bg-blue-12 text-white py-3 rounded-lg"
                disabled={loading || mutationLoading || updateLoading}
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPerformanceModal && (
        <PerformanceFormModal
          onClose={() => setShowPerformanceModal(false)}
          onAddPerformance={addPerformance}
        />
      )}
    </div>
  );
};

export default VendorForm;