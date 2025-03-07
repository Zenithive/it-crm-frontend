import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftCaseStudy from "./LeftCaseStudy";
import RightCaseStudy from "./RightCaseStudy";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { CaseStudy } from "../../api/apiService/overallcasestudyApiService";

// interface CaseStudy {
//   caseStudyID: string;
//   projectName: string;
//   clientName: string;
//   techStack: string;
//   projectDuration: string;
//   keyOutcomes: string;
//   industryTarget: string;
//   tags: string[];
//   document: string;
// }

const IndividualMain = ({ caseStudyId }: { caseStudyId: string }) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  console.log(`caseStudy`, caseStudy);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth); // Get user token

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!caseStudyId) return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL || "https://crmbackendapis.onrender.com/graphql",
          {
            query: `query {
              getCaseStudy(caseStudyID: "${caseStudyId}") {
                caseStudyID
                projectName
                clientName
                techStack
                projectDuration
                keyOutcomes
                industryTarget
                tags
                document
              }
            }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setCaseStudy(response?.data?.data?.getCaseStudy || null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch case study");
        } else {
          setError("Failed to fetch case study");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [caseStudyId, user.token]); // Runs when caseStudyId or token changes

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
        {error && <p className="text-red-500">{error}</p>}

        {/* Project Details Grid */}
        {!loading && caseStudy && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <LeftCaseStudy caseStudy={caseStudy}/>
            <div className="hidden lg:block border-l border-bg-blue-12"></div>
            <RightCaseStudy caseStudy={caseStudy} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualMain;
