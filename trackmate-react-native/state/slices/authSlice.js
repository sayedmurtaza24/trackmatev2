import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authBloc from "../bloc/authBloc";

const initialState = {
  loggedIn: false,
};

export const loginAction = createAsyncThunk("login", async idToken => {
  return await authBloc.login(idToken);
});

export const logoutAction = createAsyncThunk("logout", async () => {
  return await authBloc.logout()
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: state => {
      state.loggedIn = false;
    },
  },
  extraReducers: {
    [loginAction.fulfilled]: (state) => {
      state.loggedIn = true;
    },
    [logoutAction.fulfilled]: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;