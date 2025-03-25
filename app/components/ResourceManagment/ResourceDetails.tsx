"use client";
import React, { useState } from "react";

interface ResourceDetailsProps {
  resourceData: {
    details?: {
      email: string;
      phone: string;
      location: string;
      vendor: string;
      contractType: string;
    };
  } | null;
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceData }) => {
  const [activeTab] = useState<"details">("details");

  // Extract details from the prop
  const details = resourceData?.details || null;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="w-full ">
          {activeTab === "details" && (
            <div className="flex mr-6 mt-4">
              <div className="bg-white rounded-xlxl p-4 shadow-custom w-full h-[500px]">
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-6 ">
                  {/* Primary Contact */}
                  <div className="p-4">
                    <h3 className="text-bg-blue-12 mb-4 text-xl font-bold">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <span className="">Email:</span>
                        <span>{details?.email || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="">Phone:</span>
                        <span>{details?.phone || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="">Location:</span>
                        <span>{details?.location || "N/A"}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-bg-blue-12 text-xl font-bold mb-4">
                        Vendor Information
                      </h3>
                      <div className="space-y-4">
                        <div className="">{details?.vendor || "N/A"}</div>
                        <div className="">Contract Type: {details?.contractType || "N/A"}</div>
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