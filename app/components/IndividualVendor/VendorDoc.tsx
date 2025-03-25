"use client";
import React, { useState, useEffect } from "react";
import VendorLayout from "./VendorLayout";

import { individualvendor } from "../../api/jsonService/individualvendorJsonService";

interface Document {
  name: string;
  url: string;
  date: string;
  designation: string;
}

const VendorDoc = ({ vendorId}: { vendorId:String  }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = 
         
     individualvendor();

          const documentsData = response?.documents ?? [];  
          setDocuments(Array.isArray(documentsData) ? documentsData : []);          

        
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [useDummyData]);

  return (
   
      <div className="bg-white rounded-xl p-6 shadow-custom mr-4 mt-4">
        <div className="flex flex-col bg-white min-h-[210px]">
          {/* Scrollable Content */}
          <div className="flex-1 px-4 pb-4 mt-2">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : documents.length === 0 ? (
              <p className="text-center text-gray-500">
                No documents available
              </p>
            ) : (
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow-custom bg-white"
                  >
                    {/* Main Row: Image, Name, Designation, Download Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 w-1/3">
                        {/* Document Icon */}
                        <div className="w-10 h-10 flex items-center justify-center">
                          <img src="/vendor_icon_1.svg" alt="Document" />
                        </div>

                        {/* Name and Date (Stacked) */}
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-semibold text-md">
                            {doc.name}
                          </span>
                          <span className="text-bg-blue-12 text-md ">
                            {doc.date}
                          </span>
                        </div>
                      </div>

                      {/* Designation - Centered */}
                      <div className="flex-1 flex justify-center">
                        <span className="text-black bg-blue-shadow px-3 py-1 rounded-md text-md">
                          {doc.designation}
                        </span>
                      </div>

                      {/* Download Button */}
                      <div className="w-1/3 flex justify-end">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 font-semibold hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6">
              <button className="flex items-center justify-center bg-bg-blue-12 text-white rounded-lg p-2">
                <img src="/upload_icon.svg" alt="Upload"></img>
                <div className="text-white ml-2">Upload Document</div>
              </button>
            </div>
          </div>
        </div>
      </div>

  );
};

export default VendorDoc;
