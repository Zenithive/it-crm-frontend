import { gql } from "@apollo/client";

export const GET_LEAD = gql`
  query GetLead($leadID: ID!) {
    getLead(leadID: $leadID) {
      leadID
      firstName
      lastName
      email
      linkedIn
      phone
      leadStage
      country
      initialContactDate
      organization {
        organizationName
        organizationWebsite
        organizationLinkedIn
      }
      leadAssignedTo {
        name
      }
      campaign {
        industryTargeted
      }
    }
  }
`;
