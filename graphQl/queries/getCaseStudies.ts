// getCaseStudies.ts
import { gql } from "@apollo/client";

export const GET_CASE_STUDIES_QUERY = gql`
  query GetCaseStudies(
    $filter: caseStudyFilter
    $pagination: PaginationInput
    $sort: caseStudySortInput
  ) {
    getCaseStudies(
      filter: $filter
      pagination: $pagination
      sort: $sort
    ) {
      items {
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
      totalCount
    }
  }
`;