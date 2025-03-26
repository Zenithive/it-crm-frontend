"use client";
import React, { useState, useEffect } from "react";
import { Flex, Progress, Rate } from "antd";
import IconButton from "../../microComponents/IconButton";
import { useQuery, useMutation } from "@apollo/client";
import ResourceDetails from "./ResourceDetails";
import ResourceSkills from "./ResourceSkills";
import ResourceDoc from "./ResourceDoc";
import ResourceNote from "./ResourceNote";
import { GET_RESOURCE_PROFILE } from "../../../graphQl/queries/getresourcebyid.queries";
import { UPDATE_RESOURCE_PROFILE } from "../../../graphQl/mutation/updateResource.mutation"; // Import mutation
import { ResourceForm } from "../ResourceList/ResourceForm";

// Mapping between backend and frontend status
const STATUS_MAP = {
  backendToFrontend: {
    "ACTIVE": "Available",
    "INACTIVE": "Not Available",
  },
  frontendToBackend: { // Added for mapping frontend to backend
    "Available": "ACTIVE",
    "Not Available": "INACTIVE",
  },
};

const STATUS_OPTIONS = ["Available", "Not Available"]; // Frontend status options

const tabs = ["Details", "Skills & Experience", "Documents", "Notes"];

interface ResourceLayoutProps {
  ResourceId: string;
}

const dummyResourceProfile = {
  name: "John Doe",
  isAvailable: true,
  designation: "Senior Developer",
  details: {
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    vendor: "Tech Solutions Inc.",
    contractType: "Full-time",
  },
  performance: {
    rate: "85",
    satisfaction: "90",
  },
  overview: [
    { project: "E-commerce Platform", time: "2h ago" },
    { project: "CRM Integration", time: "1d ago" },
    { project: "Mobile App Development", time: "3d ago" },
  ],
};

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ ResourceId }) => {
  const [activeTab, setActiveTab] = useState("Details");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false); // State for dropdown visibility
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // State for selected status

  const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  const { data, loading, error, refetch } = useQuery(GET_RESOURCE_PROFILE, {
    variables: { resourceProfileId: ResourceId },
    skip: useDummyData,
    fetchPolicy: "network-only",
  });

  const [updateResourceProfile, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_RESOURCE_PROFILE
  );

  const [resourceData, setResourceData] = useState<any>(null);

  useEffect(() => {
    if (useDummyData) {
      setResourceData(dummyResourceProfile);
    } else if (data?.getResourceProfile) {
      const profile: { status: keyof typeof STATUS_MAP.backendToFrontend; [key: string]: any } = data.getResourceProfile;
      setResourceData({
        name: `${profile.firstName} ${profile.lastName}`,
        isAvailable: profile.status === "ACTIVE", // Backend value
        designation: profile.type,
        details: {
          email: JSON.parse(profile.contactInformation)?.email || "",
          phone: JSON.parse(profile.contactInformation)?.phone || "",
          location: JSON.parse(profile.contactInformation)?.location || "",
          vendor: profile.vendor?.companyName || "",
          contractType: profile.type,
        },
        performance: {
          rate: "85",
          satisfaction: "90",
        },
        overview: profile.pastProjects.map((project: any) => ({
          project: project.projectName,
          time: new Date(project.updatedAt).toLocaleDateString(),
        })),
        rawProfile: profile,
      });
      // Set initial selected status based on fetched data
      setSelectedStatus(STATUS_MAP.backendToFrontend[profile.status] || "Available");
    } else {
      setResourceData(null);
    }
    console.log("Updated resourceData:", resourceData);
  }, [data, useDummyData]);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  const handleUpdateSuccess = async () => {
    await refetch();
  };

  const handleStatusClick = () => {
    setShowStatusDropdown(!showStatusDropdown); // Toggle dropdown
  };

  const handleStatusChange = async (newStatus: keyof typeof STATUS_MAP.frontendToBackend) => {
    setSelectedStatus(newStatus);
    setShowStatusDropdown(false); // Close dropdown after selection

    try {
      const profile = resourceData.rawProfile;
      const updateData = {
        status: STATUS_MAP.frontendToBackend[newStatus], // Map to backend value
        contactInformation: profile.contactInformation,
      };
      console.log("Updating status to:", updateData.status); // Debug
      const response = await updateResourceProfile({
        variables: {
          resourceProfileID: ResourceId,
          input: updateData,
        },
      });
      console.log("Update response:", response.data); // Debug
      await refetch(); // Refetch to update UI
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-4 max-w-[1300px] mx-auto">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-black">
            {resourceData?.name ?? "Loading..."}
          </h1>
          <span className="px-2 bg-bg-blue-12 text-white rounded-md text-md">
            {resourceData?.isAvailable ? "Available" : "Not Available"} {/* Display frontend value */}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0 relative">
          <IconButton icon="/edit_logo.svg" text="Edit Profile" onClick={handleEditClick} />
          {showEditForm && (
            <ResourceForm
              onClose={handleCloseForm}
              resourceProfileId={ResourceId}
              isEditMode={true}
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
          <div className="relative">
            <IconButton
              icon="/update_icon.svg"
              text="Update Status"
              onClick={handleStatusClick}
            />
            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                {STATUS_OPTIONS.map((status) => (
                  <div
                    key={status}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange(status as keyof typeof STATUS_MAP.frontendToBackend)}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-gray-text">{resourceData?.designation ?? "Designation"}</div>
      <div className="w-full border-b border-gray-100 mt-5">
        <div className="flex overflow-x-auto space-x-6 md:space-x-24">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-1 font-medium text-xl capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-bg-blue-12 text-bg-blue-12"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mt-6 w-full md:w-2/3">
          {activeTab === "Details" && <ResourceDetails resourceData={resourceData} />}
          {activeTab === "Skills & Experience" && <ResourceSkills resourceData={resourceData} />}
          {activeTab === "Documents" && <ResourceDoc resourceData={resourceData}/>}
          {activeTab === "Notes" && <ResourceNote />}
        </div>
        {/* Rest of the component remains unchanged */}
      </div>
    </div>
  );
};

export default ResourceLayout;