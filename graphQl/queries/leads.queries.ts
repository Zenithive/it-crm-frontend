import { gql } from "@apollo/client";


export enum LeadSortField {
  FIRST_NAME = "FIRST_NAME",
  LAST_NAME = "LAST_NAME", 
  EMAIL = "EMAIL",
  CREATED_AT = "CREATED_AT"
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC"
}


export const GET_LEADS = gql`
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
        activities {
          activityID
          activityType
          dateTime
          communicationChannel
          contentNotes
          participantDetails
          followUpActions
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
