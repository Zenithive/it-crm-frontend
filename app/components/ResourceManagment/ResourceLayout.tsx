"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Flex, Progress, Rate } from "antd";
import IconButton from "../../microComponents/IconButton";
import axios from "axios";
import ResourceDetails from "./ResourceDetails";
import ResourceSkills from "./ResourceSkills";
import ResourceDoc from "./ResourceDoc";
import ResourceNote from "./ResourceNote";

const tabs = ["Details", "Skills & Experience", "Documents", "Notes"];

interface ResourceLayoutProps {
  ResourceId: string;
}

interface ResourceProfile {
  resourceProfileID: string;
  type: string;
  firstName: string;
  lastName: string;
  totalExperience: number;
  contactInformation: string;
  googleDriveLink: string;
  status: string;
  vendorID: string;
  vendor: {
    vendorID: string;
    companyName: string;
  };
  resourceSkills: Array<{
    skill: {
      skillID: string;
      name: string;
      description: string;
      skilltype: string;
    };
    experienceYears: number;
  }>;
  pastProjects: Array<{
    pastProjectID: string;
    createdAt: string;
    updatedAt: string;
    resourceProfileID: string;
    projectName: string;
    description: string;
  }>;
}

// Add dummy data for development
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
  console.log(`ResourceId`, ResourceId);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [resourceProfile, setResourceProfile] = useState<ResourceProfile | null>(null);
  const [resourceData, setResourceData] = useState<any>(null);
  console.log(`resourceData`, resourceData);
  const [activeTab, setActiveTab] = useState<string>("Details");

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchResourceProfile = async () => {
      try {
        setLoading(true);
        
        if (useDummyData) {
          // Use dummy data for development
          setResourceData(dummyResourceProfile);
          setLoading(false);
          return;
        }
        
        // GraphQL query
        const query = `
          query GetResourceProfile($resourceProfileId: ID!) {
            getResourceProfile(resourceProfileID: $resourceProfileId) {
              resourceProfileID
              type
              firstName
              lastName
              totalExperience
              contactInformation
              googleDriveLink
              status
              vendorID
              vendor {
                vendorID
                companyName
              }
              resourceSkills {
                skill {
                  skillID
                  name
                  description
                  skilltype
                }
                experienceYears
              }
              pastProjects {
                pastProjectID
                createdAt
                updatedAt
                resourceProfileID
                projectName
                description
              }
            }
          }
        `;
        
        const variables = {
          resourceProfileId: ResourceId
        };
        
        const response = await axios.post(
          'https://crmbackendapis.onrender.com/graphql',
          {
            query,
            variables
          },
          {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDI0NDg1MjMsIm5hbWUiOiJkZW1vIiwicm9sZSI6IkFETUlOIiwidXNlcl9pZCI6IjljYjA3YmFmLWI2OGItNDY4MC1iY2E3LTA3NWQ3Y2E2ZDFhOSJ9.5LrwEngmYGIvrP2-e_8UfDxqF7twhLyB9kj61-B1PW0',
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        
        const fetchedProfile = response.data.data.getResourceProfile;
        setResourceProfile(fetchedProfile);
        
        // Transform data to match the component's expected format
        const formattedData = {
          name: `${fetchedProfile.firstName} ${fetchedProfile.lastName}`,
          isAvailable: fetchedProfile.status === "AVAILABLE",
          designation: fetchedProfile.type,
          details: {
            email: JSON.parse(fetchedProfile.contactInformation)?.email || "",
            phone: JSON.parse(fetchedProfile.contactInformation)?.phone || "",
            location: JSON.parse(fetchedProfile.contactInformation)?.location || "",
            vendor: fetchedProfile.vendor?.companyName || "",
            contractType: fetchedProfile.type,
          },
          performance: {
            rate: "85", // Example data, replace with actual if available
            satisfaction: "90", // Example data, replace with actual if available
          },
          overview: fetchedProfile.pastProjects.map((project: { projectName: any; updatedAt: string | number | Date; }) => ({
            project: project.projectName,
            time: new Date(project.updatedAt).toLocaleDateString()
          })),
          resourceSkills: fetchedProfile.resourceSkills,
          googleDriveLink: fetchedProfile.googleDriveLink,
          pastProjects: fetchedProfile.pastProjects,
        };
        
        setResourceData(formattedData);
      } catch (err) {
        console.error("Error fetching resource profile:", err);
        setError("Failed to load resource profile");
      } finally {
        setLoading(false);
      }
    };

    if (ResourceId) {
      fetchResourceProfile();
    }
  }, [ResourceId, useDummyData]);

  return (
    <div className="p-4 max-w-[1300px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-black">
            {resourceData?.name ?? "Loading..."}
          </h1>
          <span className="px-2 bg-bg-blue-12 text-white rounded-md text-md">
            {resourceData?.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <IconButton icon="edit_logo.svg" text="Edit Profile" />
          <IconButton icon="update_icon.svg" text="Update Status" />
        </div>
      </div>
      <div className="text-gray-text">{resourceData?.designation ?? "Designation"}</div>

      {/* Tabs Navigation */}
      <div className="w-full border-b border-gray-100 mt-5">
        <div className="flex overflow-x-auto space-x-6 md:space-x-24">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-1 font-medium text-xl capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex flex-col md:flex-row">
        <div className="mt-6 w-full md:w-2/3">
          {activeTab === "Details" && <ResourceDetails resourceData={resourceData} />}
          {activeTab === "Skills & Experience" && <ResourceSkills resourceData={resourceData} />}
          {activeTab === "Documents" && <ResourceDoc />}
          {activeTab === "Notes" && <ResourceNote  />}
        </div>

        {/* Recent Activity Section */}
        <div className="w-full md:w-1/3 mt-10 flex-shrink-0 bg-white rounded-2xl p-6 shadow-custom">
          <h3 className="text-blue-600 text-2xl font-bold mb-4">Performance Overview</h3>

          {resourceData?.performance ? (
            <>
              <Flex vertical gap="small">
                {/* Performance Completion Rate */}
                <div>
                  <p className="text-gray-text mb-2 flex justify-between">
                    <span>Performance Completion Rate</span>
                    <span className="text-xl text-bg-blue-12">{resourceData?.performance?.rate}%</span>
                  </p>
                  <Progress
                    percent={parseFloat(resourceData?.performance?.rate || "0")}
                    status="active"
                    strokeColor="#6158FF"
                    showInfo={false}
                  />
                </div>

                {/* Client Satisfaction */}
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-text mb-2">Client Satisfaction</span>
                    <Rate
                      allowHalf
                      value={parseFloat(resourceData?.performance?.satisfaction || "0") / 20}
                      disabled
                      style={{ color: "#6158FF" }}
                    />
                  </div>
                  <Progress
                    percent={parseFloat(resourceData?.performance?.satisfaction || "0")}
                    status="active"
                    strokeColor="#6158FF"
                    showInfo={false}
                  />
                </div>
              </Flex>

              {/* Performance Overview */}
              <div className="mt-5">
                <div className="border-b border-content-border"></div>
                <h3 className="text-blue-600 text-2xl font-bold mb-4 mt-5">Project History</h3>
                {resourceData?.overview?.map((item: { project: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; time: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mt-6">
                      <img src="right_icon.svg" alt="right" className="mr-6" />
                      <div className="text-gray-text">{item.project}</div>
                      <div className="font-medium text-md text-bg-blue-12 whitespace-nowrap">{item.time}</div>
                    </div>
                    {resourceData?.overview && index !== resourceData.overview.length - 1 && (
                      <div className="border-b border-content-border mt-4 mb-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No performance data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceLayout;
