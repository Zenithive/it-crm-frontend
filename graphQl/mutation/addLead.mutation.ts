import { gql } from "@apollo/client";

export const ADD_LEAD_QUERY = gql`
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(input: $input) {
      leadID
      firstName
      email
      leadStage
      leadType

      linkedIn
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
        organizationID
      city

        organizationName
        organizationEmail
        annualRevenue
        organizationLinkedIn
        organizationWebsite
        organizationLinkedIn
      }
      campaign {
        campaignID
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
`;