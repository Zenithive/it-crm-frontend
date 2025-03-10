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

  const [createResourceProfile, { loading, error }] = useMutation(CREATE_RESOURCE_PROFILE);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-600">
            Resource Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        {error && <p className="text-red-500">Error: {error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-purple-600 mb-1">Type</label>
              <input
                type="text"
                value="EMPLOYEE"
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-600 mb-1">
                Total Experience (years)
              </label>
              <input
                type="number"
                name="totalExperience"
                value={formData.totalExperience}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-purple-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-600 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-purple-600 mb-1">
              Google Drive Link
            </label>
            <input
              type="url"
              name="googleDriveLink"
              value={formData.googleDriveLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-600 mb-1">Status</label>
            <input
              type="text"
              value="ACTIVE"
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-600 mb-1">Skills</label>
            {formData.skillInputs.map((skill, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Skill ID"
                  value={skill.skillID}
                  onChange={(e) =>
                    handleSkillChange(index, "skillID", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Experience (years)"
                  value={skill.experienceYears}
                  onChange={(e) =>
                    handleSkillChange(index, "experienceYears", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="text-purple-600 hover:underline"
            >
              + Add Skill
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};