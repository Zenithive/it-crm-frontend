import React, { useEffect, useState } from "react";
import {
  individualcasestudyOutcomesApi,
  individualcasestudyDocApi,
} from "../../api/apiService/individualcasestudyApiServices";
import {
  individualcasestudyOutcomesJson,
  individualcasestudyDocJson,
} from "../../api/jsonService/individualcasestudyJsonServices";

import "../Dashboard/Dashboard.css";

const RightCaseStudy = () => {
  const [outcome, setOutcome] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState(null);

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchOutcomeData = async () => {
      try {
        const outcomeResponse = useDummyData
          ? await individualcasestudyOutcomesApi()
          : individualcasestudyOutcomesJson();

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
        const docResponse = useDummyData
          ? await individualcasestudyDocApi()
          : individualcasestudyDocJson();

        setDocuments(docResponse ?? []);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setDocError("Failed to load documents");
      } finally {
        setDocLoading(false);
      }
    };

    fetchOutcomeData();
    fetchDocumentData();
  }, [useDummyData]);

  if (loading)
    return <p className="text-gray-500 text-center">Loading outcome...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* Outcomes */}
      <div>
        <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">Outcomes</h3>
        <ul className="space-y-4">
          <li className="text-black leading-relaxed whitespace-pre-wrap">
            {outcome?.outcomes ?? "No outcome available."}
          </li>
        </ul>
      </div>

      <div className="border border-bg-blue-12-[1.19px]"></div>

      {/* Documents */}
      <div className="bg-white rounded-lg shadow-custom p-2">
  <div className="overflow-y-auto h-[210px] scrollbar-custom bg-white">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-bg-blue-12">Documents</h3>
        <div className="flex justify-center items-center">
             <div className="flex max-w-[180px] px-4 py-2 border shadow-custom border-gray-300 rounded-lg hover:bg-gray-50">
               <img
                src="/doc_logo.svg"
                 alt="Document"
                 className="w-5 h-5 mr-3"
               />
               <button className="text-black text-sm text-center">
                Add Document
              </button>
            </div>
           </div>
      </div>

      <div className="border border-bg-blue-12-[1px] mb-3"></div>

      {docLoading ? (
        <p className="text-center text-gray-500">Loading documents...</p>
      ) : docError ? (
        <p className="text-center text-red-500">{docError}</p>
      ) : documents.length === 0 ? (
        <p className="text-center text-gray-500">No documents available.</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/doc.svg" alt="Document" />
                </div>
                <span className="text-gray-700">{doc.name}</span>
              </div>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  );
};

export default RightCaseStudy;
