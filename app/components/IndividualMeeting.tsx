"use client";
import React, { useState, useEffect } from "react";
import Title from "../microComponents/Title";
import { IndividualMeetingtitle } from "../components/Path/TitlePaths";
import { individualmeetingApi } from "../api/apiService/individualmeetingApiService";
import { individualmeeting } from "../api/jsonService/individualmeetingJsonService";

interface MeetingDetails {
  companyName: string;
  leadOwner: string;
  meetingMedium: string;
  meetingAttendedBy: string;
  date: string;
  time: string;
  meetingSummary: string[];
  actionPoints: string[];
}

const IndividualMeeting: React.FC = () => {
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showFullActionPoints, setShowFullActionPoints] = useState(false);

  const SUMMARY_LIMIT = 3;
  const ACTION_LIMIT = 3;

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        setLoading(true);
        const response = useDummyData
          ? await individualmeetingApi()
          : await individualmeeting();
        setMeetingDetails(response);
      } catch (err) {
        console.error("Error fetching meeting details:", err);
        setError("Failed to load meeting details");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetails();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">Loading meeting details...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!meetingDetails) {
    return <p className="text-center mt-10">No meeting details available.</p>;
  }

  const {
    leadOwner,
    meetingMedium,
    meetingAttendedBy,
    date,
    time,
    meetingSummary,
    actionPoints,
  } = meetingDetails;
  const formattedSummary = meetingSummary
    .flatMap((summary) => summary.split("\n\n"))
    .map((summary) => summary.trim())
    .filter((summary) => summary !== "");

  return (
    <div>
      <div className="mt-5 ml-11">
        <Title title={IndividualMeetingtitle[0].titleName} />
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="w-full overflow-hidden p-6 flex flex-col md:flex-row gap-6">
          {/* Meeting Details (2/3 width) */}
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-custom">
            {/* Meeting Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-6 ">
              {/* First Column: Lead Owner & Date */}
              <div className="border-r pr-4 col-span-1 ">
                <p className="text-2xl font-semibold text-bg-blue-12">
                  Lead Owner
                </p>
                <p className="text-black mt-1">{leadOwner}</p>

                <p className="text-2xl font-semibold text-bg-blue-12 mt-6">
                  Date
                </p>
                <p className="text-black mt-1">{date}</p>
              </div>

              {/* Second Column: Meeting Medium & Time */}
              <div className="border-r pr-4 col-span-1">
                <p className="text-2xl font-semibold text-bg-blue-12">
                  Meeting Medium
                </p>
                <p className="text-black mt-1">{meetingMedium}</p>

                <p className="text-2xl font-semibold text-bg-blue-12 mt-6">
                  Time
                </p>
                <p className="text-black mt-1">{time}</p>
              </div>

              {/* Full Width: Meeting Attended By */}
              <div className="col-span-2 md:col-span-1">
                <p className="text-2xl font-semibold text-bg-blue-12">
                  Meeting Attended By
                </p>
                <p className="text-black mt-1">{meetingAttendedBy}</p>
              </div>
            </div>

            {/* Meeting Summary */}
            <div className="mt-4 p-6">
              <h2 className="text-2xl font-semibold text-bg-blue-12 mb-4">
                Meeting Summary
              </h2>
              <ul className="list-disc pl-5 space-y-3">
                {formattedSummary
                  .slice(
                    0,
                    showFullSummary ? formattedSummary.length : SUMMARY_LIMIT
                  )
                  .map((summary, index) => (
                    <li
                      key={index}
                      className="text-black leading-relaxed text-base"
                    >
                      {summary}
                    </li>
                  ))}
              </ul>
              {formattedSummary.length > SUMMARY_LIMIT && (
                <button
                  className="mt-4 text-bg-blue-12 font-semibold hover:underline"
                  onClick={() => setShowFullSummary(!showFullSummary)}
                >
                  {showFullSummary ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>

          {/* Action Points (1/3 width) */}
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow-custom p-6">
            <h2 className="text-2xl font-semibold text-bg-blue-12 mb-4">
              Action Points
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-black text-base">
              {actionPoints
                .slice(
                  0,
                  showFullActionPoints ? actionPoints.length : ACTION_LIMIT
                )
                .map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
            </ul>
            {actionPoints.length > ACTION_LIMIT && (
              <button
                className="mt-4 text-bg-blue-12 font-semibold hover:underline"
                onClick={() => setShowFullActionPoints(!showFullActionPoints)}
              >
                {showFullActionPoints ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualMeeting;
