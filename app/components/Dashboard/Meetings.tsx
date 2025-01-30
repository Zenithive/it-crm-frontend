import React from "react";
import { meetings } from "../Path/TaskData";
import {Settings} from "lucide-react";

const Meetings = () => {
  return (
    <div className="">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="border-b">
          <div className="flex space-x-8 mb-4">
            <button className="text-gray-500">Meetings</button>
            <button className="text-[#6366F1] border-b-2 border-[#6366F1] pb-2 font-medium">
              Today
            </button>
            <button className="text-gray-500">Recent</button>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {meetings.map((meeting, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{meeting.title}</h3>
                  <p className="text-sm text-gray-500">{meeting.time}</p>
                </div>
              </div>
              <button className="bg-[#6366F1] text-white px-6 py-1.5 rounded-lg text-sm">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meetings;
