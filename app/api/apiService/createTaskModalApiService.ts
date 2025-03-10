import { gql, useMutation } from "@apollo/client";
import { message } from "antd";
import { CREATE_TASK_QUERY } from "../../../graphQl/queries/createTaskModal.queries";

const useCreateTask = () => {
  const [createTaskMutation, { loading, error }] = useMutation(CREATE_TASK_QUERY);

  const createTask = async (values: any) => {
    try {
      const { data } = await createTaskMutation({
        variables: { input: values },
      });

      message.success("Task created successfully!");
      return data;
    } catch (err) {
      message.error("Failed to create task");
      throw err;
    }
  };

  return { createTask, loading, error };
};

export default useCreateTask;
