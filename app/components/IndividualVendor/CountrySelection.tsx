import React from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import countries from "world-countries";
import { Controller, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface CountryOption {
  value: string; // Country name (e.g., "India")
  label: string;
}

interface CountrySelectionProps {
  register: UseFormRegister<any>; // Kept for compatibility, though not used directly
  setValue: UseFormSetValue<any>; // Kept for compatibility, though Controller will handle it
  control: any; // Add control from react-hook-form
  errors?: any; // Optional: to display validation errors
}

export const CountrySelection: React.FC<CountrySelectionProps> = ({
  register,
  setValue,
  control,
  errors,
}) => {
  const countryOptions: CountryOption[] = countries.map((country) => ({
    value: country.name.common, // Use country name (e.g., "India")
    label: country.name.common,
  }));

  const defaultOption = countryOptions.find((option) => option.value === "India") || null;

  const customStyles: StylesConfig<CountryOption, false> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused
        ? "#6366F1"
        : errors?.country
        ? "#EF4444" // Red border for errors
        : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 1px #6366F1" : "none",
      "&:hover": {
        borderColor: errors?.country ? "#EF4444" : "#e2e8f0",
      },
      borderRadius: "0.5rem",
      padding: "2px 0",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6366F1"
        : state.isFocused
        ? "#EEF2FF"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#6366F1",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "#374151",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#374151",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "black",
      ":hover": {
        color: "black",
      },
      width: "2rem",
      height: "2rem",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="country" className="text-sm block font-medium text-[#6366F1]">
        Country
      </label>
      <Controller
        name="country"
        control={control}
        rules={{ required: "Country is required" }}
        defaultValue="India" // Set default value here
        render={({ field }) => (
          <Select
            id="country"
            options={countryOptions}
            classNamePrefix="select"
            placeholder="Select a country"
            onChange={(selectedOption: SingleValue<CountryOption>) => {
              const value = selectedOption ? selectedOption.value : "";
              field.onChange(value); // Update form state
            }}
            value={countryOptions.find((option) => option.value === field.value) || null}
            styles={customStyles}
            defaultValue={defaultOption} // Reflect default in UI
          />
        )}
      />
      {errors?.country && (
        <span className="text-sm text-red-500">{errors.country.message}</span>
      )}
    </div>
  );
};