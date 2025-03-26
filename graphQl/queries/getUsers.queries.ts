import { gql } from "@apollo/client";

export const GET_RESOURCE_PROFILE = gql`
query Users($filter: UserFilter, $pagination: PaginationInput, $sort: UserSortInput) {
  Users(filter: $filter, pagination: $pagination, sort: $sort) {
    items {
      userID
      name
      email
      role
      campaigns {
        campaignID
        campaignName
        campaignCountry
        industryTargeted
      }
    }
    totalCount
  }
}
`;