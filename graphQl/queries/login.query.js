import { LOGIN_MUTATION } from '../mutation/login.mutation.js';

const API_URL = "https://crmbackendapis.onrender.com/graphql";

export const loginUser = async (email, password) => {
  const variables = { email, password };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: LOGIN_MUTATION, variables }),
    });

    const result = await response.json();
    
    console.log("HTTP Response:", response);
    console.log("Login Result:", result);
    
    if (result.errors) {
      return { error: result.errors[0].message };
    } else {
      return result.data.login;
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    return null;
  }
};