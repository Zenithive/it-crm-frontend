// queries.ts

import { gql } from "@apollo/client";

export const GET_LEADS_QUERY = gql`
  query GetLeads($filter: LeadFilter, $pagination: PaginationInput, $sort: LeadSortInput) {
    getLeads(filter: $filter, pagination: $pagination, sort: $sort) {
      items {
          leadID
        firstName
        lastName
        email
        phone
        country
        leadSource
        leadStage
        leadPriority
        linkedIn
        initialContactDate
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
        }
        campaign {
          campaignID
          campaignName
          campaignCountry
          campaignRegion
          industryTargeted
        }
      }
      totalCount
    }
  }
`;
