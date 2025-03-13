import { gql } from "@apollo/client";

export const CREATE_RESOURCE_PROFILE = gql`
  mutation CreateResourceProfile($input: CreateResourceProfileInput!) {
    createResourceProfile(input: $input) {
      resourceProfileID
      type
      firstName
      lastName
      totalExperience
      contactInformation
      googleDriveLink
      status
      resourceSkills {
        skill {
          skillID
          name
          description
        }
        experienceYears
      }
    }
  }
`;