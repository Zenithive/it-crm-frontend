export const CREATE_TASK_QUERY = `
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