import { gql } from "@apollo/client";

export const GET_CASE_STUDY_QUERY = gql`
  query GetCaseStudy($caseStudyID: ID!) {
    getCaseStudy(caseStudyID: $caseStudyID) {
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
