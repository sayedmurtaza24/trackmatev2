import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assessmentBloc from "../bloc/assessmentBloc";
import { getStudentAction } from "./studentSlice";

const initialState = {
  currentAssessment: null,
};

export const createAssessmentAction = createAsyncThunk(
  "createAssessment",
  async ({ studentId, present, good_behave, good_perf, date, perf_comment, behave_comment }, thunk) => {
    const res = await assessmentBloc.addAssessment(studentId, {
      present, good_behave, good_perf, date, perf_comment, behave_comment
    })
    thunk.dispatch(getStudentAction(studentId))
    return res;
  });

export const updateAssessmentAction = createAsyncThunk(
  "updateAssessment",
  async ({ assessmentId, studentId, present, good_behave, good_perf, perf_comment, behave_comment }, thunk) => {
    const res = await assessmentBloc.updateAssessment(assessmentId, {
      present, good_behave, good_perf, perf_comment, behave_comment
    })
    thunk.dispatch(getStudentAction(studentId))
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
      state.currentAssessment = action.payload;
    },
    [updateAssessmentAction.fulfilled]: (state, action) => {
      state.currentAssessment = action.payload;
    },
    [deleteAssessmentAction.fulfilled]: (state) => {
      state.currentClass = null;
    },
  },
});

export const { resetAssessments, selectAssessment } = assessmentSlice.actions;

export default assessmentSlice.reducer;