"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { individualcasestudyDocApi } from "../../api/apiService/individualcasestudyApiServices";
import { resourcemanagment } from "../../api/jsonService/resourcemanagmentJsonService";
import { ResourceSkillsProps } from "./ResourceSkills";
import DocumentUploadForm from "../Uploadfile";

// Define the document structure from your JSON
interface DocumentData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  filePath: string;
  fileSize: string;
  fileType: string;
  reference: string;
  referenceType: string;
  tags: string[] | null;
  userId: string;
  deletedAt: null | string;
}

// Component props interface
interface Document {
  title: ReactNode;
  createdAt: ReactNode;
  name: string;
  url: string;
  date: string;
  designation: string;
}

const ResourceDoc: React.FC<ResourceSkillsProps> = ({ resourceData }) => {
  const [rawDocuments, setRawDocuments] = useState<DocumentData[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA1?.trim().toLowerCase() === "true";

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Transform raw document data to the format expected by the component
  const transformDocuments = (rawDocs: DocumentData[]) => {
    // Use optional chaining and provide a fallback empty object
    const resourceProfileID = resourceData?.rawProfile?.resourceProfileID ?? '';
    
    // Filter documents if resourceProfileID exists
    const resourceDocs = resourceProfileID
      ? rawDocs.filter(doc => 
          doc.referenceType === "RESOURCE" && 
          doc.reference === resourceProfileID
        )
      : rawDocs;
    
    return resourceDocs.map(doc => ({
      title: doc.title,
      createdAt: formatDate(doc.createdAt),
      name: doc.title,
      url: doc.filePath, // You might need to prepend a base URL here
      date: formatDate(doc.createdAt),
      designation: doc.referenceType,
    }));
  };

  // Move fetchData outside of useEffect so it can be called from other functions
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Get raw documents from API or dummy data
      let rawDocsData;
      if (useDummyData) {
        // For testing, use the JSON data you provided
        rawDocsData = await individualcasestudyDocApi(resourceData?.rawProfile?.resourceProfileID);
      } else {
        rawDocsData = await resourcemanagment();
      }
      
      // Store raw documents
      setRawDocuments(Array.isArray(rawDocsData) ? rawDocsData : []);
      
      // Transform documents for display
      const transformedDocs = transformDocuments(
        Array.isArray(rawDocsData) ? rawDocsData : []
      );
      setDocuments(transformedDocs);
      
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [useDummyData, resourceData?.rawProfile?.resourceProfileID]);

  const handleAddDocumentClick = () => {
    setIsUploadFormOpen(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormOpen(false);
  };

  const handleDocumentAdded = () => {
    // Refresh document list after successful upload
    fetchData();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-6 shadow-custom mt-4 mr-6">
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
                            {doc.title}
                          </span>
                          <span className="text-bg-blue-12 text-md">
                            {doc.createdAt}
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
                          className="text-bg-blue-12 font-semibold hover:underline"
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
              <button 
                onClick={handleAddDocumentClick} 
                className="flex items-center justify-center bg-bg-blue-12 text-white rounded-lg p-2"
              >
                <img src="/upload_icon.svg" alt="Upload" />
                <div className="text-white ml-2">Upload Document</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render UploadFile component when showUploadFile is true */}
      {isUploadFormOpen && (
        <DocumentUploadForm
          isOpen={isUploadFormOpen}
          referenceType="RESOURCE"
          onClose={handleCloseUploadForm}
          referenceID={resourceData?.rawProfile?.resourceProfileID || ''}
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  );
};

export default ResourceDoc;