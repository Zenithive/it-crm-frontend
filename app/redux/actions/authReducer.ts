// Initial State
const initialState = {
    user: null, // Store user details after login
    token: null, // Store authentication token
    isAuthenticated: false, // Track if user is logged in
  };
  
  // Action Types
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGOUT = "LOGOUT";
  
  // Reducer Function
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };
  
  // Action Creators
  export const loginSuccess = (user, token) => ({
    type: LOGIN_SUCCESS,
    payload: { user, token },
  });
  
  export const logout = () => ({
    type: LOGOUT,
  });
  