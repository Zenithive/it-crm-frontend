import { gql } from "@apollo/client";



export const ADD_LEAD_QUERY =gql`
mutation CreateLead(
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $linkedIn: String,
  $country: String!,
  $phone: String!,
  $leadSource: String!,
  $initialContactDate: String!,
  $leadAssignedTo: ID!,
  $leadStage: LeadStage!,
  $leadNotes: String,
  $leadPriority: LeadPriority!,
  $organizationID: ID!,
  $campaignID: ID!
) {
  createLead(
    input: {
      firstName: $firstName
      lastName: $lastName
      email: $email
      linkedIn: $linkedIn
      country: $country
      phone: $phone
      leadSource: $leadSource
      initialContactDate: $initialContactDate
      leadAssignedTo: $leadAssignedTo
      leadStage: $leadStage
      leadNotes: $leadNotes
      leadPriority: $leadPriority
      organizationID: $organizationID
      campaignID: $campaignID
    }
  ) {
    leadID
    firstName
    email
    leadStage
    leadPriority
    leadCreatedBy {
      userID
      name
      email
    }
    leadAssignedTo {
      userID
      name
      email
    }
    organization {
      organizationName
      organizationWebsite
    }
    campaign {
      campaignName
      campaignCountry
      campaignRegion
    }
    activities {
      activityID
      activityType
    }
  }
}

`