"use client";
import React from "react";
import Navbar from "./Navbar";
import IndividualMain from "./IndividualCaseStudy/IndividualMain";

const IndividualCaseStudy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <IndividualMain/>
    </div>
  );
};

export default IndividualCaseStudy;