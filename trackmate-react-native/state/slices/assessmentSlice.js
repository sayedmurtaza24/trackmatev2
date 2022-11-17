import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assessmentBloc from "../bloc/assessmentBloc";
import { getStudentAction } from "./studentSlice";

const initialState = {
  currentAssessment: null,
};

export const createAssessmentAction = createAsyncThunk(
  "createAssessment",
  async ({ studentId, data }, thunk) => {
    const res = await assessmentBloc.addAssessment(studentId, data)
    thunk.dispatch(getStudentAction(studentId));
    return res;
  });

export const updateAssessmentAction = createAsyncThunk(
  "updateAssessment",
  async ({ assessmentId, studentId, data }, thunk) => {
    const res = await assessmentBloc.updateAssessment(assessmentId, data)
    thunk.dispatch(getStudentAction(studentId));
    return res;
  });

export const deleteAssessmentAction = createAsyncThunk("deleteAssessment", async assessmentId => {
  return await assessmentBloc.deleteAssessment(assessmentId);
});

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    resetAssessments: (state) => {
      state.currentAssessment = null;
    },
    selectAssessment: (state, action) => {
      state.currentAssessment = action.payload;
    }
  },
  extraReducers: {
    [createAssessmentAction.fulfilled]: (state, action) => {
      state.currentAssessment = null;
    },
    [updateAssessmentAction.fulfilled]: (state, action) => {
      state.currentAssessment = null;
    },
    [deleteAssessmentAction.fulfilled]: (state) => {
      state.currentAssessment = null;
    },
  },
});

export const { resetAssessments, selectAssessment } = assessmentSlice.actions;

export default assessmentSlice.reducer;