import React, { useEffect, useState } from "react";
import {
  individualcasestudyOutcomesApi,
  individualcasestudyDocApi,
} from "../../api/apiService/individualcasestudyApiServices";
import {
  individualcasestudyOutcomesJson,
  individualcasestudyDocJson,
} from "../../api/jsonService/individualcasestudyJsonServices";
import { CaseStudy } from "../../api/apiService/overallcasestudyApiService";

interface Outcome {
  outcomes: string;
}

interface Document {
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

  useEffect(() => {
    const fetchOutcomeData = async () => {
      try {
        let outcomeResponse;
        if (useDummyData) {
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
  }, [caseStudy]);

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
      <div className="flex max-w-[180px] px-4 py-2 border shadow-custom border-gray-300 rounded-lg hover:bg-gray-50">
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
</div>

    </div>
  );
};

export default RightCaseStudy;
