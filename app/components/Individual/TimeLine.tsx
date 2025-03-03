"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Reply } from "lucide-react";
import { jsonServiceTimeLine } from "../../api/jsonService/individualJsonService";
import { apiServiceTimeline } from "../../api/apiService/individualApiService";

interface TimelineItem {
  type: "email" | "deal";
  date?: string;
  content?: string;
  sender?: string;
  dealNumber?: string;
  subject?: string;
  reference?: string;
  recipient?: string;
  dealTitle?: string;
  status?: string;
}

const TimeLine: React.FC = () => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const flag = (process.env.NEXT_PUBLIC_USE_DUMMY_DATA || "").toLowerCase() === "true";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = flag
          ? await apiServiceTimeline()
          : await jsonServiceTimeLine();
        setTimelineData(fetchedData);
      } catch (err) {
        setError("Error fetching timeline data");
        // Fallback to static data on error
        // setTimelineData(fetchData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  const renderTimelineItem = (item: TimelineItem) => {
    if (item.type === "email") {
      return (
        <div className="border-b pb-6 bg-gray-background rounded-lg shadow-custom">
          <div className="flex items-start gap-4 p-5">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center">
                  <img
                    src="/email.svg"
                    alt="Mail"
                    className="w-7 h-7"
                  />
                  <div className="text-blue-600 font-semibold text-lg ml-2">
                    Email
                  </div>
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
              <div className="mb-2">
                <span className="font-medium">{item.subject}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {item.reference}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{item.content}</p>
              <div className="flex items-center gap-4">
                <img
                  src="/profileLogo.svg"
                  alt={item.sender}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{item.sender}</p>
                  <p className="text-sm text-gray-500">to {item.recipient}</p>
                </div>
                <button className="ml-auto text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  Details <ChevronDown size={16} />
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mt-4">
                <Reply size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (item.type === "deal") {
      return (
        <div className="border-b pb-6 bg-gray-background rounded-lg shadow-custom">
          <div className="flex items-start gap-4 p-5">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center">
                  <img src="/deal_icon.svg" alt="Deal" className="w-7 h-7" />
                  <div className="text-blue-600 font-semibold text-lg ml-2">
                    Deal activity
                  </div>
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  Deal {item.dealNumber} {item.dealTitle}
                </span>
                <span className="text-gray-500">{item.status}</span>
                <button className="text-indigo-600 hover:text-indigo-700 ml-2">
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-custom p-1 flex flex-col h-screen">
      {/* Fixed header */}
      <div className="flex justify-between items-center ml-2 p-2 sticky top-0 bg-white z-10">
        <h2 className="text-2xl font-semibold text-bg-blue-12">Timeline</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <img src="/SearchIcon.svg" alt="Search" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 scrollbar-custom">
        {error && (
          <div className="p-4 text-red-600 bg-red-50 rounded-md m-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {timelineData.map((item, index) => (
              <div key={index}>{renderTimelineItem(item)}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeLine;