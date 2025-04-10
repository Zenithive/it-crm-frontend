"use client";

import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { LeadFormData } from "../Interface/AddLeadModalInterface";
import { getSelectTextColorClass } from "./LeadFormUtils";
import { countries } from "./Country";

interface OrganizationInfoSectionProps {
  register: UseFormRegister<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
}

const OrganizationInfoSection: React.FC<OrganizationInfoSectionProps> = ({
  register,
  errors,
  watch
}) => {
  const countryValue = watch("country");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryValue || "");

  

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update selectedCountry when countryValue changes from external sources
  useEffect(() => {
    if (countryValue) {
      setSelectedCountry(countryValue);
    }
  }, [countryValue]);

  // Handle country selection
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    
    // Set the value in the form
    const event = {
      target: {
        name: "country",
        value: country
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    register("country").onChange(event);
  };

  return (
    <>
      <div className="text-bg-blue-12 font-bold text-2xl py-3">
        Organization
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Organization Name
          </label>
          <input
            {...register("organizationName", {
              required: "Organization name is required",
            })}
            placeholder="Enter name"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.organizationName && (
            <span className="text-red-500 text-sm">
              {errors.organizationName.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Email
          </label>
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
            <span className="text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm text-bg-blue-12 mb-2">
            Country
          </label>
          <input
            type="hidden"
            {...register("country", {
              required: "Country is required",
            })}
            value={selectedCountry}
          />
          <div 
            className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none cursor-pointer flex justify-between items-center ${getSelectTextColorClass(
              selectedCountry
            )}`}
            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
          >
            <span>{selectedCountry || "Select a country"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isCountryDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.map((country, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </div>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-3 py-2 text-gray-500">No countries found</div>
                )}
              </div>
            </div>
          )}
          
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationInfoSection;