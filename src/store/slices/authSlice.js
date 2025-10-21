import { createSlice } from "@reduxjs/toolkit";

// // Demo Local Storage Data Set For Testing
// localStorage.setItem("token", "demoToken123");
// localStorage.setItem(
//   "user",
//   JSON.stringify({
//     id: 1,
//     name: "John Doe",
//     email: "johndoe@gmail.com",
//     role: "user",
//   })
// );

// 🔹 Load data from localStorage (if available)
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// 🔹 Define initial state
const initialState = {
  token: storedToken || null,
  user: storedUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Set only token
    setToken(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },

    // ✅ Set only user
    setUser(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },

    // ✅ Clear everything
    clearAuth(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

// 🔹 Export actions
export const { setToken, setUser, clearAuth } = authSlice.actions;

// 🔹 Export reducer
export default authSlice.reducer;

// 🔹 Selectors
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
