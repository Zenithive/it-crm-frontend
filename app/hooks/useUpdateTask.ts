import { useMutation } from "@apollo/client";
import { UPDATE_TASK_MUTATION } from "../../graphQl/mutation/updateTask.mutation";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";

export const useUpdateTask = (refetch: () => void) => {
  const user = useSelector((state: RootState) => state.auth);
  const token = user?.token; // Ensure token exists

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    context: token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined, // Prevents issues if token is missing
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });

  const handleConfirmUpdate = (taskID: string, input: any) => {
    if (!taskID) {
      console.error("Error: taskID is required");
      return;
    }

    updateTask({
      variables: {
        taskID, // Ensure this is an ID!
        input,
      },
    });
  };

  return {
    handleConfirmUpdate,
  };
};
