import axios from "axios";
import { message } from "antd";
import {CREATE_TASK_QUERY} from "../../../graphQl/queries/createTaskModal.queries";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

export const createTask = async (values: any, token: string) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        query: CREATE_TASK_QUERY,
        variables: { input: values },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    message.success("Task created successfully!");
    return response.data;
  } catch (error) {
    message.error("Failed to create task");
    throw error;
  }
};