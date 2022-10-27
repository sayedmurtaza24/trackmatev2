import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { createTeacherAction } from "../state/slices/teacherSlice";
import Logo from "../components/Logo";
import Separator from "../components/Separator";
import Button from "../components/Button";

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTeacher = useSelector(store => store.teacher.currentTeacher)

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const signup = () => {
    dispatch(createTeacherAction({ firstName, lastName }));
  }

  useEffect(() => {
    if (currentTeacher) {
      navigation.replace("Overview")
    }
  }, [currentTeacher])

  return (
    <View style={styles.signupView}>
      <Logo />
      <Separator height={30} />
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
        placeholderTextColor="#aaa"
      />
      <Separator height={30} />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
        placeholderTextColor="#aaa"
      />
      <Separator height={30} />
      <Button
        title="Get started"
        icon={faArrowRight}
        iconPosition="right"
        onPress={signup}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  signupView: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "royalblue",
    borderWidth: 0.5,
    textAlign: "center",
    height: 40,
    fontSize: 20,
  },
});
