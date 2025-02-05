import React, { useState } from "react";

const Meetings = ({ meetings = [], recent = [] }) => {
  const [recentView, setRecentView] = useState("today");

  return (
    <div className="w-full" data-testid="meetings-section">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="border-b">
          <div className="flex space-x-4 md:space-x-8 mb-4 overflow-x-auto">
            <button
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap `}
            >
              Meetings
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold  pb-2 whitespace-nowrap
              ${recentView === "today" ? "border-b-2 border-[#6366F1]" : ""}`}
              onClick={() => setRecentView("today")}
            >
              Today
            </button>
            <button
              className={`text-black text-base md:text-lg font-semibold whitespace-nowrap pb-2  ${
                recentView === "recent" ? "border-b-2 border-[#6366F1]" : ""
              }`}
              onClick={() => setRecentView("recent")}
            >
              Recent
            </button>
          </div>
        </div>
        {recentView === "today" ? (
          <div className="scrollable_view">
            {meetings.map((meeting, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 ${
                  index !== meetings.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
                  <div className="clock_icon">
                    <img src="clock.svg" alt="Clock"></img>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-800 text-sm md:text-base truncate">
                      {meeting.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {meeting.time}
                    </p>
                  </div>
                </div>
                <button className="join_button">Join</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="scrollable_view">
            {recent.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center justify-between pb-4 ${
                  index !== recent.length - 1 ? "border-b border-gray-300" : ""
                }`}
              >
                <img
                  src="image.svg"
                  alt={msg.name}
                  className="w-8 h-8 md:w-10 md:h-10 mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 mx-3">
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
