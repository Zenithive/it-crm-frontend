import axios from "axios";
import { message } from "antd";
import {CREATE_TASK_QUERY} from "../../../graphQl/queries/createTaskModal.queries";

const API_URL = "https://crmbackendapis.onrender.com/graphql";

export const createTask = async (values: any, token: string) => {
  try {
    const response = await axios.post(
      API_URL,
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