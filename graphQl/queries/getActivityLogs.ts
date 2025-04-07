import { gql } from '@apollo/client';

export const GET_ACTIVITY_LOGS = gql`
  query GetActivityLogs($entityType: String!, $entityID: ID!) {
    getActivityLogs(entityType: $entityType, entityID: $entityID) {
      id
      user {
        name
        email
      }
      action
      entityType
      entityID
      changedAt
      newData
      oldData
    }
  }
`;