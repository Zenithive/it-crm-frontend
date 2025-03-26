import React, { ReactNode, useEffect, useState } from "react";
import {
  individualcasestudyOutcomesApi,
  individualcasestudyDocApi,
} from "../../api/apiService/individualcasestudyApiServices";
import {
  individualcasestudyOutcomesJson,
  individualcasestudyDocJson,
} from "../../api/jsonService/individualcasestudyJsonServices";
import { CaseStudy } from "../../api/apiService/overallcasestudyApiService";
import DocumentUploadForm from "../uploadfile";

interface Outcome {
  outcomes: string;
}

interface Document {
  id: any;
  filePath: string | undefined;
  title: ReactNode;
  name: string;
  url: string;
}

// export interface CaseStudy {
//   keyOutcomes?: string;
//   documents?: { name: string; url: string }[];
// }

const useDummyData =
  process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

const RightCaseStudy = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState<string | null>(null);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string>("");

  const fetchDocumentData = async () => {
    try {
      setDocLoading(true);
      let docResponse;
      if (useDummyData) {
        docResponse = await individualcasestudyDocJson();
      } else {
        if (caseStudy.caseStudyID) {
          docResponse = await individualcasestudyDocApi(caseStudy.caseStudyID);
          console.log(`docResponse`, docResponse);
        } else {
          docResponse = caseStudy.documents || [];
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
      setDocError(null);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setDocError("Failed to load documents");
    } finally {
      setDocLoading(false);
    }
  };

  useEffect(() => {
    const fetchOutcomeData = async () => {
      try {
        let outcomeResponse;
        
        if (useDummyData) {
          console.log(`
            useDummyData`, 
            useDummyData
          );
          outcomeResponse = await individualcasestudyOutcomesJson();
        } else {
          outcomeResponse = { outcomes: caseStudy.keyOutcomes || "No outcomes available." };
        }
        setOutcome(outcomeResponse ?? null);
      } catch (err) {
        console.error("Error fetching outcome data:", err);
        setError("Failed to load outcome data");
      } finally {
        setLoading(false);
      }
    };

    const fetchDocumentData = async () => {
      try {
        let docResponse;
        if (useDummyData) {
          docResponse = await individualcasestudyDocJson();
        } else {
          docResponse = caseStudy.documents || [];
        }
        setDocuments(
          (docResponse ?? []).map((doc: { title: string; url: string }) => ({
            id: null, // Assign a default value for id
            filePath: undefined, // Assign a default value for filePath
            title: doc.title, // Use name as title or default to "Untitled"
            name: doc.title,
            url: doc.url,
          }))
        );
      } catch (err) {
        console.error("Error fetching documents:", err);
        setDocError("Failed to load documents");
      } finally {
        setDocLoading(false);
      }
    };

    fetchOutcomeData();
    fetchDocumentData();
  }, [caseStudy]);

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
        window.URL.revokeObjectURL(url); // Clean up the URL object
        document.body.removeChild(a);
        setDownloadMessage("Download started.");
      })
      .catch((error) => {
        setDownloadMessage("Download failed: " + error.message);
      });
  };

  if (loading) return <p className="text-gray-500 text-center">Loading outcome...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">Outcomes</h3>
        <ul className="space-y-4 list-disc pl-5">
          {outcome?.outcomes?.split("\n\n").map((point, index) => (
            <li key={index} className="text-black leading-relaxed whitespace-pre-wrap">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-content-border"></div>

      <div className="bg-white rounded-lg shadow-custom p-2">
         {/* <h3 className="text-lg font-semibold text-bg-blue-12">Documents</h3> */}
        {/* <div className="overflow-y-auto h-[210px] scrollbar-custom bg-white p-4">
          
          {docLoading ? (
            <p className="text-gray-500 text-center">Loading documents...</p>
          ) : docError ? (
            <p className="text-red-500 text-center">{docError}</p>
          ) : documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="mb-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {doc.name}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No documents available.</p>
          )}
        </div>
      </div> */}


        <div className="overflow-y-auto h-[210px] scrollbar-custom bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-bg-blue-12">Documents</h3>
            <div className="flex justify-center items-center">
              <div 
                className="flex max-w-[180px] px-4 py-2 border shadow-custom border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={handleAddDocumentClick}
              >
                <img src="/doc_logo.svg" alt="Document" className="w-5 h-5 mr-3" />
                <button className="text-black text-sm text-center">Add Document</button>
              </div>
            </div>
          </div>

          {docLoading ? (
            <p className="text-gray-500 text-center">Loading documents...</p>
          ) : docError ? (
            <p className="text-red-500 text-center">{docError}</p>
          ) : documents.length > 0 ? (
            <div>
              {documents.map((doc, index) => (
                <div key={index} className="mb-3 flex justify-between items-center">
                  <a
                    // href={`https://crmbackendapis.onrender.com/download?id=${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {doc.title}
                  </a>
                  <button
                    onClick={() => downloadFile(doc.id, String(doc.title))}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Download
                  </button>
                </div>
              ))}
              {downloadMessage && (
                <div className="mt-3 text-sm text-gray-600">{downloadMessage}</div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No documents available.</p>
          )}
        </div>
      </div>

      {/* Document Upload Form Modal */}
      {isUploadFormOpen && (
        <DocumentUploadForm
          isOpen={isUploadFormOpen}
          onClose={handleCloseUploadForm}
          referenceID={caseStudy.caseStudyID} // Assuming caseStudy has an id property
          referenceType="CASESTUDY"
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  );
};

export default RightCaseStudy;