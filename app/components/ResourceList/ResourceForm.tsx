"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RESOURCE_PROFILE } from "../../../graphQl/mutation/addResource.mutation";
import { UPDATE_RESOURCE_PROFILE } from "../../../graphQl/mutation/updateResource.mutation";
import { GET_RESOURCE_PROFILE } from "../../../graphQl/queries/getresourcebyid.queries";
import PubSub from "../../pubsub/Pubsub";

// Define type and status constants
const RESOURCE_TYPES = ["CONSULTANT", "FREELANCER", "CONTRACTOR", "EMPLOYEE"];
const STATUS_OPTIONS = ["Available", "Not Available"];

const STATUS_MAP = {
  frontendToBackend: {
    "Available": "ACTIVE",
    "Not Available": "INACTIVE",
  },
  backendToFrontend: {
    "ACTIVE": "Available",
    "INACTIVE": "Not Available",
  },
};

// Define interfaces
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

interface ResourceFormData {
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  totalExperience: string;
  email: string;
  phone: string;
  googleDriveLink: string;
  vendorID: string;
  skillInputs: SkillInput[];
}

interface ResourceFormProps {
  onClose: () => void;
  resourceProfileId?: string;
  isEditMode?: boolean;
  onUpdateSuccess?: () => void;
  onSubmitSuccess?: () => void;
}

export const ResourceForm: React.FC<ResourceFormProps> = ({
  onClose,
  resourceProfileId,
  isEditMode = false,
  onUpdateSuccess ,
  onSubmitSuccess 
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ResourceFormData>({
    defaultValues: {
      type: "EMPLOYEE",
      status: "Available",
      firstName: "",
      lastName: "",
      totalExperience: "",
      email: "",
      phone: "",
      googleDriveLink: "",
      vendorID: "42929892-0ec9-46d9-9fea-07d34d95dc0f",
      skillInputs: [{ skillID: "", experienceYears: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skillInputs",
  });

  const { loading: fetchLoading, error: fetchError, data: resourceData } = useQuery(
    GET_RESOURCE_PROFILE,
    {
      variables: { resourceProfileId },
      skip: !isEditMode || !resourceProfileId,
    }
  );

  const [createResourceProfile, { loading: createLoading, error: createError }] = useMutation(
    CREATE_RESOURCE_PROFILE
  );

  const [updateResourceProfile, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_RESOURCE_PROFILE
  );

  useEffect(() => {
    if (isEditMode && resourceData?.getResourceProfile) {
      const profile = resourceData.getResourceProfile as ResourceProfile;
      let email = "";
      let phone = "";
      try {
        const contactInfo = JSON.parse(profile.contactInformation);
        email = contactInfo.email || "";
        phone = contactInfo.phone || "";
      } catch (error) {
        console.error("Error parsing contact information:", error);
      }

      const skillInputs = profile.resourceSkills?.map((item: ResourceSkill) => ({
        skillID: item.skill.skillID,
        experienceYears: item.experienceYears.toString(),
      })) || [{ skillID: "", experienceYears: "" }];

      setValue("type", profile.type || "EMPLOYEE");
      setValue(
        "status",
        STATUS_MAP.backendToFrontend[profile.status as keyof typeof STATUS_MAP.backendToFrontend] || "Available"
      );
      setValue("firstName", profile.firstName || "");
      setValue("lastName", profile.lastName || "");
      setValue("totalExperience", profile.totalExperience?.toString() || "");
      setValue("email", email);
      setValue("phone", phone);
      setValue("googleDriveLink", profile.googleDriveLink || "");
      setValue("vendorID", profile.vendorID || "42929892-0ec9-46d9-9fea-07d34d95dc0f");
      setValue("skillInputs", skillInputs);
    }
  }, [isEditMode, resourceData, setValue]);

  const onSubmit: SubmitHandler<ResourceFormData> = async (data) => {
    const contactInformation = JSON.stringify({
      email: data.email,
      phone: data.phone,
    });

    try {
      if (isEditMode && resourceProfileId) {
        const updateData = {
          type: data.type,
          status: STATUS_MAP.frontendToBackend[data.status as keyof typeof STATUS_MAP.frontendToBackend],
          firstName: data.firstName,
          lastName: data.lastName,
          totalExperience: parseFloat(data.totalExperience) || 0,
          googleDriveLink: data.googleDriveLink,
          vendorID: data.vendorID,
          contactInformation,
          skillInputs: data.skillInputs
            .filter((skill) => skill.skillID.trim() !== "")
            .map((skill) => ({
              skillID: skill.skillID,
              experienceYears: parseFloat(skill.experienceYears) || 0,
            })),
        };

        await updateResourceProfile({
          variables: {
            resourceProfileID: resourceProfileId,
            input: updateData,
          },
        });
      
        if (onUpdateSuccess) {  try{onUpdateSuccess();

           
        PubSub.publish("RESOURCE_UPDATE_SUCCESS", { 
          
          resourceName: `${data.firstName} ${data.lastName}`,
          
        
        });}catch(error){
          PubSub.publish("RESOURCE_UPDATE_ERROR", { 
          
            resourceName: `${data.firstName} ${data.lastName}`,
            
          
          })

        }
        }

      } else {
        const createData = {
          type: data.type,
          status: STATUS_MAP.frontendToBackend[data.status as keyof typeof STATUS_MAP.frontendToBackend],
          firstName: data.firstName,
          lastName: data.lastName,
          totalExperience: parseFloat(data.totalExperience) || 0,
          googleDriveLink: data.googleDriveLink,
          vendorID: data.vendorID,
          contactInformation,
          skillInputs: data.skillInputs
            .filter((skill) => skill.skillID.trim() !== "")
            .map((skill) => ({
              skillID: skill.skillID,
              experienceYears: parseFloat(skill.experienceYears) || 0,
            })),
        };

        await createResourceProfile({
          variables: { input: createData },
        });
       

        if (onSubmitSuccess) {

          try{
          onSubmitSuccess();
          PubSub.publish("RESOURCE_ADD_SUCCESS", { 
          
            resourceName: `${data.firstName} ${data.lastName}`,
            
          
          });}catch(error){
            PubSub.publish("RESOURCE_ADD_ERROR", { 
          
              resourceName: `${data.firstName} ${data.lastName}`,
              
            
            })

          }
        }
      }
      onClose();
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "adding"} resource:`, err);
    }
  };

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
        <div className="bg-bg-blue-12 rounded-t-xl p-2 flex justify-between">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">
              {isEditMode ? "Edit Resource" : "Resource Form"}
            </h2>
          </div>
          <div className="p-2">
            <button
              className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
              onClick={onClose}
            >
              <img src="/cross_icon.svg" alt="Cross" className="h-3 w-3" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white">
          {createError && <p className="text-red-500">Error: {createError.message}</p>}
          {updateError && <p className="text-red-500">Error: {updateError.message}</p>}
          {fetchError && <p className="text-red-500">Error loading resource: {fetchError.message}</p>}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">Type</label>
              <select
                {...register("type", { required: "Type is required" })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              >
                {RESOURCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <span className="text-red-500 text-sm">{errors.type.message}</span>
              )}
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Minimum 2 characters required" },
                })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Minimum 2 characters required" },
                })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">Phone</label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
            <div>
              <label className="block text-base font-medium text-bg-blue-12 mb-1">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm">{errors.status.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Total Experience (years)
              </label>
              <input
                type="number"
                {...register("totalExperience", {
                  required: "Total experience is required",
                  min: { value: 0, message: "Experience must be 0 or greater" },
                })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
              {errors.totalExperience && (
                <span className="text-red-500 text-sm">{errors.totalExperience.message}</span>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-base font-medium text-bg-blue-12 mb-1">
                Google Drive Link
              </label>
              <input
                {...register("googleDriveLink", {
                  pattern: {
                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                    message: "Enter a valid URL",
                  },
                })}
                className="w-full px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
              />
              {errors.googleDriveLink && (
                <span className="text-red-500 text-sm">{errors.googleDriveLink.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-bg-blue-12 mb-1">Skills</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <input
                  {...register(`skillInputs.${index}.skillID`, {
                    required: "Skill ID is required",
                  })}
                  placeholder="Skill ID"
                  className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />
                {errors.skillInputs?.[index]?.skillID && (
                  <span className="text-red-500 text-sm">
                    {errors.skillInputs[index].skillID.message}
                  </span>
                )}

                <input
                  type="number"
                  {...register(`skillInputs.${index}.experienceYears`, {
                    required: "Experience years are required",
                    min: { value: 0, message: "Experience must be 0 or greater" },
                  })}
                  placeholder="Experience (years)"
                  className="flex-1 px-3 py-2 border border-bg-blue-12 rounded-lg focus:outline-none"
                />
                {errors.skillInputs?.[index]?.experienceYears && (
                  <span className="text-red-500 text-sm">
                    {errors.skillInputs[index].experienceYears.message}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="w-[20px] h-[20px] flex items-center justify-center bg-bg-blue-12 text-white rounded-md disabled:opacity-50"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ skillID: "", experienceYears: "" })}
              className="text-base font-medium text-bg-blue-12 mt-2"
            >
              + Add Skill
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-bg-blue-12 text-white py-2 rounded"
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? "Saving..." : isEditMode ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};