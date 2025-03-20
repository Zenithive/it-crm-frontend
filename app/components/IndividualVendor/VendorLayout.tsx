"use client";
import React, { useState, useEffect } from "react";
import IconButton from "../../microComponents/IconButton";
import VendorDetails from "./VendorDetails";
import VendorResourceList from "./VendorResourceList";
import VendorPerformance from "./VendorPerformance";
import VendorDocuments from "./VendorDoc";
import VendorNotes from "./VendorNotes";

// import {
//   individualvendor,
// } from "../../api/jsonService/individualvendorJsonService";
import useIndividualVendorData from "../../api/apiService/individualvendorApiService";

const tabs = [
  { label: "Details", key: "details" },
  { label: "Resource List", key: "resourceList" },
  { label: "Performance", key: "performance" },
  { label: "Documents", key: "documents" },
  { label: "Notes", key: "notes" },
];

interface VendorLayoutProps {
  vendorId: string;
}

interface CompanyProfile {
  companyName: string;
status: string;
  primaryContact: {
    email: string;
    phone: string;
    location: string;
  };
  agreement: {
    startDate: string;
    endDate: string;
    status: string;
  };
  // locations: string[];
  address: string;
  skills: string[];
  paymentTerms: string;
  employeeCount: string;
  recentActivity: Array<{
    type: string;
    title: string;
    timestamp: string;
  }>;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ vendorId }) => {
  const [activeTab, setActiveTab] = useState("details"); // Default active tab
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState<CompanyProfile | null>(null);

  // const useDummyData =
  //   process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  // useEffect(() => {
  //   const fetchVendorData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = useDummyData
  //         ? await individualvendorApi()
  //         : individualvendor();
  //       setVendorData(response);
  //     } catch (err) {
  //       console.error("Error fetching resources:", err);
  //       setError("Failed to load resources");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVendorData();
  // }, []);
  const { vendor, loading: vendorLoading, error: vendorError } = useIndividualVendorData(vendorId);
  useEffect(() => {
      if (vendor) {
        setVendorData(vendor);
        setLoading(vendorLoading);
        if (vendorError) {
          setError(vendorError);
        }
      }
    }, [vendor, vendorLoading, vendorError]);

  return (
    <div className="p-4 max-w-[1300px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-bg-blue-12">
            {vendorData?.companyName ?? "Loading..."}
          </h1>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {/* {vendorData?.isActive ? "Active" : "Inactive"} */}
            {vendorData?.status ?? "Status not available"}
          </span>
        </div>
        <IconButton icon="/edit_logo.svg" text="Edit Contact" />
      </div>

      {/* Primary Contact */}
      <div className="mb-6 flex">
        <div className="text-md text-bg-gray-13 font-semibold">
          {/* {vendorData?.primaryContact?.location ?? "Location not available"} */}

          {vendorData?.address ?? "Location not available"}
        </div>
        <img src="/visit_icon.svg" alt="visit" className="ml-1"></img>
      </div>

      {/* Tabs Navigation */}
      <div className="w-full border-b border-gray-100">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`py-2 px-1 -mb-px font-medium text-xl capitalize ${
                activeTab === tab.key
                  ? "border-b-2 border-bg-blue-12 text-bg-blue-12"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)} // Update state instead of routing
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex">
        <div className="mt-6 w-2/3">
          <div className={activeTab === "details" ? "block" : "hidden"}>
            <VendorDetails vendorId={vendorId}/>
          </div>
          <div className={activeTab === "resourceList" ? "block" : "hidden"}>
            <VendorResourceList vendorId={vendorId}/>
          </div>
          <div className={activeTab === "performance" ? "block" : "hidden"}>
            <VendorPerformance vendorId={vendorId} />
          </div>
          <div className={activeTab === "documents" ? "block" : "hidden"}>
            <VendorDocuments vendorId={vendorId} />
          </div>
          <div className={activeTab === "notes" ? "block" : "hidden"}>
            <VendorNotes vendorId={vendorId}/>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="w-1/3 mt-10 flex-shrink-0 bg-white rounded-2xl p-6 shadow-custom">
          <h3 className="text-bg-blue-12 text-xl font-semibold mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {vendorData?.recentActivity?.length ? (
              vendorData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-blue_shadow p-4 rounded-2xl"
                >
                  <img
                    src={
                      activity.type === "review"
                        ? "/vendor_icon_2.svg"
                        : "/vendor_icon_1.svg"
                    }
                    alt="vendor"
                    className="text-bg-blue-12 w-6 h-6 mt-2 ml-3"
                  />
                  <div>
                    <p className="font-medium ml-3">{activity.title}</p>
                    <p className="text-sm text-gray-500 ml-3">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
