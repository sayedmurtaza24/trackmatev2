import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentBloc from "../bloc/studentBloc";
import { getClassAction } from "./classSlice";

const initialState = {
  currentStudent: null,
};

//get one student
export const getStudentAction = createAsyncThunk("getStudent", async (id) => {
  return await studentBloc.getStudent(id);
});

//add one student
export const createStudentAction = createAsyncThunk(
  "createStudent",
  async ({ classId, firstName, lastName, dob, gender }, thunk) => {
    const res = await studentBloc.createStudent(classId, {
      firstName,
      lastName,
      dob,
      gender,
    });
    thunk.dispatch(getClassAction(classId));
    return res;
  }
);

//add one student
export const updateStudentAction = createAsyncThunk(
  "updateStudent",
  async ({
    studentId,
    firstName,
    lastName,
    dob,
    gender,
    guardianEmail,
    guardianNumber,
  }) => {
    return await studentBloc.updateStudent(studentId, {
      firstName,
      lastName,
      dob,
      gender,
      guardianEmail,
      guardianNumber,
    });
  }
);

//delete one student
export const deleteStudentAction = createAsyncThunk(
  "deleteStudent",
  async ({ studentId, classId }, thunk) => {
    await studentBloc.deleteStudent(studentId);
    thunk.dispatch(getClassAction(classId));
  }
);

//studentSlice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetCurrentStudent: (state) => {
      state.currentStudent = null;
    },
  },
  extraReducers: {
    [getStudentAction.fulfilled]: (state, action) => {
      state.currentStudent = action.payload;
    },
    [createStudentAction.fulfilled]: (state, action) => {
      state.currentStudent = action.payload;
    },
    [updateStudentAction.fulfilled]: (state, action) => {
      state.currentStudent = action.payload;
    },
    [deleteStudentAction.fulfilled]: (state) => {
      state.currentStudent = null;
    },
  },
});

export const { resetCurrentStudent } = studentSlice.actions;

export default studentSlice.reducer;
