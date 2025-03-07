import { gql } from "@apollo/client";

export const GET_CASE_STUDIES_QUERY = gql`
  query GetCaseStudies($industry: String!, $page: Int!, $pageSize: Int!) {
    getCaseStudies(
      filter: { industryTarget: $industry }
      pagination: { page: $page, pageSize: $pageSize }
      sort: { field: createdAt, order: ASC }
    ) {
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
  }
`;
