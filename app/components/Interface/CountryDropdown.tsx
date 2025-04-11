// src/components/Lead/CountryDropdown.tsx
import React, { useState, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch, RegisterOptions } from "react-hook-form";
// import { LeadFormData } from "../../interfaces/AddLeadModalInterface";
// import { countries } from "../../data/Country";
// import { getSelectTextColorClass } from "../../utils/LeadFormUtils";
import { LeadFormData } from "./AddLeadModalInterface";
import { countries } from "./Country";
import { getSelectTextColorClass } from "./LeadFormUtils";

interface CountryDropdownProps {
  label: string;
  name: "country" | "orgCountry";
  register: UseFormRegister<LeadFormData>;
  watch: UseFormWatch<LeadFormData>;
  errors: FieldErrors<LeadFormData>;
  validation?: RegisterOptions;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  label,
  name,
  register,
  watch,
  errors,
  validation
}) => {
  const countryValue = watch(name);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(false);
    
    // Set the value in the form
    const event = {
      target: {
        name: name,
        value: country
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    register(name, validation as RegisterOptions<LeadFormData, "country" | "orgCountry">).onChange(event);
  };

  return (
    <div className="relative">
      <label className="block text-sm text-bg-blue-12 mb-2">
        {label}
      </label>
      <input
        type="hidden"
        {...register(name, validation as RegisterOptions<LeadFormData, "country" | "orgCountry">)}
        value={selectedCountry}
      />
      <div 
        className={`w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none cursor-pointer flex justify-between items-center ${getSelectTextColorClass(
          selectedCountry
        )}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{selectedCountry || `Select ${label.toLowerCase()}`}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isDropdownOpen && (
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
      
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default CountryDropdown;