"use client"
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { X } from "lucide-react";


// Define an interface for the form data
interface LeadFormData {
    firstName: string;
    lastName: string;
    linkedinUrl: string;
    phone: string;
    jobTitle: string;
    source: string;
    leadType: string;
    campaignName: string;
    status: string;
    organizationName: string;
    email: string;
    website: string;
    country: string;
    city: string;
    employees: string;
    annualRevenue: string;
    industry: string;
  }

  const AddLeadModal: React.FC = ({ onClose }) => {
    const { register, handleSubmit } = useForm<LeadFormData>();
  
    const onSubmit: SubmitHandler<LeadFormData> = (data) => {
      console.log(data);
    };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative">
        <div className="absolute top-4 right-4">
          <button className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#6366f1]">Lead Form</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">First Name</label>
              <input 
                {...register("firstName")} 
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Last Name</label>
              <input 
                {...register("lastName")} 
                placeholder="number"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">LinkedIn Profile URL</label>
              <input 
                {...register("linkedinUrl")} 
                placeholder="Link"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
          </div>

          {/* Contact and Campaign Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone</label>
              <div className="flex">
                <select 
                  className="w-24 mr-2 px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
                >
                  <option>+91</option>
                </select>
                <input 
                  {...register("phone")} 
                  placeholder="9563251478"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Job Title</label>
              <select 
                {...register("jobTitle")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              >
                <option value="">Title</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Source</label>
              <input 
                {...register("source")} 
                placeholder="ex. Linkedin, Upwork"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
          </div>

          {/* Lead Type and Campaign */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Lead Type</label>
              <input 
                {...register("leadType")} 
                placeholder="Type"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name of Campaign</label>
              <select 
                {...register("campaignName")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              >
                <option value="">Campaign</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select 
                {...register("status")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              >
                <option value="">Status</option>
              </select>
            </div>
          </div>

          {/* Organization Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Organization Name</label>
              <input 
                {...register("organizationName")} 
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input 
                {...register("email")} 
                placeholder="email"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Website</label>
              <input 
                {...register("website")} 
                placeholder="Link"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
          </div>

          {/* Location and Company Details */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Country</label>
              <select 
                {...register("country")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              >
                <option value="">Ex. India</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">City</label>
              <input 
                {...register("city")} 
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">No. Employees</label>
              <select 
                {...register("employees")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              >
                <option value="">ex. 150</option>
              </select>
            </div>
          </div>

          {/* Final Section */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Annual Revenue</label>
              <input 
                {...register("annualRevenue")} 
                placeholder="number"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Industry</label>
              <select 
                {...register("industry")}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1]"
              >
                <option value="">Ex. India</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="w-full py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#5A5FE0] transition-colors"
            >
              Save
            </button>
            <button 
              type="button" 
              className="w-full py-2 border border-[#6366f1] text-[#6366f1] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;