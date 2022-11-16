import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherAction } from "../state/slices/teacherSlice";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import Header from "../components/Header";
import ClassList from "../components/ClassList";
import Footer from "../components/Footer";

export default function Overview() {
  const navigation = useNavigation();
  const firstSignIn = useSelector((store) => store.teacher.firstSignIn);
  const dispatch = useDispatch();
  const currentTeacher = useSelector(({ teacher }) => teacher.currentTeacher);
  const currentClass = useSelector(store => store.class.currentClass);

  const name = currentTeacher
    ? `${currentTeacher.firstName} ${currentTeacher.lastName}`
    : "";

  useEffect(() => {
    dispatch(getTeacherAction());
  }, [dispatch]);

  useEffect(() => {
    if (firstSignIn) {
      navigation.replace("Signup");
    }
  }, [firstSignIn]);

  useEffect(() => {
    if (currentClass) {
      navigation.navigate("Classroom");
    }
  }, [currentClass]);

  const navigateToAddClass = () => {
    navigation.navigate("AddClass");
  }

  return (
    <View style={styles.root}>
      <Logo />
      <Header title={`Welcome, ${name}!`} backButton={false} />
      <ClassList />
      <Footer onActionButtonPress={navigateToAddClass}/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    height: "100%",
  },
});
