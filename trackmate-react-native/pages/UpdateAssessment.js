import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { updateAssessmentAction } from "../state/slices/assessmentSlice";
import DatePicker from "react-native-modern-datepicker";

import Header from "../components/Header";
import Input from "../components/TextInput";
import Separator from "../components/Separator";
import Button from "../components/Button";
import NumberPicker from "../components/NumberPicker";
import ToggleButton from "../components/ToggleButton";

const UpdateAssessment = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const currentAssessment = useSelector(
    (store) => store.assessment?.currentAssessment
  );

  const currentStudent = useSelector((store) => store.student?.currentStudent);

  const fieldOptions = useSelector(
    (store) => store.teacher.currentTeacher.fieldOptions
  );

  const findValueRange = (name) => {
    return fieldOptions?.find((f) => f.name === name)?.valueRange;
  };

  const [assessment, setAssessment] = useState({
    date: currentAssessment.date.split("T")[0],
    fields: currentAssessment.fields.map(f => {
      return { ...f, valueRange: findValueRange(f.name) }
    })
  });

  const updateAssessmentField = (index, value) => {
    const fields = assessment.fields.slice();
    fields[index] = value;
    setAssessment({ ...assessment, fields });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const updateAssessment = () => {
    if (
      !assessment.date ||
      !/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/gi.test(
        assessment.date
      )
    )
      return;
    dispatch(
      updateAssessmentAction({
        studentId: currentStudent.id,
        assessmentId: currentAssessment.id,
        data: assessment,
      })
    );
    navigateBack();
  };

  const scrollToSection = useRef(null);

  useEffect(() => {
    const defaultOffset = 360;
    const sectionHeight = 340;
    scrollToSection.current.scrollTo({
      x: 0,
      y: defaultOffset + sectionHeight * route.params.index,
      animated: true
    });
  }, [currentAssessment])

  return (
    <SafeAreaView style={styles.page}>
      <Header
        backButton={true}
        onBackButtonPressed={navigateBack}
        title={"Update assessment"}
      />
      <ScrollView style={styles.scrollView} ref={scrollToSection}>
        <View>
          <DatePicker
            options={{
              backgroundColor: "white",
              textHeaderColor: "#187dc9",
              textDefaultColor: "black",
              selectedTextColor: "white",
              mainColor: "#187dc9",
              textSecondaryColor: "#187dc9",
            }}
            current={assessment.date}
            selected={assessment.date}
            mode="calendar"
            style={styles.datePicker}
            onDateChange={(date) =>
              setAssessment({ ...assessment, date: date.replace(/\//g, "-") })
            }
          />
          {assessment.fields?.length &&
            assessment.fields.map((f, i) => (
              <View key={f.name} style={styles.assessmentField}>
                <Text style={styles.assessmentTitle}>{f.name}</Text>
                <Separator height={20} />
                {f.valueRange == 2 ? (
                  <ToggleButton
                    label={"Toggle " + f.name}
                    title={f.name}
                    value={f.value === 2}
                    onChange={(value) =>
                      updateAssessmentField(i, { ...f, value: value ? 2 : 1 })
                    }
                  />
                ) : (
                  <NumberPicker
                    label="Choose value"
                    currentNumber={f.value}
                    minimum={1}
                    maximum={f.valueRange}
                    onChange={(value) =>
                      updateAssessmentField(i, { ...f, value })
                    }
                  />
                )}
                <Separator height={20} />
                <Input
                  multiline={true}
                  numberOflines={4}
                  label={f.name + " comment"}
                  placeholder={"Comment on " + f.name}
                  value={f.comment}
                  onChangeText={(comment) =>
                    updateAssessmentField(i, { ...f, comment })
                  }
                  required
                />
              </View>
            ))}
          <Separator height={10} />
          <Button
            onPress={updateAssessment}
            title="Update assessment"
            icon={faPencil}
          />
        </View>
        <Separator height={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    height: "100%",
    padding: 30,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  assessmentTitle: {
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  assessmentField: {
    borderRadius: 8,
    borderColor: "#eee",
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  instruct: {
    paddingHorizontal: 10,
    fontSize: 15.5,
  },
  datePicker: {
    paddingHorizontal: 0,
  },
});

export default UpdateAssessment;
