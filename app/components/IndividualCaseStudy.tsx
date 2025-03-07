"use client";
import React from "react";
import IndividualMain from "./IndividualCaseStudy/IndividualMain";

const IndividualCaseStudy = ({ caseStudyId }: { caseStudyId: string }) => {
  console.log(`caseStudyId`, caseStudyId);
  return (
    <div className="min-h-screen bg-gray-50">
      <IndividualMain/>
    </div>
  );
};

export default IndividualCaseStudy;