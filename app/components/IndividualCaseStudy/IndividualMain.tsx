import React from "react";
import { useQuery } from "@apollo/client";
import LeftCaseStudy from "./LeftCaseStudy";
import RightCaseStudy from "./RightCaseStudy";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_CASE_STUDY_QUERY } from "../../../graphQl/queries/getIndividualCaseStudy.queries";

const IndividualMain = ({ caseStudyId }: { caseStudyId: string }) => {
  const user = useSelector((state: RootState) => state.auth); // Get user token

  const { data, loading, error } = useQuery(GET_CASE_STUDY_QUERY, {
    variables: { caseStudyID: String(caseStudyId) },
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  const caseStudy = data?.getCaseStudy || null;

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-custom">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl text-bg-blue-12 font-semibold">
            {loading ? "Loading..." : caseStudy?.projectName || "No Data Available"}
          </h2>
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error.message}</p>}

        {/* Project Details Grid */}
        {!loading && caseStudy && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <LeftCaseStudy caseStudy={caseStudy} />
            <div className="hidden lg:block border-l border-bg-blue-12"></div>
            <RightCaseStudy caseStudy={caseStudy} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualMain;
