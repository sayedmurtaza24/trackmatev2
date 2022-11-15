import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-modern-datepicker";

import Header from "../components/Header";
import Input from "../components/TextInput";
import Button from "../components/Button";
import Separator from "../components/Separator";
import { createStudentAction } from "../state/slices/studentSlice";

const AddStudent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentClass = useSelector((store) => store.class.currentClass);
  const classList = useSelector((store) => store.class?.currentClass?.students);

  const [studentInfo, setStudentInfo] = React.useState({
    firstName: "",
    lastName: "",
    dob:
      classList
        ?.reduce((prev, curr) => {
          return new Date((new Date(curr?.dob).getTime() + prev.getTime()) / 2);
        }, new Date(classList[0].dob))
        ?.toISOString()
        ?.split("T")?.[0] || "",
    gender: "male",
    classId: currentClass.id,
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  const addStudent = () => {
    if (
      !studentInfo.firstName.trim() ||
      !studentInfo.lastName.trim() ||
      !/^(male|female)$/gi.test(studentInfo.gender) ||
      !/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/g.test(
        studentInfo.dob
      )
    ) {
      return;
    }
    dispatch(createStudentAction(studentInfo));
    navigateBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        backButton={true}
        onBackButtonPressed={navigateBack}
        title="Add a student"
      />
      <ScrollView style={styles.scrollView}>
        <Separator height={30} />
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
          <Text style={styles.label}>Date of birth</Text>
          <DatePicker
            options={{
              backgroundColor: "white",
              textHeaderColor: "#187dc9",
              textDefaultColor: "black",
              selectedTextColor: "white",
              mainColor: "#187dc9",
              textSecondaryColor: "#187dc9",
            }}
            current={studentInfo.dob}
            mode="calendar"
            style={styles.datePicker}
            onDateChange={(dob) =>
              setStudentInfo({ ...studentInfo, dob: dob.replace(/\//g, "-") })
            }
          />
          <Separator height={20} />
          <Picker
            style={styles.picker}
            onValueChange={(gender) =>
              setStudentInfo({ ...studentInfo, gender })
            }
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <Separator height={20} />
          <Button onPress={addStudent} title="Add" icon={faPlus} />
          <Separator height={40} />
        </View>
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
    justifyContent: "center",
  },
  label: {
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
});

export default AddStudent;
