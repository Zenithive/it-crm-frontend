"use client";
import React, { useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useCreateVendor } from "../../api/apiService/addVendorApiService"
import {
  X,
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

// Define an interface for the form data
interface VendorFormData {
  companyName: string;
  // companyEmail: string;
  address: string;
  status:string;
  vendorSkills: string;
  paymentTerms: string;
  // website: string;
  gstOrVatDetails: string;
  // linkedInUrl: string;
  performanceRating: number;
  notes: string;
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
}

const VendorForm: React.FC<AddVendorFormProps> = ({ onClose }) => {
  const { register, handleSubmit, reset, setValue } = useForm<VendorFormData>({
    defaultValues: {
      performanceRating: 0,
      status: "ACTIVE",
      paymentTerms: "NET30",
      vendorDetails: [{ name: "", contact: "", number: "", designation: "" }],
    },
  });
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [vendorDetails, setVendorDetails] = useState([
    { name: "", contact: "", number: "", designation: "" },
  ]);
  const noteRef = useRef<HTMLDivElement | null>(null);

  const user = useSelector((state: RootState) => state.auth);

  //graphQl mutation
  const { createVendor, loading: mutationLoading } = useCreateVendor();

  const applyFormat = (command: string, value: string = "") => {
    if (noteRef.current) {
      noteRef.current.focus();
      document.execCommand(command, false, value);
      // Update form value after formatting
      setValue("notes", noteRef.current.innerHTML);
    }
  };

  const applyListFormat = (command: string) => {
    if (noteRef.current) {
      noteRef.current.focus();

      // If there's no text, insert a placeholder to start the list
      if (noteRef.current.innerHTML.trim() === "") {
        noteRef.current.innerHTML = "<p><br></p>";
      }

      document.execCommand(command, false, "");
      // Update form value after formatting
      setValue("notes", noteRef.current.innerHTML);
    }
  };

  // const addVendorDetail = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   const newVendorDetails = [
  //     ...vendorDetails,
  //     { name: "", contact: "", number: "", designation: "" },
  //   ];
  //   setVendorDetails(newVendorDetails);
  //   setValue("vendorDetails", newVendorDetails);
  // };

  // const removeVendorDetail = (index: number) => {
  //   const updatedVendorDetails = vendorDetails.filter((_, i) => i !== index);
  //   setVendorDetails(updatedVendorDetails);
  //   setValue("vendorDetails", updatedVendorDetails);
  // };

  // const handleRatingChange = (newRating: number) => {
  //   setRating(newRating);
  //   setValue("performanceRating", newRating);
  // };

  const handleNoteChange = () => {
    if (noteRef.current) {
      setValue("notes", noteRef.current.textContent || "");
    }
  };

  const getSkillIDs = (skill: string): string[] => {
    // This is a simplified approach - you may need to map skills to actual IDs from your backend
    switch(skill) {
      case "GOLANG":
        return ["a442dcee-2ea7-4f25-b710-99a8e6411be7"]; // Replace with actual ID
      case "POSTGRESQL":
        return ["0b73f7ea-a3e8-44f4-93bd-648fc8e57275"]; // Replace with actual ID
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
    };
  };
  
  const onSubmit: SubmitHandler<VendorFormData> = async (data) => {
    setLoading(true);
    try {
      // Map form data to mutation input format
      const mutationInput = mapFormDataToMutationInput(data);
      
      // Call the mutation hook with the formatted input
      await createVendor(mutationInput);
      
      // Reset form and close modal on success
      reset();
      onClose();
    } catch (error) {
      message.error("Failed to add vendor. Please try again.");
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
        <div className="bg-[#6366F1] rounded-t-xl p-2 flex justify-between">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">Vendor Form</h2>
          </div>
          <div className="p-2">
            <button
              className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
              onClick={onClose}
            >
                <img src="cross_icon.svg" alt="Cross" className="h-3 w-3"></img>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full max-w-4xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6"
          >
            <div className="space-y-6">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Company Name
                  </label>
                  <input
                    {...register("companyName")}
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Company Email
                  </label>
                  <input
                    {...register("companyEmail")}
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Address"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="NON ACTIVE">Non Acitve</option>
                  </select>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Vendor Skills
                  </label>
                  <select
                    {...register("vendorSkills")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  >
                    <option value="">Select Skills</option>
                    <option value="GOLANG">Golang</option>
                    <option value="POSTGRESQL">PostgreSQL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Payment Terms
                  </label>
                  <select
                    {...register("paymentTerms")}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  >
                    <option value="">Select Terms</option>
                    <option value="NET_30">NET 30</option>
                    <option value="NET_60">NET 60</option>
                    <option value="NET_90">NET 90</option>
                  </select>
                </div>
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

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    VAT/GST
                  </label>
                  <input
                    {...register("gstOrVatDetails")}
                    type="text"
                    placeholder="GST or VAT Number"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    {...register("linkedInUrl")}
                    type="url"
                    placeholder="URL"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                  />
                </div> */}
                {/* <div>
                  <label className="block text-sm font-medium text-[#6366F1] mb-1">
                    Performance Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${
                          star <= rating
                            ? "fill-[#6366F1] text-[#6366F1]"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                </div> */}
              </div>

              {/* Note Section */}
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
                      onClick={() =>
                        applyFormat("createLink", prompt("Enter URL:") || "")
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded"
                    >
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
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Editable Area */}
                  <div
                    ref={noteRef}
                    contentEditable="true"
                    onInput={handleNoteChange}
                    className="p-3 min-h-[80px] outline-none border-none w-full focus:ring-0 text-gray-900"
                  ></div>

                  <div className="p-3">
                    <div className="flex gap-2 text-sm text-[#6366F1]">
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

              {/* Vendor Detail Section */}
              {/* <div>
                <h3 className="text-lg font-medium text-[#6366F1] mb-4">
                  Vendor Detail
                </h3>
                {vendorDetails.map((_, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-[#6366F1] mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6366F1] mb-1">
                          Contact
                        </label>
                        <input
                          type="text"
                          placeholder="Contact"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6366F1] mb-1">
                          Number
                        </label>
                        <input
                          type="text"
                          placeholder="Number"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6366F1] mb-1">
                          Designation
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: CEO"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none"
                        />
                      </div>
                    </div>

                    {vendorDetails.length >= 1 && (
                      <button
                        onClick={() => removeVendorDetail(index)}
                        className="bg-bg-blue-12 text-white rounded-md w-5 h-5 flex items-center justify-center text-sm mt-6"
                      >
                        −
                      </button>
                    )}
                  </div>
                ))}
              </div> */}

              {/* <button
                onClick={addVendorDetail}
                className="text-white bg-bg-blue-12 rounded-lg flex items-center gap-1 text-sm p-2"
              >
                <span className="flex items-center justify-center">
                  <img
                    src="plus.svg"
                    alt="add"
                    className="w-3 h-3 items-center justify-center flex mr-2"
                  ></img>
                  <div className="">Add Detail</div>
                </span>
              </button> */}
              {/* Save Button */}
          <button className="w-full bg-[#6366F1] text-white py-3 rounded-lg hover:bg-[#5457E5] transition-colors">
            Save
          </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
