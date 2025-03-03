"use client";
import React, { useState, useEffect } from "react";
import { individualvendorApi } from "../../api/apiService/individualvendorApiService";
import {individualvendor} from "../../api/jsonService/individualvendorJsonService";
import VendorLayout from "./VendorLayout";
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

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        const response = useDummyData
                  ? await individualvendorApi()
                  : individualvendor();
        setVendorData(response);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  return (
  <>
 
      <div className="">
        {vendorData && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <div className="w-full">
                {activeTab === "details" && (
                  <div className="flex">
                    <div className=" bg-white rounded-2xl p-4 shadow-custom">
                      <div className="grid grid-cols-3 gap-6">
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
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    
    </>
  );
};

export default VendorDetails;
