import React from "react";
import Button, { ButtonStyle } from "./Button";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { useSelector } from "react-redux";

const StudentList = () => {
  const students = useSelector(
    (store) => store.class?.currentClass?.students
  );

  return (
    <View style={styles.root}>
      <Text style={styles.header}>Here's your list of students: </Text>
      {students?.length ? (
        <FlatList
          style={styles.list}
          data={students}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.class} key={item.id}>
              <Button
                onPress={() => {}}
                title={`${item.firstName} ${item.lastName}`}
                buttonStyle={ButtonStyle.TRANSPARENT}
              />
            </View>
          )}
        />
      ) : (
        <Text>No students have been created yet!</Text>
      )}
    </View>
  );
};

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 10,
  },
  class: {
    backgroundColor: "#eee",
    textAlign: "center",
    height: 60,
    fontSize: 80,
    alignContent: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  list: {
    height: windowHeight - 180,
  },
});

export default StudentList;
