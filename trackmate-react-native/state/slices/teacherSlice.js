import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teacherBloc from "../bloc/teacherBloc";

const initialState = {
  currentTeacher: null,
  firstSignIn: false
};

export const getTeacherAction = createAsyncThunk("getTeacher", async () => {
  return await teacherBloc.getTeacher();
});

export const createTeacherAction = createAsyncThunk("createTeacher", async ({ firstName, lastName }) => {
  return await teacherBloc.signupTeacher({ firstName, lastName });
});

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    resetTeacher: (state) => {
      state.currentTeacher = null;
    },
  },
  extraReducers: {
    [getTeacherAction.fulfilled]: (state, action) => {
      state.currentTeacher = action.payload;
      state.firstSignIn = false;
    },
    [getTeacherAction.rejected]: (state, action) => {
      state.firstSignIn = true;
    },
    [createTeacherAction.fulfilled]: (state, action) => {
      state.currentTeacher = action.payload
      state.firstSignIn = false;
    },
  },
});

export const { resetTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;