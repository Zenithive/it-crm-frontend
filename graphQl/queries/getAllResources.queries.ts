import { gql } from "@apollo/client";

export const GET_RESOURCE_PROFILES_QUERY = gql`
    query GetResourceProfiles(
        $page: Int!
        $pageSize: Int!
        $firstName: String
        $status: ResourceStatus
        $vendorID: ID
        $skillIDs: [ID!]
        $search: String
         $totalExperienceMin: Float,
  $totalExperienceMax: Float
    ) {
        getResourceProfiles(
            pagination: { page: $page, pageSize: $pageSize }
            filter: { firstName: $firstName, status: $status, vendorID: $vendorID, skillIDs: $skillIDs, search: $search }
            sort: { field: createdAt, order: DESC }
        ) {
            items {
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
            totalCount
        }
    }
`;
