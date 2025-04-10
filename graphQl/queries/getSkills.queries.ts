import { gql } from "@apollo/client";

export const GET_SKILLS = gql `query {
  getSkills(
    filter: {}
    pagination: { page: 1, pageSize: 10 }
  ) {
    totalCount
    items {
      skillID
      name
      description
      skilltype
    }
  }
}`;