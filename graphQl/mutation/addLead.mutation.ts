import { gql } from "@apollo/client";

export const ADD_LEAD_QUERY = gql`
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(input: $input) {
      leadID
      firstName
      email
      leadStage
      leadType
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
        organizationName
        organizationWebsite
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