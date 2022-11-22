import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import DatePicker from "react-native-modern-datepicker";

import { deleteStudentAction } from "../state/slices/studentSlice";
import { updateStudentAction } from "../state/slices/studentSlice";
import Input from "../components/TextInput";

const UpdateStudentProfile = () => {
  const currentStudent = useSelector((store) => store.student?.currentStudent);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [student, setStudent] = useState({
    firstName: currentStudent.firstName,
    lastname: currentStudent.lastName,
    dob: currentStudent.dob.split("T")[0],
    gender: currentStudent.gender,
    guardianNumber: currentStudent.number || "",
    guardianEmail: currentStudent.email || "",
  });

  console.log(student)

  const updateStudentField = (index, value) => {
    const fields = student.fields.slice();
    fields[index] = value;
    setStudent({ ...student, fields });
  };

  const updateStudent = () => {
    if (
      !student.dob ||
      !/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/gi.test(
        student.dob
      )
    )
      return;
    dispatch(
      updateStudentAction({
        studentId: currentStudent.id,
        assessmentId: currentAssessment.id,
        data: assessment,
      })
    );
    navigateBack();
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header
        title="Update student profile"
        backButton={true}
        onBackButtonPressed={() => navigation.goBack()}
      />
      <ScrollView>
        <DatePicker
          options={{
            backgroundColor: "white",
            textHeaderColor: "#187dc9",
            textDefaultColor: "black",
            selectedTextColor: "white",
            mainColor: "#187dc9",
            textSecondaryColor: "#187dc9",
          }}
          current={currentStudent.dob}
          selected={currentStudent.dob}
          mode="calendar"
          style={styles.datePicker}
          onDateChange={(dob) =>
            setStudent({ ...student, dob: dob.replace(/\//g, "-") })
          }
        />
        <Input />
        <Input />
        <Input />
        <Input />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
  },
  page: {
    height: "100%",
    padding: 30,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  instruct: {
    paddingHorizontal: 10,
    fontSize: 15.5,
  },
  datePicker: {
    paddingHorizontal: 0,
  },
});

export default UpdateStudentProfile;
