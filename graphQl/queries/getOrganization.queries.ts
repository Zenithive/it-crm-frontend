import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations($search: String) {
    getOrganizations(
      filter: {
        search: $search
      },
      pagination: {
        page: 1,
        pageSize: 10
      }
    ) {
      items {
        organizationID
        organizationName
      }
      totalCount
    }
  }
`;