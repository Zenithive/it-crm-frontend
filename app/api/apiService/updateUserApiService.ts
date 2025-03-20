// hooks/useUpdateUser.ts
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "../../../graphQl/mutation/updateUser.mutation";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

export interface UpdateUserInput { // Renamed from UserUpdateInput
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export const useUpdateUser = (refetch: () => void) => {
  const user = useSelector((state: RootState) => state.auth);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to update user:", error.message, error.graphQLErrors);
    },
  });

  const handleConfirmUpdate = (userID: string, input: UpdateUserInput) => {
    updateUser({
      variables: {
        userID,
        input,
      },
    });
  };

  return {
    handleConfirmUpdate,
  };
};