import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
 mutation UpdateUser($userID: ID!, $input: UpdateUserInput!) {
  updateUser(userID: $userID, input: $input) {
    userID
    name
    email
    phone
    password
    role
  }
}
`;