import { gql } from "@apollo/client";

export const GET_VENDOR = gql`
  query GetVendor($vendorID: ID!) {
    getVendor(vendorID: $vendorID) {
      vendorID
      createdAt
      updatedAt
      companyName
      status
      paymentTerms
      address
      gstOrVatDetails
      notes
      contactList {
        contactID
        name
        email
        phoneNumber
      }
      skills {
        skillID
        name
        description
        skilltype
      }
      performanceRatings {
        performanceRatingsID
        rating
        review
      }
      resources {
        resourceProfileID
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
  }
`;
