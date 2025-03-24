

import React from "react";
import Select,{ SingleValue, StylesConfig } from "react-select";
import countries from "world-countries";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface CountryOption {
  value: string;
  label: string;
}

interface CountrySelectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

export const CountrySelection: React.FC<CountrySelectionProps> = ({ 
  register, 
  setValue 
}) => {
  const countryOptions: CountryOption[] = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const handleChange = (selectedOption: SingleValue<CountryOption>) => {
    if (selectedOption) {
      setValue("country", selectedOption.value);
    }
  };

const customStyles: StylesConfig<CountryOption, false> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#6366F1' : '#e2e8f0',
      boxShadow: state.isFocused ? '0 0 0 1px #6366F1' : 'none',
      '&:hover': {
        borderColor: '#e2e8f0',
    
      },
      borderRadius: '0.5rem',
      padding: '2px 0',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#6366F1' : state.isFocused ? '#EEF2FF' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#6366F1',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      
      color: 'black',
      ':hover': {
        color: 'black',
      },
      width: '2rem',  // Use width instead of size
      height: '2rem',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
  };

  return (
    <div className="flex flex-col gap-1 ">
      <label 
        htmlFor="country" 
        className="text-sm  block font-medium text-[#6366F1]"
      >
        Country
      </label>
      <Select
        id="country"
        options={countryOptions}
       
        classNamePrefix="select"
        placeholder="Select a country"
        
        onChange={handleChange}
        styles={customStyles}
      />
    </div>
  );
};