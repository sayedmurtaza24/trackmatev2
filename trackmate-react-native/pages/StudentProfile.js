import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

import Separator from "../components/Separator";
import Footer from "../components/Footer";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const StudentProfile = () => {
  const currentStudent = useSelector((store) => store.student.currentStudent);
  const navigation = useNavigation();

  const isLoading = !currentStudent?.firstName;

  const calculateAge = (dob) => {
    const date = new Date(dob).getFullYear();
    const now = new Date().getFullYear();
    return now - date;
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const navigateToUpdateStudentProfile = () => {
    navigation.navigate("UpdateStudentProfile");
  };

  return (
    <View style={styles.root}>
      <Header
        title="Student information"
        backButton={true}
        onBackButtonPressed={() => navigation.goBack()}
      />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.name}>
            {`${currentStudent?.firstName} ${currentStudent?.lastName}`}
          </Text>
          <Text style={{ fontSize: 14, paddingVertical: 5 }}>
            {`${capitalize(currentStudent?.gender)} | ${calculateAge(
              currentStudent?.dob
            )} y.o.`}
          </Text>
          <Separator height={40} />
          <Text style={{ fontSize: 16 }}>Guardian information:</Text>
          <Text>
            {currentStudent?.guardianNumber ||
              "Guardian number not yet registered"}
          </Text>
          <Text>
            {currentStudent?.guardianEmail ||
              "Guardian email not yet registered"}
          </Text>
        </ScrollView>
      )}
      <Footer onActionButtonPress={navigateToUpdateStudentProfile} icon={faEdit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
  },
  name: {
    fontSize: 25,
  },
  loading: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    padding: 40,
  },
});

export default StudentProfile;
