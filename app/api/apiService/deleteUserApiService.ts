import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER_MUTATION } from "../../../graphQl/mutation/deleteUser.mutation"; // Adjust path as needed
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

export const useDeleteUser = (refetch: () => void) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserID, setDeleteUserID] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: () => {
      refetch(); // Refresh the user list after deletion
      handleCloseDeleteModal();
    },
    onError: (error) => {
      console.error("Failed to delete user:", error);
    },
  });

  const handleOpenDeleteModal = (userID: string) => {
    setDeleteUserID(userID);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteUserID(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteUserID) {
      deleteUser({ variables: { id: deleteUserID } }); // Use 'id' to match mutation variable
    }
  };

  return {
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
};