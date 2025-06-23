// === src/features/authSlice.js ===
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};


const authSlice = createSlice({
  name: "auth",
  // initialState: { token: null, user: null },
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;