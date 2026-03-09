import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  email?: string;
  phone?: string;
  password?: string;
}

interface AuthState {
  user: User | null;
}

const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginAction, registerAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
