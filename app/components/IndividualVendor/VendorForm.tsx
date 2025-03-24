// VendorForm.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useCreateVendor } from "../../api/apiService/addVendorApiService";
import { useUpdateVendor } from "../../api/apiService/overallvendorApiService";
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

interface VendorFormData {
  companyName: string;
  address: string;
  status: string;
  vendorSkills: string;
  paymentTerms: string;
  // website: string;
  gstOrVatDetails: string;
  performanceRating: number;
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
  agreement?: {
    startDate: string;
    endDate: string;
    status: string;
  };
  employeeCount?: string;
  recentActivity?: Array<{
    type: string;
    title: string;
    timestamp: string;
  }>;
}

const VendorForm: React.FC<AddVendorFormProps> = ({ onClose, vendorData, vendorId }) => {
  const { register, handleSubmit, reset, setValue } = useForm<VendorFormData>({
    defaultValues: {
      performanceRating: 0,
      status: "ACTIVE",
      paymentTerms: "NET30",
      vendorDetails: [{ name: "", contact: "", number: "", designation: "" }],
      country: "India",
    },
  });
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [vendorDetails, setVendorDetails] = useState([
    { name: "", contact: "", number: "", designation: "" },
  ]);
  const noteRef = useRef<HTMLDivElement | null>(null);

  const user = useSelector((state: RootState) => state.auth);
  const { createVendor, loading: mutationLoading } = useCreateVendor();
  const { updateVendor, loading: updateLoading } = useUpdateVendor();
  const isEditMode = !!vendorData && !!vendorId;

  useEffect(() => {
    if (isEditMode && vendorData) {
      setValue("companyName", vendorData.companyName);
      setValue("status", vendorData.status);
      setValue("address", vendorData.address);
      setValue("paymentTerms", vendorData.paymentTerms);
      // Map the first skill name to the select field (assuming single skill for simplicity)
      setValue("vendorSkills", vendorData.skills[0]?.name || "");
      setValue("gstOrVatDetails", vendorData.gstOrVatDetails || "");
      setValue("country", vendorData.primaryContact?.location || "India");
      setValue("notes", vendorData.notes || "");
      if (noteRef.current) noteRef.current.innerHTML = vendorData.notes || "";
    }
  }, [vendorData, setValue, isEditMode]);

  const applyFormat = (command: string, value: string = "") => {
    if (noteRef.current) {
      noteRef.current.focus();
      document.execCommand(command, false, value);
      setValue("notes", noteRef.current.innerHTML);
    }
  };

  const applyListFormat = (command: string) => {
    if (noteRef.current) {
      noteRef.current.focus();
      if (noteRef.current.innerHTML.trim() === "") {
        noteRef.current.innerHTML = "<p><br></p>";
      }
      document.execCommand(command, false, "");
      setValue("notes", noteRef.current.innerHTML);
    }
  };

  const handleNoteChange = () => {
    if (noteRef.current) {
      setValue("notes", noteRef.current.textContent || "");
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
    };
  };

  const onSubmit: SubmitHandler<VendorFormData> = async (data) => {
    setLoading(true);
    try {
      const mutationInput = mapFormDataToMutationInput(data);
      if (isEditMode) {
        await updateVendor({ vendorID: vendorId!, ...mutationInput });
      } else {
        await createVendor(mutationInput);
      }
      reset();
      onClose();
    } catch (error) {
      message.error(`Failed to ${isEditMode ? "update" : "add"} vendor. Please try again.`);
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
              {isEditMode ? "Edit Vendor" : "Vendor Form"}
            </h2>
          </div>
          <div className="p-2">
            <button
              className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
              onClick={onClose}
            >
              <img src="/cross_icon.svg" alt="Cross" className="h-3 w-3"></img>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full max-w-4xl">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                    Company Name
                  </label>
                  <input
                    {...register("companyName")}
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Address"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                  location
                  </label>
                  <select
                    {...register("country", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2  outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">InActive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                    Vendor Skills
                  </label>
                  <select
                    {...register("vendorSkills")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2  outline-none"
                  >
                    <option value="">Select Skills</option>
                    <option value="GOLANG">Golang</option>
                    <option value="POSTGRESQL">PostgreSQL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                    Payment Terms
                  </label>
                  <select
                    {...register("paymentTerms")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2  outline-none"
                  >
                    <option value="">Select Terms</option>
                    <option value="NET_30">NET 30</option>
                    <option value="NET_60">NET 60</option>
                    <option value="NET_90">NET 90</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Country
                  </label>
                  <select
                    {...register("country")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="NET_30">USA</option>
                    <option value="NET_60">India</option>
                    <option value="NET_90">China</option>
                  </select>
                </div> */}
                <div><CountrySelection register={register} setValue={setValue} /></div>

                
                {/* <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Website
                  </label>
                  <input
                    {...register("website")}
                    type="url"
                    placeholder="Link"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bg-blue-12 mb-1">
                    VAT/GST
                  </label>
                  <input
                    {...register("gstOrVatDetails")}
                    type="text"
                    placeholder="GST or VAT Number"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2  outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6366F1] mb-1">
                  Note
                </label>
                
                <div className="border rounded-lg">
                  <div className="flex gap-1 border-b p-2">
                    <button
                      type="button"
                      onClick={() => applyFormat("bold")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat("italic")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat("underline")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat("createLink", prompt("Enter URL:") || "")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Image className="w-4 h-4" />
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => applyFormat("justifyLeft")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat("justifyCenter")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat("justifyRight")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => applyListFormat("insertUnorderedList")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyListFormat("insertOrderedList")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
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
                  ></div>
                  <div className="p-3">
                    <div className="flex gap-2 text-sm text-bg-blue-12">
                      <button type="button" className="hover:underline">
                        @ Mention
                      </button>
                      <button type="button" className="hover:underline">
                        Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-bg-blue-12 text-white py-3 rounded-lg transition-colors"
                disabled={loading || mutationLoading || updateLoading}
              >
                <span className="flex items-center justify-center">
                  <img
                    src="plus.svg"
                    alt="add"
                    className="w-3 h-3 items-center justify-center flex mr-2"
                  ></img>
                  <div className="">Add Detail</div>
                </span>
              </button> 
              {/* Save Button */}



              <div></div>
          <button className="w-full bg-[#6366F1] text-white py-3 rounded-lg hover:bg-[#5457E5] transition-colors">
                {isEditMode ? "Update" : "Save"}
          </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;