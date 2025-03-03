import React from "react";
import LeftCaseStudy from "./LeftCaseStudy";
import RightCaseStudy from "./RightCaseStudy";

const IndividualMain = () => {
  return (
    <>
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-custom">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl text-bg-blue-12 font-semibold">
              E-Commerce Platform
            </h2>
          </div>

          {/* Project Details Grid */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <LeftCaseStudy />
            <div className="hidden lg:block border-l border-bg-blue-12"></div>
            <RightCaseStudy/>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualMain;
