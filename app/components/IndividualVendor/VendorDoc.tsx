"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { individualcasestudyDocApi } from "../../api/apiService/individualcasestudyApiServices";
import DocumentUploadForm from "../uploadfile";

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

interface Document {
  id: string;
  title: ReactNode;
  createdAt: ReactNode;
  name: string;
  url: string;
  date: string;
  designation: string;
}

const VendorDoc = ({ vendorId }: { vendorId: string }) => {
  const [rawDocuments, setRawDocuments] = useState<DocumentData[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string>("");

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA1?.trim().toLowerCase() === "true";

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const transformDocuments = (rawDocs: DocumentData[]) => {
    const vendorDocs = rawDocs.filter(
      (doc) => doc.referenceType === "VENDOR" && doc.reference === vendorId
    );

    return vendorDocs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      createdAt: formatDate(doc.createdAt),
      name: doc.title,
      url: doc.filePath,
      date: formatDate(doc.createdAt),
      designation: doc.referenceType,
    }));
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let rawDocsData;

      if (useDummyData) {
        rawDocsData = await individualcasestudyDocApi(vendorId);
      } else {
        rawDocsData = await individualcasestudyDocApi(vendorId);
      }

      setRawDocuments(Array.isArray(rawDocsData) ? rawDocsData : []);

      const transformedDocs = transformDocuments(
        Array.isArray(rawDocsData) ? rawDocsData : []
      );
      setDocuments(transformedDocs);
   
    } catch (err) {
      console.error("Error fetching vendor documents:", err);
  
      setError("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  // Download function implementation
  const downloadFile = (fileId: string, filename: string) => {
    setDownloadMessage("Starting download...");
    
    const token = localStorage.getItem('token') || ''; // Get the token from localStorage
    
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/download?id=${fileId}`, {
      method: "GET",
      headers: { Authorization: token },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server Error: ${text}`);
          });
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setDownloadMessage("Download started.");
      })
      .catch((error) => {
        setDownloadMessage("Download failed: " + error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [useDummyData, vendorId]);

  const handleAddDocumentClick = () => {
    setIsUploadFormOpen(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormOpen(false);
  };

  const handleDocumentAdded = () => {
    fetchData();           
   
   
    // Refresh after upload
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-6 shadow-custom mt-4 mr-6">
        <div className="flex flex-col bg-white min-h-[210px]">
          <div className="flex-1 px-4 pb-4 mt-2">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : documents.length === 0 ? (
              <p className="text-center text-gray-500">No documents available</p>
            ) : (
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow-custom bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 w-1/3">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <img src="/vendor_icon_1.svg" alt="Document" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-semibold text-md">
                            {doc.title}
                          </span>
                          <span className="text-bg-blue-12 text-md">
                            {doc.createdAt}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <span className="text-black bg-blue-shadow px-3 py-1 rounded-md text-md">
                          {doc.designation}
                        </span>
                      </div>
                      <div className="w-1/3 flex justify-end">
                        <button
                          onClick={() => downloadFile(doc.id, String(doc.title))}
                          className="text-blue-700 font-semibold hover:underline"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {downloadMessage && (
              <div className="mt-3 text-sm text-gray-600">{downloadMessage}</div>
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

      {isUploadFormOpen && (
        <DocumentUploadForm
          isOpen={isUploadFormOpen}
          referenceType="VENDOR"
          referenceID={vendorId}
          onClose={handleCloseUploadForm}
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  );
};

export default VendorDoc;
