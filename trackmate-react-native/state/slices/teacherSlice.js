import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teacherBloc from "../bloc/teacherBloc";

const initialState = {
  currentTeacher: null,
};

export const getTeacherAction = createAsyncThunk("getTeacher", async () => {
  return await teacherBloc.getTeacher();
});

export const createTeacherAction = createAsyncThunk("createTeacher", async name => {
  return await teacherBloc.signupTeacher(name);
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
    },
    [createTeacherAction.fulfilled]: (state, action) => {
      state.currentTeacher = action.payload
    },
  },
});

export const { resetTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;