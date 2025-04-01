// useOverallCaseStudyData.ts
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

const useOverallCaseStudyData = (
  page: number, 
  pageSize: number, 
  industry?: string,
  sortField: string = "createdAt",
  sortOrder: "ASC" | "DESC" = "DESC",
  searchQuery?: string,
  technology?: string
) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const filter: any = {};
  
  // Parse industry filter to handle multiple selections
  if (industry) {
    const industries = industry.split(',');
    if (industries.length === 1) {
      filter.industryTarget = industry;
    } else if (industries.length > 1) {
      // For multiple industries, use an array or another format depending on your API
      filter.industryTarget = industries; // API might expect { $in: [...] } format
      // If your API expects a specific format for multiple values, modify accordingly:
      // filter.industryTarget = { $in: industries };
    }
  }
  
  // Parse technology filter to handle multiple selections
  if (technology) {
    const technologies = technology.split(',');
    if (technologies.length === 1) {
      filter.techStack = technology;
    } else if (technologies.length > 1) {
      // For multiple technologies, use an array or another format depending on your API
      filter.techStack = technologies;
      // If your API expects a specific format for multiple values, modify accordingly:
      // filter.techStack = { $in: technologies };
    }
  }
  
  // Add search filter if there's a query
  if (searchQuery && searchQuery.trim() !== "") {
    filter.search = searchQuery.trim();
  }

  const { data, loading, error, refetch } = useQuery(GET_CASE_STUDIES_QUERY, {
    variables: { 
      filter: filter,
      pagination: { page, pageSize },
      sort: { field: sortField, order: sortOrder }
    },
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  return {
    caseStudies: data?.getCaseStudies?.items || [],
    totalItems: data?.getCaseStudies?.totalCount || 0,
    loading,
    error: error ? error.message : null,
    refetch,
  };
};

export default useOverallCaseStudyData;