import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import PipelineStages from "./PipelineStages";
import { apiServiceRightSideDoc } from "../../api/apiService/individualApiService";
import { jsonServiceRightSideDoc } from "../../api/jsonService/individualJsonService";

const RightSide = () => {
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const flag = (process.env.NEXT_PUBLIC_USE_DUMMY_DATA || "").toLowerCase() === "true";

  const [documents, setDocuments] = useState<{ name: string; url: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-custom p-1">
      <div className="space-y-4">
        {/* Documents Section with Fixed Header */}
        <div className="h-[210px] flex flex-col bg-white">
          {/* Fixed Header */}
          <div className="flex justify-between items-center p-3 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-semibold text-bg-blue-12">
              Documents
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-full">
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
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bg-blue-12 font-bold"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border border-content-border mt-5 ml-5 mr-5"></div>

        {/* Pipeline Stage */}
        <h2 className="text-xl font-semibold text-bg-blue-12 ml-4">
          Pipeline Stage
        </h2>
        <PipelineStages />

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
    </div>
  );
};

export default RightSide;