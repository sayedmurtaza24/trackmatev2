import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import Input from "../components/TextInput";
import Button from "../components/Button";
import Separator from "../components/Separator";
import { createStudentAction } from "../state/slices/studentSlice";

const AddStudent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentClass = useSelector((store) => store.class.currentClass);
  const [studentInfo, setStudentInfo] = React.useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    classId: currentClass.id,
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  const addStudent = () => {
    if (
      !studentInfo.firstName.trim() ||
      !studentInfo.lastName.trim() ||
      !/^(male|female|m|f)$/gi.test(studentInfo.gender) ||
      !/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/g.test(
        studentInfo.dob
      )
    ) { return }
    dispatch(createStudentAction(studentInfo));
    navigateBack();
  };

  return (
    <View style={styles.root}>
      <Header
        backButton={true}
        onBackButtonPressed={navigateBack}
        title="Add a student"
      />
      <View style={styles.page}>
        <Input
          label="First Name"
          placeholder="First name"
          value={studentInfo.firstName}
          onChangeText={(firstName) =>
            setStudentInfo({ ...studentInfo, firstName })
          }
          required
        />
        <Separator height={20} />
        <Input
          label="Last Name"
          placeholder="Last name"
          value={studentInfo.lastName}
          onChangeText={(lastName) =>
            setStudentInfo({ ...studentInfo, lastName })
          }
          required
        />
        <Separator height={20} />
        <Input
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          value={studentInfo.dob}
          onChangeText={(dob) => setStudentInfo({ ...studentInfo, dob })}
          required
        />
        <Separator height={20} />
        <Input
          label="Gender"
          placeholder="Gender"
          value={studentInfo.gender}
          onChangeText={(gender) => setStudentInfo({ ...studentInfo, gender })}
          required
        />
        <Separator height={20} />
        <Button onPress={addStudent} title="Add" icon={faPlus} />
        <Separator height={40} />
      </View>
    </View>
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
    justifyContent: "center",
  },
});

export default AddStudent;
