"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { message, DatePicker } from "antd";
import { useAddLead } from "../api/apiService/addLeadModalApiService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import ActivityForm from "../components/ActivityForm";

// Define an interface for the form data
interface LeadFormData {
  firstName: string;
  lastName: string;
  linkedIn: string;
  phone: string;
  jobTitle: string;
  leadSource: string;
  leadType: string;
  campaignName: string;
  status: string;
  initialContactDate: string;
  organizationName: string;
  email: string;
  website: string;
  country: string;
  city: string;
  employees: string;
  annualRevenue: string;
  industry: string;
}

interface AddLeadModalProps {
  onClose: () => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose }) => {
  const { register, handleSubmit, reset, setValue} = useForm<LeadFormData>();
  const [loading, setLoading] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const user = useSelector((state: RootState) => state.auth);
  const [date, setDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate(selectedDate); // Ensures YYYY-MM-DD format
    setValue("initialContactDate", selectedDate); // Update form value
  };

  const { addLead, loading: mutationLoading, error } = useAddLead();

  const onSubmit: SubmitHandler<LeadFormData> = async (data) => {
    setLoading(true);
    try {
      await addLead(data); // ✅ Now using GraphQL mutation
      message.success("Lead added successfully!");
      reset(); // Reset the form after successful submission
      onClose(); // Close the modal
    } catch (error) {
      message.error("Failed to add lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 relative">
        <div className="bg-bg-blue-12 rounded-t-xl p-2 flex justify-between">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">Lead Form</h2>
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
          <form onSubmit={handleSubmit(onSubmit)} className=" p-6">
            <div className="space-y-2">
              {/* Personal Information */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    placeholder="Enter First name"
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    placeholder="Enter Last Name"
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    LinkedIn Profile URL
                  </label>
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
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="w-24 mr-2 px-2 py-2 border border-bg-blue-12 rounded-lg text-gray-400">
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
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  Job Title
                </label>
                <select
                  {...register("jobTitle")}
                  className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                >
                  <option value="Title">Title</option>
                </select>
              </div> */}
                {/* as this is not present in api */}
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Source
                  </label>
                  <input
                    {...register("leadSource")}
                    placeholder="ex. Linkedin, Upwork"
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Lead Type and Campaign */}
              <div className="grid grid-cols-3 gap-4">
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  Lead Type
                </label>
                <input
                  {...register("leadType")}
                  placeholder="Type"
                  className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />
              </div> */}
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Name of Campaign
                  </label>
                  <select
                    {...register("campaignName")}
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                  >
                    <option value="Campaign">Campaign</option>
                    <option value="Campaign1">Campaign1</option>
                    <option value="Campaign2">Campaign2</option>
                  </select>
                </div>
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                >
                  <option value="Status" className="">Status</option>
                </select>
              </div> */}
                {/* as this field not present in api */}
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Lead Date
                  </label>
                  <input
                    type="date"
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                  />
                </div>
              </div>

              <div className="text-bg-blue-12 font-bold text-2xl py-3">
                Organization
              </div>
              {/* Organization Information */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Organization Name
                  </label>
                  <input
                    {...register("organizationName")}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    placeholder="email"
                    className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                  />
                </div>
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  Website
                </label>
                <input
                  {...register("website")}
                  placeholder="Link"
                  className="w-full px-3 py-2 border  border-bg-blue-12 rounded-lg focus:outline-none"
                />
              </div> */}
              </div>

              {/* Location and Company Details */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-bg-blue-12 mb-2">
                    Country
                  </label>
                  <select
                    {...register("country")}
                    className="w-full px-3 py-2 border  border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                  >
                    <option value="Ex. India" className="">
                      Ex. India
                    </option>
                  </select>
                </div>
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  City
                </label>
                <input
                  {...register("city")}
                  placeholder="City"
                  className="w-full px-3 py-2 border  border-bg-blue-12 rounded-lg focus:outline-none"
                />
              </div> */}
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  No. Employees
                </label>
                <select
                  {...register("employees")}
                  className="w-full px-3 py-2 border  border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                >
                  <option value="ex. 150" className="">ex. 150</option>
                </select>
              </div> */}
              </div>

              {/* Final Section */}
              <div className="grid grid-cols-3 gap-4">
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  Annual Revenue
                </label>
                <input
                  {...register("annualRevenue")}
                  placeholder="number"
                  className="w-full px-3 py-2 border  border-bg-blue-12 rounded-lg focus:outline-none"
                />
              </div> */}
                {/* <div>
                <label className="block text-sm text-bg-blue-12 mb-2">
                  Industry
                </label>
                <select
                  {...register("industry")}
                  className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none text-gray-400"
                >
                  <option value="Ex. India" className="">Ex. India</option>
                </select>
              </div> */}
              </div>
            </div>
            {/*  Action Buttons */}
            <div className="flex space-x-4 mt-5">
              <button
                type="submit"
                className="w-full py-2 bg-bg-blue-12 text-white rounded-lg"
              >
                Save
              </button>
              {/* Activity Form Modal */}
              <button
                type="button"
                className="w-full py-2 bg-bg-blue-12 text-white rounded-lg"
                onClick={() => setShowActivityForm(true)} // Show form on click
              >
                Add Activity
              </button>

              {/* Render ActivityForm outside button */}
              {showActivityForm && (
                <ActivityForm
                  onClose={() => setShowActivityForm(false)} // Close ActivityForm
                  onSubmit={async (data) => {
                    console.log("Activity submitted:", data);
                    // setShowActivityForm(false);
                  }}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;
