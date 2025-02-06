

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../mutation/login.mutation";

export const useLoginUser = () => {
  const [loginMutation, { data, loading, error,reset}] = useMutation(LOGIN_MUTATION);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await loginMutation({
        variables: { email, password },
      });
  

      console.log("response",response);

    if (response.errors) {

      ;
      return { error: response.errors[0].message };
    } else {
      return response.data.login;
    }
  
    } catch (err: any) {
      // console.error("Login Error:", err.message);
      throw new Error(err.message);
    }
  };

  return { loginUser, data, loading, error,reset };
};

