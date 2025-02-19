import React from "react";
import Individual_Title from "./Individual/IndividualTitle";
import LeftSide from "./Individual/LeftSide";
import TimeLine from "./Individual/TimeLine";
import RightSide from "./Individual/RightSide";
import {data} from '../components/Path/IndividualData'

const Individual = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Individual_Title />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3">
              <LeftSide/>
            </div>

            {/* Timeline Section */}
            <div className="lg:col-span-6">
              <TimeLine />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
