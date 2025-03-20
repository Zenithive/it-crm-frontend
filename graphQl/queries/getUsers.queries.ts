import { gql } from "@apollo/client";

export const GET_RESOURCE_PROFILE = gql`
query GetUsers($filter: UserFilter, $pagination: PaginationInput, $sort: UserSortInput) {
  getUsers(filter: $filter, pagination: $pagination, sort: $sort) {
    items {
      userID
      name
      email
      role
      campaigns{
        campaignID
        campaignName
        campaignCountry
        industryTargeted
      }
    }
    totalCount
  }
}

`