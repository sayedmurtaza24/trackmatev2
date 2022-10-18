import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeacherAction } from "./teacherSlice"
import classBloc from "../bloc/classBloc";

const initialState = {
  currentClass: null,
  currentClassStats: null
};

export const getClassAction = createAsyncThunk("getClass", async classId => {
  return await classBloc.getClass(classId);
});

export const createClassAction = createAsyncThunk("createClass", async (name, thunkAPI) => {
  const response = await classBloc.createClass(name);
  thunkAPI.dispatch(getTeacherAction());
  return response;
});

export const getClassStatisticsAction = createAsyncThunk("getClassStatistics", async classId => {
  return await classBloc.getStatistics(classId);
});

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    resetClasses: (state) => {
      state.currentClass = null;
      state.currentClassStats = null;
    }
  },
  extraReducers: {
    [getClassAction.fulfilled]: (state, action) => {
      state.currentClass = action.payload;
    },
    [getClassStatisticsAction.fulfilled]: (state, action) => {
      state.currentClassStats = action.payload;
    },
    [createClassAction.fulfilled]: (state, action) => {
      state.currentClass = action.payload;
    },
  },
});

export const { resetClasses } = classSlice.actions;

export default classSlice.reducer;