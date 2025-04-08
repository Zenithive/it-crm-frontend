"use client";

import React, { useState, useRef, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateVendor } from "../../api/apiService/addVendorApiService";
import { useVendors } from "../../api/apiService/overallvendorApiService";
import PubSub from "../../pubsub/Pubsub";
import { VendorFormData, PerformanceRatingData, AddVendorFormProps } from "./VendorFormInterface";
import { CountrySelection } from "./CountrySelection";
import PerformanceFormModal from "./PerformanceModal";
import NoteEditor from "./NoteEditor";
import FormFields from "./FormFields";

const VendorForm: React.FC<AddVendorFormProps> = ({ onClose, vendorData, vendorId, refetchVendors }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
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




  const getSelectTextColorClass = (value: string | undefined) => {
    return value ? "text-black" : "text-gray-400";
  };
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
              <FormFields 
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />

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
                {errors.performanceRatings && (
                  <span className="text-red-500 text-sm">{errors.performanceRatings.message}</span>
                )}
              </div>

              <NoteEditor 
                register={register}
                errors={errors}
                noteRef={noteRef}
                setValue={setValue}
              />

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