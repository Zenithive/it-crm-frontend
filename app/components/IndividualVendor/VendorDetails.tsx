"use client";
import React, { useState, useEffect } from "react";
import {
  individualvendorPrimary,
  individualvendorSecondary,
  individualvendorAgreement,
  individualvendorLocations,
  individualvendorSkills,
  individualvendorPaymentTerms,
  individualvendorEmployeeCount,
  individualvendorRecentActivity,
} from "../../api/jsonService/individualvendorJsonService";

import {
  individualvendorPrimaryApi,
  individualvendorSecondaryApi,
  individualvendorAgreementApi,
  individualvendorLocationsApi,
  individualvendorSkillsApi,
  individualvendorPaymentTermsApi,
  individualvendorEmployeeCountApi,
  individualvendorRecentActivityApi,
} from "../../api/apiService/individualvendorApiService";
import IconButton from "../../microComponents/IconButton";

import { useRouter } from "next/navigation";

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

interface Agreement {
  startDate: string;
  endDate: string;
  status: string;
}

interface CompanyProfile {
  name?: string;
  isActive?: boolean;
  primaryContact: ContactInfo;
  secondaryContact: ContactInfo;
  agreement: Agreement;
  locations: string[];
  skills: string[];
  paymentTerms: string;
  employeeCount: string;
  recentActivity: Array<{
    type: string;
    title: string;
    timestamp: string;
  }>;
}

const VendorDetails = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [vendorData, setVendorData] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  const handleTabClick = (tab: string) => {
    if (tab === "resource-list") {
      router.push("/individualvendorresource"); // Navigate to VendorResource page
    } else if (tab === "performance") {
      router.push("/individualvendorperformance"); // Navigate to VendorPerformance page
    } else if (tab === "documents") {
      router.push("/individualvendordocuments"); // Navigate to VendorDocuments page
    } else if (tab === "notes") {
      router.push("/individualvendornotes"); // Navigate to VendorNotes page
    } else {
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);

        const primaryContact = useDummyData
          ? await individualvendorPrimaryApi()
          : individualvendorPrimary();
        const secondaryContact = useDummyData
          ? await individualvendorSecondaryApi()
          : individualvendorSecondary();
        const agreement = useDummyData
          ? await individualvendorAgreementApi()
          : individualvendorAgreement();
        const locations = useDummyData
          ? await individualvendorLocationsApi()
          : individualvendorLocations();
        const skills = useDummyData
          ? await individualvendorSkillsApi()
          : individualvendorSkills();
        const paymentTerms = useDummyData
          ? await individualvendorPaymentTermsApi()
          : individualvendorPaymentTerms();
        const employeeCount = useDummyData
          ? await individualvendorEmployeeCountApi()
          : individualvendorEmployeeCount();
        const recentActivity = useDummyData
          ? await individualvendorRecentActivityApi()
          : individualvendorRecentActivity();

        setVendorData({
          name: "Tuvoc Inc", // Hardcoded from second file
          isActive: true, // Hardcoded from second file
          primaryContact,
          secondaryContact,
          agreement,
          locations,
          skills,
          paymentTerms,
          employeeCount,
          recentActivity,
        });
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [useDummyData]);

  const tabs = [
    "details",
    "resource-list",
    "performance",
    "documents",
    "notes",
  ];

  return (
    <div className="p-4 max-w-[1350px] mx-auto">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {vendorData && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-blue-600">
                {vendorData.name || "Individual Vendor Profile"}
              </h1>
              {vendorData.isActive && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Active
                </span>
              )}
            </div>
            <IconButton icon="edit_logo.svg" text="Edit Contact" />
          </div>
          <div className="mb-6 flex">
            <div className="text-md text-bg-gray-13 font-semibold">website</div>
            <img src="/visit_icon.svg" alt="visit" className="ml-1"></img>
          </div>

          {/* Custom Tabs */}
          <div className="w-full">
            <div className="border-b border-gray-100 ">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-1 -mb-px font-medium text-lg capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            {activeTab === "details" && (
              <div className="flex gap-6 mt-6">
                {/* Main Content Card */}
                <div className="w-2/3 bg-white rounded-lg p-6 shadow-custom">
                  {/* Grid Layout */}
                  <div className="grid grid-cols-3 gap-6">
                    {/* First Row */}
                    <div className="p-4 border-r border-content-border">
                      <h3 className="text-blue-600 mb-4  text-xl font-semibold">
                        Primary Contact
                      </h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-gray-500">Email</span>
                          <span>: {vendorData.primaryContact.email}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500">Phone</span>
                          <span>: {vendorData.primaryContact.phone}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500">Location</span>
                          <span>: {vendorData.primaryContact.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className=" p-4">
                      <h3 className="text-blue-600 text-xl font-semibold mb-4">
                        Secondary Contact
                      </h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-gray-500">Email</span>
                          <span>: {vendorData.secondaryContact.email}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500">Phone</span>
                          <span>: {vendorData.secondaryContact.phone}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500">Location</span>
                          <span>: {vendorData.secondaryContact.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block"></div>

                    {/* Second Row */}
                    <div className="p-4  border-r border-content-border">
                      <h3 className="text-blue-600 text-xl font-semibold mb-4">
                        Agreement Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-gray-500">Contract Start</span>
                          <span>: {vendorData.agreement.startDate}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500">Contract End</span>
                          <span>: {vendorData.agreement.endDate}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500">Status</span>
                          <span className="text-green-600">
                            : {vendorData.agreement.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className=" border-r border-content-border p-4">
                      <h3 className="text-blue-600 text-xl font-semibold mb-4">
                        Location
                      </h3>
                      <ul className="space-y-1">
                        {vendorData.locations.map((location, index) => (
                          <li key={index}>• {location}</li>
                        ))}
                      </ul>
                    </div>

                    <div className=" p-4">
                      <h3 className="text-blue-600 text-xl font-semibold mb-4">
                        Skills
                      </h3>
                      <ul className="space-y-1">
                        {vendorData.skills.map((skill, index) => (
                          <li key={index}>• {skill}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Third Row */}
                    <div className=" border-r border-content-border p-4">
                      <h3 className="text-blue-600 text-xl font-semibold mb-4">
                        Payment Cycle
                      </h3>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Payment Terms</span>
                        <span>: {vendorData.paymentTerms}</span>
                      </div>
                    </div>

                    <div className=" p-4">
                      <h3 className="text-blue-600 text-xl font-semibold mb-4">
                        No. Of Employee
                      </h3>
                      <span>{vendorData.employeeCount}</span>
                    </div>
                    {/* Empty cells for balance */}
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                  </div>
                </div>

                {/* Recent Activity Card */}
                <div className="w-1/3 flex-shrink-0 bg-white rounded-lg  p-6 shadow-custom">
                  <h3 className="text-blue-600 text-xl font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4 ">
                    {vendorData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex gap-3 bg-blue_shadow p-4 rounded-2xl"
                      >
                        {activity.type === "review" ? (
                          <img
                            src="/vendor_icon_2.svg"
                            alt="vendor"
                            className="text-blue-600 w-6 h-6 mt-2 ml-3"
                          ></img>
                        ) : (
                          <img
                            src="/vendor_icon_1.svg"
                            alt="vendor"
                            className="text-blue-600 ml-3"
                          ></img>
                        )}
                        <div>
                          <p className="font-medium ml-3">{activity.title}</p>
                          <p className="text-sm text-gray-500 ml-3">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDetails;
