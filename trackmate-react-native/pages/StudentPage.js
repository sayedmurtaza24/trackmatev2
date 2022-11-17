import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { resetCurrentStudent } from "../state/slices/studentSlice";
import { selectAssessment } from "../state/slices/assessmentSlice";

import Header from "../components/Header";
import Footer from "../components/Footer";
import DateTile from "../components/DateTile";
import AssessmentTile from "../components/AssessmentTile";
import AssessmentComment from "../components/AssessmentComment";

const StudentPage = () => {
  const navigation = useNavigation();
  const [selectedAssessmentF, setSelectedAssessmentF] = useState(null);
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

  const makeItEllipsis = (txt) => {
    return txt.length > 13 ? txt.slice(0, 13) + "..." : txt;
  };

  const findValueRange = (name) => {
    return fieldOptions?.find((f) => f.name === name)?.valueRange;
  };

  const sortAssessmentByDate = (assessments) => {
    return assessments
      ?.slice()
      ?.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const onEdit = () => {
    setSelectedAssessmentF(null);
    navigation.navigate("UpdateAssessment");
  };

  return (
    <SafeAreaView style={styles.root}>
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.fieldOptionHeader}>
          <View style={{ ...styles.dateTile, ...styles.headerTile }}>
            <Text>Date</Text>
          </View>
          {fieldOptions.map((field) => {
            return (
              <View
                style={{ ...styles.headerTile }}
                key={field.name + field.valueRange}
              >
                <Text style={styles.fieldOptionHeaderTitle}>
                  {makeItEllipsis(field.name)}
                </Text>
              </View>
            );
          })}
        </View>
        <ScrollView>
          {sortAssessmentByDate(currentStudent?.assessments)?.map(
            (assessment) => {
              return (
                <View key={assessment.date} style={styles.assessmentField}>
                  <DateTile date={assessment.date} />
                  {assessment?.fields?.map((f) => {
                    return (
                      <AssessmentTile
                        onPress={() => {
                          setSelectedAssessmentF({
                            ...f,
                            valueRange: findValueRange(f.name),
                          });
                          dispatch(selectAssessment(assessment));
                        }}
                        key={f.name}
                        value={f.value}
                        valueRange={findValueRange(f.name)}
                      />
                    );
                  })}
                </View>
              );
            }
          )}
        </ScrollView>
      </ScrollView>
      <AssessmentComment
        visible={!!selectedAssessmentF}
        name={selectedAssessmentF?.name}
        value={selectedAssessmentF?.value}
        valueRange={selectedAssessmentF?.valueRange}
        comment={selectedAssessmentF?.comment || "No comment for this field"}
        onClose={() => {
          setSelectedAssessmentF(null);
          dispatch(selectAssessment(null));
        }}
        onEdit={onEdit}
      />
      <Footer onActionButtonPress={navigateToAddAssessment} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "#E0FFFF",
  },
  fieldOptionHeader: {
    display: "flex",
    flexDirection: "row",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTile: {
    width: 60,
    maxWidth: 60,
    height: 130,
    maxHeight: 130,
  },
  dateTile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fieldOptionHeaderTitle: {
    transform: "translate(-35px, 35px) rotate(-74.1deg)",
    width: 150,
  },
  assessmentField: {
    display: "flex",
    flexDirection: "row",
  },
});

export default StudentPage;
