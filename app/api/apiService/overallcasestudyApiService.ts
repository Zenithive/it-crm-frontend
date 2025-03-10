import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GET_CASE_STUDIES_QUERY } from "../../../graphQl/queries/getCaseStudies";

export interface CaseStudy {
  caseStudyID: string;
  projectName: string;
  clientName: string;
  techStack: string;
  projectDuration: string;
  keyOutcomes?: string;
  industryTarget: string;
  tags: string[];
  document: string;
  documents?: { name: string; url: string }[];
}

const useOverallCaseStudyData = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { data, loading, error,refetch  } = useQuery(GET_CASE_STUDIES_QUERY, {
    variables: {
      industry: "Finance & Banking",
      page: 1,
      pageSize: 10,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return {
    caseStudies: data?.getCaseStudies || [],
    loading,
    error: error ? error.message : null,
    refetch,
  };
};

export default useOverallCaseStudyData;
