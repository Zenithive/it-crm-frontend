"use client";
import React from "react";
import Navbar from "./Navbar";
import IndividualMain from "./IndividualCaseStudy/IndividualMain";
import {nav} from './Path/TaskData'

const IndividualCaseStudy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar nav={nav[0]}/>
      <IndividualMain/>
    </div>
  );
};

export default IndividualCaseStudy;