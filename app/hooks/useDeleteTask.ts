import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK_MUTATION } from "../../graphQl/mutation/deleteTask.mutation";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import PubSub from "../pubsub/Pubsub";

export const useDeleteTask = (refetch: () => void) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTaskID, setDeleteTaskID] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth);

  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: () => {
      refetch();

      PubSub.publish("DELETE_SUCCESS", {
      
        component: "todo"
      });
      handleCloseDeleteModal();
    },
    onError: (error) => {
      console.error("Failed to delete task:", error);
    },
  });

  const handleOpenDeleteModal = (taskID: string) => {
    setDeleteTaskID(taskID);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteTaskID(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTaskID) {
      deleteTask({ variables: { taskID: deleteTaskID } });
    }
  };

  return {
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
};
