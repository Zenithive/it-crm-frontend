import { gql } from "@apollo/client";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($taskID: ID!, $input: UpdateTaskInput!) {
    updateTask(taskID: $taskID, input: $input) {
      title
      description
      status
      priority
      dueDate
    }
  }
`;