import { gql } from "@apollo/client";

export enum DealSortFields {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  DEAL_START_DATE = "dealStartDate",
  DEAL_END_DATE = "dealEndDate",
  DEAL_AMOUNT = "dealAmount"
}

export enum SortOrders {
  ASC = "ASC",
  DESC = "DESC"
}

export interface DealFilter {
  dealName?: string;
  leadId?: string;
  dealAmount?: string;
  dealStartDateMin?: string;
  dealStartDateMax?: string;
  dealEndDateMin?: string;
  dealEndDateMax?: string;
}

export const GET_DEALS = gql`
  query GetDeals(
    $filter: DealFilter
    $pagination: PaginationInput
    $sort: DealSortInput
  ) {
    getDeals(filter: $filter, pagination: $pagination, sort: $sort) {
      totalCount
      items {
        dealID
        dealName
        leadID
        dealStartDate
        dealEndDate
        projectRequirements
        dealAmount
        dealStatus
        userID
        user {
          userID
          name
        }
      }
    }
  }
`;

export const GET_DEAL = gql`
  query GetDeal($dealID: ID!) {
    getDeal(dealID: $dealID) {
      dealID
      dealName
      leadID
      dealStartDate
      dealEndDate
      projectRequirements
      dealAmount
      dealStatus
      userID
      user {
        userID
        name
      }
    }
  }
`;