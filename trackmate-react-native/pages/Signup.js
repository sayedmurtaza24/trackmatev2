import React, { useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { createTeacherAction } from "../state/slices/teacherSlice";

import Logo from "../components/Logo";
import Separator from "../components/Separator";
import Button, { ButtonStyle } from "../components/Button";
import FieldOptions from "../components/FieldOption";
import Input from "../components/TextInput";

const descriptionText = `Step 2. This is where you choose the name of your assessment fields and their respective range.

For example you can add "Performance" as your metric and assign values between 1-4 to represent "very bad" to "very good".
`;

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTeacher = useSelector((store) => store.teacher.currentTeacher);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [teacherFields, setTeacherFields] = React.useState([
    {
      name: "",
      valueRange: 1,
    },
  ]);

  const changeField = (index, attribute, value) => {
    const fields = teacherFields.slice();
    fields[index][attribute] = value;
    setTeacherFields(fields);
  };

  const signup = () => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      teacherFields.some((f) => f.name.trim() && f.valueRange > 0)
    ) {
      dispatch(
        createTeacherAction({
          firstName,
          lastName,
          fieldOptions: teacherFields,
        })
      );
    } else {
      console.log("Not complete");
    }
  };

  useEffect(() => {
    if (currentTeacher) {
      navigation.replace("Overview");
    }
  }, [currentTeacher]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.signupView}>
          <Logo />
          <Separator height={10} />
          <Text style={styles.help}>Step 1. Please fill in your details.</Text>
          <Separator height={10} />
          <Input
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
            required
          />
          <Separator height={10} />
          <Input
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            required
          />
          <Separator height={30} />
          <Text style={styles.help}>{descriptionText}</Text>
          <Separator height={20} />
          {teacherFields.map((field, i) => {
            return (
              <View key={`${i}`}>
                <FieldOptions
                  nameValue={field.name}
                  rangeValue={field.valueRange}
                  deletable={i !== 0}
                  onRemove={() =>
                    setTeacherFields((f) => [
                      ...f.slice(0, i),
                      ...f.slice(i + 1, f.length),
                    ])
                  }
                  onNameChange={(txt) => changeField(i, "name", txt)}
                  onRangeChange={(num) => changeField(i, "valueRange", num)}
                />
                <Separator height={10} />
              </View>
            );
          })}
          <Button
            icon={faPlus}
            buttonStyle={ButtonStyle.TRANSPARENT}
            width={200}
            onPress={() => {
              if (teacherFields.length < 6)
                setTeacherFields((f) => f.concat({ name: "", valueRange: 1 }));
            }}
          />
          <Separator height={50} />
          <Button
            title="Done"
            icon={faCheck}
            iconPosition="right"
            onPress={signup}
            width={200}
          />
        </View>
        <Separator height={20} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signupView: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    height: "100%",
  },
  help: {
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 17,
    color: "#555",
  },
});
