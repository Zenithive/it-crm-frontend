"use client";
import React, { useState, useEffect } from "react";
import { resourcemanagmentApi } from "../../api/apiService/resourcemanagmentApiService";
import { resourcemanagment } from "../../api/jsonService/resourcemanagmentJsonService";

interface Details {
  email: string;
  phone: string;
  location: string;
  vendor: string;
  contractType: string;
}

const ResourceDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"details">("details");
  const [resourceData, setResourceData] = useState<Details | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchVendorData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = useDummyData
          ? await resourcemanagmentApi()
          : await resourcemanagment();
        setResourceData(response);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [useDummyData]);


  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="w-full ">
          {activeTab === "details" && (
            <div className="flex mr-6 mt-4">
              <div className="bg-white rounded-2xl p-4 shadow-custom w-full h-[500px]">
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-6 ">
                  {/* Primary Contact */}
                  <div className="p-4">
                    <h3 className="text-blue-600 mb-4 text-xl font-bold">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <span className="">Email:</span>
                        <span>{resourceData?.email || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="">Phone:</span>
                        <span>{resourceData?.phone || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="">Location:</span>
                        <span>{resourceData?.location || "N/A"}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-blue-600 text-xl font-bold mb-4">
                        Vendor Information
                      </h3>
                      <div className="space-y-4">
                        <div className="">{resourceData?.vendor || "N/A"}</div>
                        <div className="">Contract Type: {resourceData?.contractType || "N/A"}</div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* End of Grid */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
