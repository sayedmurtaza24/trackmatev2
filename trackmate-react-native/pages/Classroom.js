import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { resetClasses } from "../state/slices/classSlice";

import StudentList from "../components/StudentList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Classroom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentClass = useSelector((store) => store.class.currentClass);

  const navigateBack = () => {
    dispatch(resetClasses());
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <Header
        title={`Class ${currentClass.className}`}
        backButton={true}
        onBackButtonPressed={navigateBack}
      />
      <StudentList />
      <Footer onActionButtonPress={() => navigation.navigate("AddStudent")} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    height: "100%",
  },
});

export default Classroom;