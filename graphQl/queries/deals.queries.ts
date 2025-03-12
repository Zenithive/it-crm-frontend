import { gql } from "@apollo/client";

export const GET_DEALS = gql`
  query GetDeals(
    $filter: DealFilter
    $pagination: PaginationInput
    $sort: DealSortInput
  ) {
    getDeals(filter: $filter, pagination: $pagination, sort: $sort) {
      dealID
      dealName
      leadID
      dealStartDate
      dealEndDate
      projectRequirements
      dealAmount
      dealStatus
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
    }
  }
`;
