import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  role: "",
  token: "",
  googleAccessToken: "",
  authProvider: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.googleAccessToken = action.payload.googleAccessToken || "";
      state.authProvider = action.payload.authProvider || "";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.role = "";
      state.token = "";
      state.googleAccessToken = "";
      state.authProvider = "";
      state.isAuthenticated = false;

      localStorage.removeItem('selectedFilters');
      localStorage.removeItem('filterStartDate');
      localStorage.removeItem('filterEndDate');
      localStorage.removeItem('filter-active-section');
      localStorage.removeItem('selectdata');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;