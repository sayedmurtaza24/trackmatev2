import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header";
import Separator from "../components/Separator";
import Button, { ButtonColor, ButtonStyle } from "../components/Button";

import { deleteStudentAction } from "../state/slices/studentSlice";
import PopupDialog from "../components/PopupDialog";

const StudentProfile = () => {
  const currentStudent = useSelector((store) => store.student.currentStudent);
  const currentClassId = useSelector((store) => store.class.currentClass.id);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

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

  const deleteStudent = () => {
    dispatch(deleteStudentAction({
      classId: currentClassId,
      studentId: currentStudent.id,
    }));
    navigation.goBack();
    navigation.goBack();
  }

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
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
          style={styles.scrollView}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.part}>
            {currentStudent?.firstName}
          </Text>
          <Separator height={20} />
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.part}>{currentStudent?.lastName}</Text>
          <Separator height={20} />
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.part}>{capitalize(currentStudent?.gender)}</Text>
          <Separator height={20} />
          <Text style={styles.label}>Age</Text>
          <Text style={styles.part}>{calculateAge(currentStudent?.dob)} y.o</Text>
          <Separator height={40} />
          <Text style={styles.bigLabel}>Guardian information</Text>
          <Separator height={20} />
          <Text style={styles.label}>Guardian's number</Text>
          <Text>
            {currentStudent?.guardianNumber ||
              "Not registered yet"}
          </Text>
          <Separator height={20} />
          <Text style={styles.label}>Guardian's email</Text>
          <Text>
            {currentStudent?.guardianEmail ||
              "Not registered yet"}
          </Text>
          <Separator height={40} />
          <Button
            title="Update Information"
            icon={faEdit}
            buttonStyle={ButtonStyle.TRANSPARENT}
            onPress={navigateToUpdateStudentProfile} />
          <Separator height={10} />
          <Button
            title="Delete Student"
            onPress={() => setVisible(true)}
            buttonStyle={ButtonStyle.TRANSPARENT}
            buttonColor={ButtonColor.DANGER}
            icon={faTrash} />
        </ScrollView>
      )}
      <PopupDialog
        visible={visible}
        onOkPressed={deleteStudent}
        onCancelPressed={() => setVisible(false)}
        title="Delete Student"
        okButtonTitle="Delete"
        actionButtonColor={ButtonColor.DANGER}
        description="Deletes the student permanently, proceed with extreme caution!" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
  },
  label: {
    fontSize: 13,
    color: "gray"
  },
  bigLabel: {
    fontSize: 20
  },
  part: {
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
