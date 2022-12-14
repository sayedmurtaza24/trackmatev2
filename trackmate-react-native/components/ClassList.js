import React from "react";
import Button, { ButtonStyle } from "./Button";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getClassAction } from "../state/slices/classSlice";

const ClassList = () => {
  const classes = useSelector(
    (store) => store.teacher?.currentTeacher?.classes
  );

  const dispatch = useDispatch()

  const goToClassroom = id => {
    dispatch(getClassAction(id))
  }

  return (
    <View style={styles.root}>
      <Text style={styles.header}>Here's your list of classes: </Text>
      {classes?.length ? (
        <FlatList
          style={styles.list}
          data={classes}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.class} key={item.id}>
              <Button
              //in order to use this function, we have to pass down what we identify as the classroom which is "item"
                onPress={() => goToClassroom(item.id)}
                title={item.className}
                buttonStyle={ButtonStyle.TRANSPARENT}
              />
            </View>
          )}
        />
      ) : (
        <Text>No classes have been created yet!</Text>
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
    height: windowHeight - 250,
  },
});

export default ClassList;
