"use client";
import React, { useState, useEffect } from "react";
import VendorLayout from "./VendorLayout";
// import { individualvendorApi } from "../../api/apiService/individualvendorApiService";
import { individualvendor } from "../../api/jsonService/individualvendorJsonService";

interface Performance {
  projectCompleted: string;
  onTimeDelivery: string;
  qualityScore: string;
}

const VendorPerformance = ({ vendorId}: { vendorId:String  }) => {
  const [performance, setPerformance] = useState<Performance[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response =  individualvendor();

        const performanceData = response?.performance ?? [];
        setPerformance(Array.isArray(performanceData) ? performanceData : []);
        
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
  
      <div className=" bg-white rounded-2xl p-6 shadow-custom min-h-[400px] mr-4 mt-4">
        <div className="grid grid-cols-3 gap-6">
          <div className=" border-r border-content-border">
            <div className="text-bg-blue-12 font-semibold text-2xl items-center justify-center flex">
              Project Completed
            </div>
            <div className="items-center justify-center flex">
              {" "}
              {performance[0]?.projectCompleted}
            </div>
          </div>

          <div className=" border-r border-content-border">
            <div className="text-bg-blue-12 font-semibold text-2xl items-center justify-center flex">
              On-Time Delivery
            </div>
            <div className="items-center justify-center flex">
              {" "}
              {performance[0]?.onTimeDelivery}
            </div>
            <div className=" "></div>
          </div>

          <div className="">
            <div className="text-bg-blue-12 font-semibold text-2xl items-center justify-center flex">
              Quality Score
            </div>
            <div className="items-center justify-center flex">
              {" "}
              {performance[0]?.qualityScore}
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default VendorPerformance;
