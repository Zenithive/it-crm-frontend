import { gql } from "@apollo/client";

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($taskID: ID!) {
    deleteTask(taskID: $taskID) {
      taskID
      title
      status
      priority
    }
  }
`;
