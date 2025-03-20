import { gql } from "@apollo/client";

export const DELETE_USER_MUTATION = gql`

mutation DeleteUser($id: ID!) {
    deleteUser(userID: $id) {
      name
      email
      phone
      password
      role
    }
  }
`