import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  role: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    logout: () => null, // Clear user state on logout
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
