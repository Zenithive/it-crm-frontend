import { gql } from "@apollo/client";

export const ADD_LEAD_QUERY = gql`
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(input: $input) {
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
`;