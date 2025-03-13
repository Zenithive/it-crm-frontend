import { gql } from "@apollo/client";

export const GET_TASKS_QUERY = gql`
  query GetTasks($dueDate: String!) {
    getTasksByUser(filter: { dueDate: $dueDate }) {
      items {
        taskID
        title
        status
        priority
        dueDate
      }
      totalCount
    }
  }
`;