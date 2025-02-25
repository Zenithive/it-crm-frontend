import React, { useState, useEffect } from "react";
import {
  dashboardMeetingsJson,
  dashboardRecentJson,
} from "../../api/jsonService/dashboardJsonService";
import {
  dashboardMeetingsApi,
  dashboardRecentApi,
} from "../../api/apiService/dashboardApiService";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [recent, setRecent] = useState([]);
  const [recentView, setRecentView] = useState("today");

  const useDummyData =
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";

    console.log("flag:",useDummyData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetingsData, recentData] = useDummyData
          ? await Promise.all([dashboardMeetingsApi(), dashboardRecentApi()])
          : [dashboardMeetingsJson(), dashboardRecentJson()];

          setMeetings(useDummyData ? meetingsData?.meetings ?? [] : meetingsData ?? []);
          setRecent(useDummyData ? recentData?.recent ?? [] : recentData ?? []);
          
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [useDummyData]);

  return (
    <div className="w-full h-40 md:h-56">
      <div className="bg-white rounded-xl shadow-custom">
        <div className="border-b">
          <div className="flex space-x-4 md:space-x-8 mb-4 overflow-x-auto ml-5">
            <button className="text-bg-blue-12 text-base md:text-lg font-semibold whitespace-nowrap mt-3">
              Meetings
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold pb-2 whitespace-nowrap mt-4 ${
                recentView === "today" ? "border-b-2 border-bg-blue-12" : ""
              }`}
              onClick={() => setRecentView("today")}
            >
              Today
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2 mt-4 ${
                recentView === "recent" ? "border-b-2 border-bg-blue-12" : ""
              }`}
              onClick={() => setRecentView("recent")}
            >
              Recent
            </button>
          </div>
        </div>

        {recentView === "today" ? (
          <div className="scrollbar-custom overflow-y-auto max-h-[300px] pl-6 pr-6 pb-6">
            {meetings.map((meeting, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 mr-4 ${
                  index !== meetings.length - 1 ? "border-b border-bg-blue-12-[1px]" : ""
                }`}
              >
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0 mt-4">
                  <div className="clock_icon">
                    <img src="clock.svg" alt="Clock" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-800 text-sm md:text-base truncate ">
                      {meeting.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {meeting.time}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4">
                  <button className="border shadow-sm bg-white p-2 rounded-md mr-4">
                    <img src="/link.svg" alt="Link" />
                  </button>
                  <button className="join_button">Join</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="scrollbar-custom overflow-y-auto max-h-[200px] pl-6 pr-6 pb-6">
            {recent.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 mr-4 ${
                  index !== recent.length - 1 ? "border-b border-bg-blue-12-[1px]" : ""
                }`}
              >
                <img
                  src="image.svg"
                  alt={msg.name}
                  className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 mt-4"
                />
                <div className="flex-1 min-w-0 mx-3 mt-4">
                  <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
                    {msg.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {msg.message}
                  </p>
                </div>
                <></>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;
