import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import PipelineStages from "./PipelineStages";
import { individualcasestudyDocApi } from "../../api/apiService/individualcasestudyApiServices";
import { jsonServiceRightSideDoc } from "../../api/jsonService/individualJsonService";
import { LeftSideProps } from "./LeftSide";
import DocumentUploadForm from "../Uploadfile";

interface Document {
  id: any;
  filePath: string | undefined;
  title: React.ReactNode;
  name: string;
  url: string;
}

const RightSide: React.FC<LeftSideProps> = ({ leadId }) => {
  console.log(`leadId232`, leadId);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [error, setError] = useState("");
  const [downloadMessage, setDownloadMessage] = useState<string>("");
  
  const useDummyData = (process.env.NEXT_PUBLIC_USE_DUMMY_DATA || "").toLowerCase() === "true";

  // Fetch document data function

  useEffect(() => {
    fetchDocumentData();
  }, [leadId]);
  const fetchDocumentData = async () => {
    try {
      setIsLoading(true);
      let docResponse;
      
      if (useDummyData) {
        docResponse = await jsonServiceRightSideDoc();
      } else {
        if (leadId) {
          docResponse = await individualcasestudyDocApi(leadId);
          console.log(`docResponse`, docResponse);
        } else {
          docResponse = [];
        }
      }
      
      setDocuments(
        (docResponse ?? []).map((doc: { id: any; filePath: any; title: any; url: any; }) => ({
          id: doc.id || null,
          filePath: doc.filePath || undefined,
          title: doc.title,
          name: doc.title,
          url: doc.url,
        }))
      );
      setError("");
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  // Download function implementation
  const downloadFile = (fileId: any, filename: string) => {
    setDownloadMessage("Starting download...");
    
    const token = localStorage.getItem('token') || ''; // Get the token from localStorage
    
    fetch(`https://crmbackendapis.onrender.com/download?id=${fileId}`, {
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
    fetchDocumentData();
  }, [leadId]);

  const handleAddDocumentClick = () => {
    setIsUploadFormOpen(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormOpen(false);
  };
  
  const handleDocumentAdded = () => {
    // Refresh document list after successful upload
    fetchDocumentData();
  };

  return (
    <div className="bg-white rounded-lg shadow-custom p-1">
      <div className="space-y-4">
        {/* Documents Section with Fixed Header */}
        <div className="h-[210px] flex flex-col bg-white">
          {/* Fixed Header */}
          <div className="flex justify-between items-center p-3 sticky top-0 bg-white z-0">
            <h2 className="text-xl font-semibold text-bg-blue-12">
              Documents
            </h2>
            <button onClick={handleAddDocumentClick} className="p-2 hover:bg-gray-100 rounded-full">
              <img src="/plus_icon.svg" alt="Plus" />
            </button>
          </div>
          <div className="border border-content-border mr-3 ml-3"></div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 scrollbar-custom px-4 pb-4 mt-2">
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
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded flex items-center justify-center">
                        <img src="/doc.svg" alt="Document" />
                      </div>
                      <span className="text-gray-700">{doc.name}</span>
                    </div>
                    <div className="flex">
                      {/* <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bg-blue-12 font-bold mr-2"
                      >
                        View
                      </a> */}
                      <button
                        onClick={() => downloadFile(doc.id, String(doc.title))}
                        className="text-bg-blue-12 font-bold"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
                {downloadMessage && (
                  <div className="mt-3 text-sm text-gray-600">{downloadMessage}</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border border-content-border mt-5 ml-5 mr-5"></div>

        {/* Pipeline Stage */}
        <h2 className="text-xl font-semibold text-bg-blue-12 ml-4">
          Pipeline Stage
        </h2>
        <PipelineStages leadId={leadId}/>

        <div className="border border-content-border ml-5 mr-5"></div>

        {/* Notes Section */}
        <div className="flex justify-between items-center ml-4">
          <h2 className="text-xl font-semibold text-bg-blue-12">Note</h2>
          <button className="flex items-center gap-2 text-white bg-bg-blue-12 p-2 text-[14px] rounded-md mr-5">
            <img src="/plus.svg" alt="Plus" className="mr-1"></img>
            Add Note
          </button>
        </div>
        <div className="p-2">
          <textarea
            placeholder="Add a notes..."
            className="w-full p-4 border rounded-lg focus:ring focus:outline-none"
            rows={4}
          />
        </div>
      </div>
      {isUploadFormOpen && (
        <DocumentUploadForm
          isOpen={isUploadFormOpen}
          referenceType="LEAD"
          onClose={handleCloseUploadForm}
          referenceID={leadId} 
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  );
};

export default RightSide;