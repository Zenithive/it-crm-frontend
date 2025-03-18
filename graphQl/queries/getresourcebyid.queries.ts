import { gql } from "@apollo/client";

export const GET_RESOURCE_PROFILE = gql`
  query GetResourceProfile($resourceProfileId: ID!) {
    getResourceProfile(resourceProfileID: $resourceProfileId) {
      resourceProfileID
      type
      firstName
      lastName
      totalExperience
      contactInformation
      googleDriveLink
      status
      vendorID
      vendor {
        vendorID
        companyName
      }
      resourceSkills {
        skill {
          skillID
          name
          description
          skilltype
        }
        experienceYears
      }
      pastProjects {
        pastProjectID
        createdAt
        updatedAt
        resourceProfileID
        projectName
        description
      }
    }
  }
`;
