import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { resetCurrentStudent } from "../state/slices/studentSlice";

const StudentPage = () => {
  const navigation = useNavigation();
  const currentStudent = useSelector((store) => store?.student?.currentStudent);
  const currentClass = useSelector((store) => store.class.currentClass);
  const fieldOptions = useSelector(
    (store) => store.teacher.currentTeacher.fieldOptions
  );
  const dispatch = useDispatch();

  const navigateBack = () => {
    dispatch(resetCurrentStudent());
    navigation.goBack();
  };

  const navigateToAddAssessment = () => {
    navigation.navigate("AddAssessment");
  };

  return (
    <View style={styles.root}>
      <Header
        backButton={true}
        onBackButtonPressed={navigateBack}
        title={
          (currentStudent?.firstName || "Loading") +
          " " +
          (currentStudent?.lastName || "") +
          " - " +
          (currentClass.className || "Loading")
        }
      />
      <View style={styles.fieldOptionHeader}>
        {fieldOptions.map((field) => {
          return (
            <View
              key={field.name + field.valueRange}
              style={styles.fieldOptionHeaderTile}
            >
              <Text
                style={{
                  flexWrap: "nowrap",
                  width: 150,
                }}
              >
                {field.name}
              </Text>
            </View>
          );
        })}
      </View>
      <Footer onActionButtonPress={navigateToAddAssessment} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  fieldOptionHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E0FFFF",
    justifyContent: "flex-end",
  },
  fieldOptionHeaderTile: {
    width: 80,
    maxWidth: 80,
    height: 150,
    maxHeight: 200,
    transform: "rotate(-65deg)",
  },
});

export default StudentPage;
