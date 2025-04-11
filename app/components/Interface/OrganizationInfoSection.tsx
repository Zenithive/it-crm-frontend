"use client";

import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { LeadFormData, OrganizationInfoSectionProps } from "../Interface/AddLeadModalInterface";
import { getSelectTextColorClass } from "./LeadFormUtils";
import { countries, mockOrganizations } from "./Country";

const OrganizationInfoSection: React.FC<OrganizationInfoSectionProps> = ({
  register,
  errors,
  watch,
  selectedOrganization,
  onOrganizationSelect,
  onCreateNewOrganization,
  createNewOrganization
}) => {
  const countryValue = watch("country");
  const orgCountryValue = watch("orgCountry");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isOrgCountryDropdownOpen, setIsOrgCountryDropdownOpen] = useState(false);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orgCountrySearchTerm, setOrgCountrySearchTerm] = useState("");
  const [orgSearchTerm, setOrgSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryValue || "");
  const [selectedOrgCountry, setSelectedOrgCountry] = useState(orgCountryValue || "");

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter org countries based on search term
  const filteredOrgCountries = countries.filter(country => 
    country.toLowerCase().includes(orgCountrySearchTerm.toLowerCase())
  );

  // Filter organizations based on search term
  const filteredOrganizations = mockOrganizations.filter(org => 
    org.name.toLowerCase().includes(orgSearchTerm.toLowerCase())
  );

  // Update selectedCountry when countryValue changes from external sources
  useEffect(() => {
    if (countryValue) {
      setSelectedCountry(countryValue);
    }
  }, [countryValue]);

  // Update selectedOrgCountry when orgCountryValue changes from external sources
  useEffect(() => {
    if (orgCountryValue) {
      setSelectedOrgCountry(orgCountryValue);
    }
  }, [orgCountryValue]);

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

  // Handle org country selection
  const handleOrgCountrySelect = (country: string) => {
    setSelectedOrgCountry(country);
    setIsOrgCountryDropdownOpen(false);
    
    // Set the value in the form
    const event = {
      target: {
        name: "orgCountry",
        value: country
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    register("orgCountry").onChange(event);
  };

  return (
    <>
      <div className="text-bg-blue-12 font-bold text-2xl py-3">
        Organization
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-3">
          <div className="mr-4">
            <input
              type="radio"
              id="existingOrg"
              name="orgType"
              checked={!createNewOrganization}
              onChange={() => onOrganizationSelect(selectedOrganization?.id || "", selectedOrganization?.name || "", selectedOrganization?.website || "")}
              className="mr-2"
            />
            <label htmlFor="existingOrg" className="text-sm text-bg-blue-12">Select Existing Organization</label>
          </div>
          
          <div>
            <input
              type="radio"
              id="newOrg"
              name="orgType"
              checked={createNewOrganization}
              onChange={onCreateNewOrganization}
              className="mr-2"
            />
            <label htmlFor="newOrg" className="text-sm text-bg-blue-12">Create New Organization</label>
          </div>
        </div>
        
        {/* Hidden field to track if we're creating a new organization */}
        <input
          type="hidden"
          {...register("createNewOrganization")}
          value={createNewOrganization ? "true" : "false"}
        />
        
        {/* Hidden field for organization ID */}
        <input
          type="hidden"
          {...register("organizationID")}
          value={selectedOrganization?.id || ""}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {!createNewOrganization ? (
          // Existing Organization Selector
          <div className="relative">
            <label className="block text-sm text-bg-blue-12 mb-2">
              Organization Name
            </label>
            <div 
              className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none cursor-pointer flex justify-between items-center ${
                selectedOrganization ? 'text-black' : 'text-gray-400'
              }`}
              onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            >
              <span>{selectedOrganization?.name || "Select an organization"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {isOrgDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search organizations..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={orgSearchTerm}
                    onChange={(e) => setOrgSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredOrganizations.map((org) => (
                    <div
                      key={org.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        onOrganizationSelect(org.id, org.name, "www.example.com");
                        setIsOrgDropdownOpen(false);
                      }}
                    >
                      {org.name}
                    </div>
                  ))}
                  {filteredOrganizations.length === 0 && (
                    <div className="px-3 py-2 text-gray-500">No organizations found</div>
                  )}
                </div>
              </div>
            )}
            
            {!selectedOrganization && errors.organizationID && (
              <span className="text-red-500 text-sm">
                Please select an organization
              </span>
            )}
          </div>
        ) : (
          // New Organization Form
          <div>
            <label className="block text-sm text-bg-blue-12 mb-2">
              Organization Name
            </label>
            <input
              {...register("organizationName", {
                required: createNewOrganization ? "Organization name is required" : false,
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
        )}
        
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Organization Email
          </label>
          <input
            {...register("organizationEmail", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter organization email"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.organizationEmail && (
            <span className="text-red-500 text-sm">
              {errors.organizationEmail.message}
            </span>
          )}
        </div>
        
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Organization Website
          </label>
          <input
            {...register("organizationWebsite", {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                message: "Enter a valid website URL",
              },
            })}
            placeholder="Enter website URL"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.organizationWebsite && (
            <span className="text-red-500 text-sm">
              {errors.organizationWebsite.message}
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Organization LinkedIn
          </label>
          <input
            {...register("organizationLinkedIn", {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/(company)\/[\w-]+\/?$/,
                message: "Enter a valid LinkedIn company URL",
              },
            })}
            placeholder="Enter LinkedIn company URL"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.organizationLinkedIn && (
            <span className="text-red-500 text-sm">
              {errors.organizationLinkedIn.message}
            </span>
          )}
        </div>
        
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Annual Revenue
          </label>
          <input
            {...register("annualRevenue")}
            placeholder="Enter annual revenue"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.annualRevenue && (
            <span className="text-red-500 text-sm">
              {errors.annualRevenue.message}
            </span>
          )}
        </div>
        
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            Number of Employees
          </label>
          <input
            {...register("noOfEmployees")}
            placeholder="Enter number of employees"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
            type="number"
          />
          {errors.noOfEmployees && (
            <span className="text-red-500 text-sm">
              {errors.noOfEmployees.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm text-bg-blue-12 mb-2">
            City
          </label>
          <input
            {...register("city")}
            placeholder="Enter city"
            className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">
              {errors.city.message}
            </span>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm text-bg-blue-12 mb-2">
            Organization Country
          </label>
          <input
            type="hidden"
            {...register("orgCountry")}
            value={selectedOrgCountry}
          />
          <div 
            className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none cursor-pointer flex justify-between items-center ${getSelectTextColorClass(
              selectedOrgCountry
            )}`}
            onClick={() => setIsOrgCountryDropdownOpen(!isOrgCountryDropdownOpen)}
          >
            <span>{selectedOrgCountry || "Select organization country"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isOrgCountryDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  value={orgCountrySearchTerm}
                  onChange={(e) => setOrgCountrySearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredOrgCountries.map((country, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOrgCountrySelect(country)}
                  >
                    {country}
                  </div>
                ))}
                {filteredOrgCountries.length === 0 && (
                  <div className="px-3 py-2 text-gray-500">No countries found</div>
                )}
              </div>
            </div>
          )}
          
          {errors.orgCountry && (
            <span className="text-red-500 text-sm">
              {errors.orgCountry.message}
            </span>
          )}
        </div>
        
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