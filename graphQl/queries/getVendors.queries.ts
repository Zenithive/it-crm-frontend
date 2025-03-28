import { gql } from "@apollo/client";

export const GET_VENDORS = gql`
  query GetVendors(
    $page: Int!
    $pageSize: Int!
    $companyName: String
    $status: VendorStatus
    $skillIDs: [ID!]
    $search: String
  ) {
    getVendors(
      pagination: { page: $page, pageSize: $pageSize }
      filter: { companyName: $companyName, status: $status, skillIDs: $skillIDs, search: $search }
      sort: { field: createdAt, order: DESC }
    ) {
      items {
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
          pastProjectsCount
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
      totalCount
    }
  }
`;

export const GET_VENDOR_BY_ID = gql`
  query GetVendorById($vendorID: ID!) {
    getVendor(vendorID: $vendorID) {
      vendorID
      companyName
      address
      status
      paymentTerms
      gstOrVatDetails
      notes
      country
      skills {
        skillID
        name
      }
      performanceRatings {
        rating
      }
    }
  }
`;