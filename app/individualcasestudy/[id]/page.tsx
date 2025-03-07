"use client"
import React from "react";
import IndividualCaseStudy from "../../components/IndividualCaseStudy";
import { useParams } from "next/navigation";

const CaseStudyPage = () => {
  const { id } = useParams() as { id: string }; // Get the dynamic ID from the URL

  return (
    <div>
      <IndividualCaseStudy caseStudyId={id} />
    </div>
  );
};

export default CaseStudyPage;
