import { gql } from "@apollo/client";

export const UPDATE_LEAD_MUTATION = gql`mutation UpdateLead($leadID: ID!, $input: UpdateLeadInput!) {
  updateLead(leadID: $leadID, input: $input) {
    leadID
    firstName
    lastName
    email
    linkedIn
    country
    phone
    leadSource
    leadStage
    initialContactDate
    leadAssignedTo {
      userID
      name
      email
      phone
    }
    leadNotes
    leadPriority
    organization {
      organizationID
      organizationName
    }
    campaign {
      campaignID
      campaignName
    }
  }
}`