"use client";
import React, { useState, useEffect } from "react";

import { individualvendor } from "../../api/jsonService/individualvendorJsonService";
import VendorLayout from "./VendorLayout";
import { useRouter } from "next/navigation";
import useIndividualVendorData from "../../api/apiService/individualvendorApiService";

interface ContactInfo {
  email: string;
  phoneNumber: string;
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
  // primaryContact: ContactInfo;
  // secondaryContact: ContactInfo;
  contactList: ContactInfo[];
  agreement: Agreement;
  // locations: string[];
  address: string[];
  skills: string[];
  paymentTerms: string;
  employeeCount: string;
  recentActivity: Array<{
    type: string;
    title: string;
    timestamp: string;
  }>;
}

const VendorDetails = ({ vendorId }: { vendorId: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [vendorData, setVendorData] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const useDummyData =
  //   process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  const {
    vendor,
    loading: vendorLoading,
    error: vendorError,
  } = useIndividualVendorData(vendorId);

  // console.log(vendor);

  // useEffect(() => {
  //   const fetchVendorData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = useDummyData
  //                 ? await individualvendorApi()
  //                 : individualvendor();
  //       setVendorData(response);
  //       console.log(response);
  //     } catch (err) {
  //       console.error("Error fetching resources:", err);
  //       setError("Failed to load resources");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVendorData();
  // }, []);
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
    <>
      <div className="">
        {vendorData && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <div className="w-full">
                {activeTab === "details" && (
                  <div className="mr-4">
                    <div className=" bg-white rounded-2xl p-4 shadow-custom">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="p-4 border-r border-content-border">
                          <h3 className="text-blue-600 mb-4  text-xl font-semibold">
                            Primary Contact
                          </h3>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <span className="text-gray-500">Email</span>
                              <span>: {vendorData.contactList[0]?.email}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-500">Phone</span>
                              <span>
                                : {vendorData.contactList[0]?.phoneNumber}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-500">Location</span>
                              <span>
                                : {vendorData.contactList[0]?.location}
                              </span>
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
                              <span>: {vendorData.contactList[1]?.email}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-500">Phone</span>
                              <span>
                                : {vendorData.contactList[1]?.phoneNumber}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-500">Location</span>
                              <span>
                                : {vendorData.contactList[1]?.location}
                              </span>
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
                              <span className="text-gray-500">
                                Contract Start
                              </span>
                              <span>: {vendorData.agreement?.startDate}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-500">
                                Contract End
                              </span>
                              <span>: {vendorData.agreement?.endDate}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-500">Status</span>
                              <span className="text-green-600">
                                : {vendorData.agreement?.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className=" border-r border-content-border p-4">
                          <h3 className="text-blue-600 text-xl font-semibold mb-4">
                            Location
                          </h3>
                          <ul className="space-y-1">
                            {/* {vendorData.address?.map((location, index) => (
                              <li key={index}>• {location}</li>
                            ))} */}

                            <li>•{vendorData.address}</li>
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
