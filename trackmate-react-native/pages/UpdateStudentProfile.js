import React, { useState } from "react";
import {
  Picker,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateStudentAction } from "../state/slices/studentSlice";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import DatePicker from "react-native-modern-datepicker";
import Separator from "../components/Separator";
import Input, { InputType } from "../components/TextInput";
import Button from "../components/Button";

const UpdateStudentProfile = () => {
  const currentStudent = useSelector((store) => store.student?.currentStudent);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [student, setStudent] = useState({
    firstName: currentStudent.firstName,
    lastName: currentStudent.lastName,
    dob: currentStudent.dob.split("T")[0],
    gender: currentStudent.gender,
    guardianNumber: currentStudent.guardianNumber || "",
    guardianEmail: currentStudent.guardianEmail || "",
  });

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
        ...student,
      })
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header
        title="Update student profile"
        backButton={true}
        onBackButtonPressed={() => navigation.goBack()}
      />
      <ScrollView style={{ padding: 30 }}>
        <Text style={styles.label}>Date of Birth</Text>
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
        <Separator height={20} />
        <Input
          value={student.firstName}
          onChangeText={(firstName) => setStudent({ ...student, firstName })}
          label="First Name"
          placeholder="First Name"
          required={true}
        />
        <Separator height={20} />
        <Input
          value={student.lastName}
          onChangeText={(lastName) => setStudent({ ...student, lastName })}
          label="Last Name"
          placeholder="Last Name"
          required={true}
        />
        <Separator height={20} />
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.picker}
          selectedValue={student.gender}
          onValueChange={(gender) => setStudent({ ...student, gender })}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        <Separator height={20} />
        <Input
          label="Guardian Phone Number"
          placeholder="Phone Number"
          required={true}
          value={student.guardianNumber}
          type={InputType.NUMERIC}
          onChangeText={(guardianNumber) =>
            setStudent({ ...student, guardianNumber })
          }
        />
        <Separator height={20} />
        <Input
          label="Guardian Email"
          placeholder="Email"
          required={true}
          value={student.guardianEmail}
          onChangeText={(guardianEmail) =>
            setStudent({ ...student, guardianEmail })
          }
        />
        <Separator height={40} />
        <Button
          onPress={updateStudent}
          title="Update Student"
          icon={faUserEdit}
        />
        <Separator height={40} />
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
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    height: "100%",
    padding: 30,
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
  picker: {
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    height: 40,
    minHeight: 40,
    borderRadius: 6,
    fontSize: 18,
    borderColor: "transparent",
  },
  label: {
    paddingHorizontal: 10,
    fontSize: 15.5,
    padding: 10,
  },
});

export default UpdateStudentProfile;
