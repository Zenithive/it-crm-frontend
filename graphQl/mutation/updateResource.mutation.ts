import { gql} from "@apollo/client";

export const UPDATE_RESOURCE_PROFILE = gql`
  mutation UpdateResourceProfile($resourceProfileID: ID!, $input: UpdateResourceProfileInput!) {
  updateResourceProfile(resourceProfileID: $resourceProfileID, input: $input) {
    resourceProfileID
    type
    firstName
    lastName
    totalExperience
    contactInformation
    googleDriveLink
    status
    vendorID
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