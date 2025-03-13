import { gql } from "@apollo/client";

export const CREATE_CASE_STUDY = gql`
  mutation CreateCaseStudy($input: CreateCaseStudyInput!) {
    createCaseStudy(input: $input) {
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
