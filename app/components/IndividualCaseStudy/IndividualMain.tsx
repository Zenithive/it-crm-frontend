import React from "react";
import LeftCaseStudy from "./LeftCaseStudy";
import RightCaseStudy from "./RightCaseStudy";
import { companydata, outcome, project, technologies } from "../Path/IndividualCaseStudyData";

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
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <img
                src="/individual_icon_7.svg"
                alt="Visit"
                className="h-5 w-5 text-gray-500"
              ></img>
            </button>
          </div>

          {/* Project Details Grid */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <LeftCaseStudy companydata={companydata[0]} project={project[0]} technologies={technologies}/>
            <div className="hidden lg:block border-l border-bg-blue-12"></div>
            <RightCaseStudy outcome={outcome[0]}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualMain;
