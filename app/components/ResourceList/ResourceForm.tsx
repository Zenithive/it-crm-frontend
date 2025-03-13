import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_RESOURCE_PROFILE } from "../../../graphQl/mutation/addResource.mutation";

// Define type and status constants
const EMPLOYEE = "EMPLOYEE";
const ACTIVE = "ACTIVE";

interface ResourceFormProps {
  onClose: () => void;
}

export const ResourceForm: React.FC<ResourceFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    totalExperience: "",
    email: "",
    phone: "",
    googleDriveLink: "",
    vendorID: "42929892-0ec9-46d9-9fea-07d34d95dc0f",
    skillInputs: [{ skillID: "", experienceYears: "" }],
  });

  const [createResourceProfile, { loading, error }] = useMutation(
    CREATE_RESOURCE_PROFILE
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const newSkills = [...formData.skillInputs];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData((prev) => ({ ...prev, skillInputs: newSkills }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skillInputs: [...prev.skillInputs, { skillID: "", experienceYears: "" }],
    }));
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skillInputs: prev.skillInputs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create contactInformation as a JSON string
    const contactInformation = JSON.stringify({
      email: formData.email,
      phone: formData.phone,
    });

    const submissionData = {
      type: EMPLOYEE,
      status: ACTIVE,
      firstName: formData.firstName,
      lastName: formData.lastName,
      totalExperience: parseFloat(formData.totalExperience) || 0,
      googleDriveLink: formData.googleDriveLink,
      vendorID: formData.vendorID,
      skillInputs: formData.skillInputs.map((skill) => ({
        skillID: skill.skillID,
        experienceYears: parseFloat(skill.experienceYears) || 0,
      })),
      contactInformation, // Now passed as a JSON string
    };

    try {
      await createResourceProfile({ variables: { input: submissionData } });
      alert("Resource added successfully!");
      onClose();
    } catch (err) {
      console.error("Error adding resource:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-lg shadow-lg w-full max-w-4xl">
        <div className="bg-bg-blue-12 rounded-t-2xl p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Resource Form</h2>
          <button
            className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
            onClick={onClose}
          >
            <img src="cross_icon.svg" alt="Cross" className="h-3 w-3"></img>
          </button>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white">
        {error && <p className="text-red-500">Error: {error.message}</p>}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Type
              </label>
              <input
                type="text"
                value="EMPLOYEE"
                readOnly
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Status
              </label>
              <input
                type="text"
                value="ACTIVE"
                readOnly
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Experience (1/3) */}
            <div className="col-span-1">
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Total Experience (years)
              </label>
              <input
                type="number"
                name="totalExperience"
                value={formData.totalExperience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>

            {/* Google Drive Link (2/3) */}
            <div className="col-span-2">
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Google Drive Link
              </label>
              <input
                type="url"
                name="googleDriveLink"
                value={formData.googleDriveLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-bg-blue-12 mb-1">
              Skills
            </label>
            {formData.skillInputs.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mb-2"
              >
                {/* Skill ID Input */}
                
                <input
                  type="text"
                  placeholder="Skill ID"
                  value={skill.skillID}
                  onChange={(e) =>
                    handleSkillChange(index, "skillID", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />

                {/* Experience Input */}
                <input
                  type="number"
                  placeholder="Experience (years)"
                  value={skill.experienceYears}
                  onChange={(e) =>
                    handleSkillChange(index, "experienceYears", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="w-[20px] h-[20px] flex items-center justify-center bg-bg-blue-12 text-white rounded-md"
                >
                  -
                </button>
              </div>
            ))}

            {/* Add Skill Button */}
            <button
              type="button"
              onClick={addSkill}
              className="text-base font-medium text-bg-blue-12 mt-2"
            >
              + Add Skill
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-bg-blue-12 text-white py-2 rounded hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};
