import { gql } from "@apollo/client";

export const CREATE_TASK_QUERY = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      taskID
      title
      description
      status
      priority
      dueDate
    }
  }
`;