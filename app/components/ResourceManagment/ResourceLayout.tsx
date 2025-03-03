"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Flex, Progress, Rate } from "antd";
import IconButton from "../../microComponents/IconButton";
import { resourcemanagmentApi } from "../../api/apiService/resourcemanagmentApiService";
import { resourcemanagment } from "../../api/jsonService/resourcemanagmentJsonService";
import ResourceDetails from "./ResourceDetails";
import ResourceSkills from "./ResourceSkills";
import ResourceDoc from "./ResourceDoc";
import ResourceNote from "./ResourceNote";

const tabs = ["Details", "Skills & Experience", "Documents", "Notes"];

interface ResourceLayoutProps {
  children: ReactNode;
}

interface Resource {
  name: string;
  isAvailable: boolean;
  designation: string;
  details?: {
    email: string;
    phone: string;
    location: string;
    vendor: string;
    contractType: string;
  };
  performance?: {
    rate: string;
    satisfaction: string;
  };
  overview?: {
    project: string;
    time: string;
  }[];
}

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Details");

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = useDummyData
          ? await resourcemanagmentApi()
          : resourcemanagment();
        setResources({
          ...response,
          details: response.details?.[0], // Extract first element from array
          performance: response.performance?.[0],
        });
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [useDummyData]);

  return (
    <div className="p-4 max-w-[1300px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-black">
            {resources?.name ?? "Loading..."}
          </h1>
          <span className="px-2 bg-bg-blue-12 text-white rounded-md text-md">
            {resources?.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <IconButton icon="edit_logo.svg" text="Edit Profile" />
          <IconButton icon="update_icon.svg" text="Update Status" />
        </div>
      </div>
      <div className="text-gray-text">{resources?.designation ?? "Designation"}</div>

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
          {activeTab === "Details" && <ResourceDetails />}
          {activeTab === "Skills & Experience" && <ResourceSkills />}
          {activeTab === "Documents" && <ResourceDoc />}
          {activeTab === "Notes" && <ResourceNote />}
        </div>

        {/* Recent Activity Section */}
        <div className="w-full md:w-1/3 mt-10 flex-shrink-0 bg-white rounded-2xl p-6 shadow-custom">
          <h3 className="text-blue-600 text-2xl font-bold mb-4">Performance Overview</h3>

          {resources?.performance ? (
            <>
              <Flex vertical gap="small">
                {/* Performance Completion Rate */}
                <div>
                  <p className="text-gray-text mb-2 flex justify-between">
                    <span>Performance Completion Rate</span>
                    <span className="text-xl text-bg-blue-12">{resources?.performance?.rate}</span>
                  </p>
                  <Progress
                    percent={parseFloat(resources?.performance?.rate || "0")}
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
                      value={parseFloat(resources?.performance?.satisfaction || "0") / 20}
                      disabled
                      style={{ color: "#6158FF" }}
                    />
                  </div>
                  <Progress
                    percent={parseFloat(resources?.performance?.satisfaction || "0")}
                    status="active"
                    strokeColor="#6158FF"
                    showInfo={false}
                  />
                </div>
              </Flex>

              {/* Performance Overview */}
              <div className="mt-5">
                <div className="border-b border-content-border"></div>
                <h3 className="text-blue-600 text-2xl font-bold mb-4 mt-5">Performance Overview</h3>
                {resources?.overview?.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mt-6">
                      <img src="right_icon.svg" alt="right" className="mr-6" />
                      <div className="text-gray-text">{item.project}</div>
                      <div className="font-medium text-md text-bg-blue-12 whitespace-nowrap">{item.time}</div>
                    </div>
                    {index !== resources.overview.length - 1 && (
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
