// "use client";
// import React, { useState, useEffect } from "react";
// import VendorLayout from "./VendorLayout";
// import { individualvendor } from "../../api/jsonService/individualvendorJsonService";
// import { individualcasestudyDocApi } from "../../api/apiService/individualcasestudyApiServices";
// import DocumentUploadForm from "../uploadfile";

// interface Document {
//   name: string;
//   url: string;
//   date: string;
//   designation: string;
// }

// const VendorDoc = ({ vendorId }: { vendorId: string }) => {
//   console.log(`vendorId222`, vendorId);
//   const [documents, setDocuments] = useState<Document[]>([]);
//    const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showUploadFile, setShowUploadFile] = useState(false); // State for UploadFile component

//   const useDummyData =
//     process.env.NEXT_PUBLIC_USE_DUMMY_DATA1?.trim().toLowerCase() === "true";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = individualcasestudyDocApi(vendorId);
//         const documentsData = response?.documents ?? [];
//         setDocuments(Array.isArray(documentsData) ? documentsData : []);
//       } catch (err) {
//         console.error("Error fetching resources:", err);
//         setError("Failed to load resources");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [useDummyData]);

//   const handleAddDocumentClick = () => {
//     setIsUploadFormOpen(true);
//   };

//   const handleCloseUploadForm = () => {
//     setIsUploadFormOpen(false);
//   };

//   const handleDocumentAdded = () => {
//     // Refresh document list after successful upload
//     // fetchDocumentData();
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-custom mr-4 mt-4">
//       <div className="flex flex-col bg-white min-h-[210px]">
//         {/* Scrollable Content */}
//         <div className="flex-1 px-4 pb-4 mt-2">
//           {isLoading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : documents.length === 0 ? (
//             <p className="text-center text-gray-500">No documents available</p>
//           ) : (
//             <div className="space-y-4">
//               {documents.map((doc, index) => (
//                 <div key={index} className="p-4 rounded-lg shadow-custom bg-white">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4 w-1/3">
//                       <div className="w-10 h-10 flex items-center justify-center">
//                         <img src="/vendor_icon_1.svg" alt="Document" />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="text-gray-800 font-semibold text-md">
//                           {doc.name}
//                         </span>
//                         <span className="text-bg-blue-12 text-md ">{doc.date}</span>
//                       </div>
//                     </div>
//                     <div className="flex-1 flex justify-center">
//                       <span className="text-black bg-blue-shadow px-3 py-1 rounded-md text-md">
//                         {doc.designation}
//                       </span>
//                     </div>
//                     <div className="w-1/3 flex justify-end">
//                       <a
//                         href={doc.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-700 font-semibold hover:underline"
//                       >
//                         Download
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Upload Document Button */}
//           <div className="mt-6">
//             <button
//               className="flex items-center justify-center bg-bg-blue-12 text-white rounded-lg p-2"
//               onClick={handleAddDocumentClick} // Open UploadFile component
//             >
//               <img src="/upload_icon.svg" alt="Upload"></img>
//               <div className="text-white ml-2">Upload Document</div>
//             </button>
//           </div>

//           {/* Render UploadFile component when showUploadFile is true */}
//           {isUploadFormOpen && <DocumentUploadForm
//           isOpen={isUploadFormOpen}
//           referenceType="VENDOR"
//           onClose={handleCloseUploadForm}
//           referenceID={vendorId} 
//           onDocumentAdded={handleDocumentAdded}
//         />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDoc;





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
    fetchData(); // Refresh after upload
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
