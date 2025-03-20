import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_RESOURCE_PROFILE } from "../../../graphQl/mutation/addResource.mutation";
import { UPDATE_RESOURCE_PROFILE } from "../../../graphQl/mutation/updateResource.mutation";
import { GET_RESOURCE_PROFILE } from "../../../graphQl/queries/getresourcebyid.queries";

import { useQuery } from "@apollo/client";

// Define type and status constants
const RESOURCE_TYPES = ["CONSULTANT", "FREELANCER", "CONTRACTOR", "EMPLOYEE"];
const STATUS_OPTIONS = ["ACTIVE", "INACTIVE"];

// Define interfaces for proper typing
interface Skill {
  skillID: string;
  name: string;
  description: string;
}

interface ResourceSkill {
  skill: Skill;
  experienceYears: number;
}

interface ResourceProfile {
  resourceProfileID: string;
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  totalExperience: number;
  contactInformation: string;
  googleDriveLink: string;
  vendorID: string;
  resourceSkills?: ResourceSkill[];
}

interface SkillInput {
  skillID: string;
  experienceYears: string;
}

interface ResourceFormProps {
  onClose: () => void;
  resourceProfileId?: string; // Optional ID for edit mode
  isEditMode?: boolean; // Flag to determine if we're in edit mode
  onUpdateSuccess?: () => void;
}

export const ResourceForm: React.FC<ResourceFormProps> = ({ 
  onClose, 
  resourceProfileId, 
  isEditMode = false,
  onUpdateSuccess  
}) => {
  const [formData, setFormData] = useState({
    type: "EMPLOYEE",
    status: "ACTIVE",
    firstName: "",
    lastName: "",
    totalExperience: "",
    email: "",
    phone: "",
    googleDriveLink: "",
    vendorID: "42929892-0ec9-46d9-9fea-07d34d95dc0f",
    skillInputs: [{ skillID: "", experienceYears: "" }] as SkillInput[],
  });

  // Query to fetch resource data when in edit mode
  const { loading: fetchLoading, error: fetchError, data: resourceData } = useQuery(
    GET_RESOURCE_PROFILE,
    {
      variables: { resourceProfileId },
      skip: !isEditMode || !resourceProfileId, // Skip query if not in edit mode or no ID
    }
  );

  // Mutations for create and update
  const [createResourceProfile, { loading: createLoading, error: createError }] = useMutation(
    CREATE_RESOURCE_PROFILE
  );
  
  const [updateResourceProfile, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_RESOURCE_PROFILE
  );

  // Effect to populate form with existing data when in edit mode
  useEffect(() => {
    if (isEditMode && resourceData?.getResourceProfile) {
      const profile = resourceData.getResourceProfile as ResourceProfile;
      
      console.log("Resource data:", profile);
      console.log("Resource skills:", profile.resourceSkills);
      
      // Parse contact information from JSON string
      let email = "";
      let phone = "";
      try {
        const contactInfo = JSON.parse(profile.contactInformation);
        email = contactInfo.email || "";
        phone = contactInfo.phone || "";
      } catch (error) {
        console.error("Error parsing contact information:", error);
      }
      
      // Transform resource skills to match form structure
      const skillInputs = profile.resourceSkills?.map((item: ResourceSkill) => ({
        skillID: item.skill.skillID,
        experienceYears: item.experienceYears.toString()
      })) || [];
      
      // If no skills, provide at least one empty skill input
      if (skillInputs.length === 0) {
        skillInputs.push({ skillID: "", experienceYears: "" });
      }
      
      setFormData({
        type: profile.type || "EMPLOYEE",
        status: profile.status || "ACTIVE",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        totalExperience: profile.totalExperience?.toString() || "",
        email,
        phone,
        googleDriveLink: profile.googleDriveLink || "",
        vendorID: profile.vendorID || "42929892-0ec9-46d9-9fea-07d34d95dc0f",
        skillInputs
      });
    }
  }, [isEditMode, resourceData]);

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
    if (formData.skillInputs.length > 1) {
      setFormData((prev) => ({
        ...prev,
        skillInputs: prev.skillInputs.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create contactInformation as a JSON string
    const contactInformation = JSON.stringify({
      email: formData.email,
      phone: formData.phone,
    });

    try {
      if (isEditMode && resourceProfileId) {
        // Update existing resource
        // For update, don't include skillInputs at all since it's not in your schema
        const updateData = {
          type: formData.type,
          status: formData.status,
          firstName: formData.firstName,
          lastName: formData.lastName,
          totalExperience: parseFloat(formData.totalExperience) || 0,
          googleDriveLink: formData.googleDriveLink,
          vendorID: formData.vendorID,
          contactInformation,
          // skillInputs: formData.skillInputs
          // .filter(skill => skill.skillID.trim() !== "")
          // .map((skill) => ({
          //   skillID: skill.skillID,
          //   experienceYears: parseFloat(skill.experienceYears) || 0,
          // })),
          // NO skills field for update - your GraphQL schema doesn't support it
        };
        
        await updateResourceProfile({ 
          variables: { 
            resourceProfileID: resourceProfileId,
            input: updateData 
          } 
        });
        alert("Resource updated successfully!");

        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      } else {
        // Create new resource
        const createData = {
          type: formData.type,
          status: formData.status,
          firstName: formData.firstName,
          lastName: formData.lastName,
          totalExperience: parseFloat(formData.totalExperience) || 0,
          googleDriveLink: formData.googleDriveLink,
          vendorID: formData.vendorID,
          contactInformation,
          skillInputs: formData.skillInputs
            .filter(skill => skill.skillID.trim() !== "")
            .map((skill) => ({
              skillID: skill.skillID,
              experienceYears: parseFloat(skill.experienceYears) || 0,
            })),
        };
        
        await createResourceProfile({ 
          variables: { 
            input: createData
          } 
        });
        alert("Resource added successfully!");
      }
      onClose();
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "adding"} resource:`, err);
    }
  };

  // Show loading state while fetching data in edit mode
  if (isEditMode && fetchLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg">
          <p>Loading resource data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="rounded-lg shadow-lg w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-bg-blue-12 rounded-t-2xl p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? "Edit Resource" : "Resource Form"}
          </h2>
          <button
            className="text-white hover:text-gray-200 p-3 rounded-lg"
            onClick={onClose}
          >
            <span className="text-xl font-bold">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white">
          {createError && <p className="text-red-500">Error: {createError.message}</p>}
          {updateError && <p className="text-red-500">Error: {updateError.message}</p>}
          {fetchError && <p className="text-red-500">Error loading resource: {fetchError.message}</p>}
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              >
                {RESOURCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
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
                <input
                  type="text"
                  placeholder="Skill ID"
                  value={skill.skillID}
                  onChange={(e) =>
                    handleSkillChange(index, "skillID", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />

                <input
                  type="number"
                  placeholder="Experience (years)"
                  value={skill.experienceYears}
                  onChange={(e) =>
                    handleSkillChange(index, "experienceYears", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="w-[20px] h-[20px] flex items-center justify-center bg-bg-blue-12 text-white rounded-md"
                >
                  -
                </button>
              </div>
            ))}

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
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? "Saving..." : (isEditMode ? "Update" : "Save")}
          </button>
        </form>
      </div>
    </div>
  );
};