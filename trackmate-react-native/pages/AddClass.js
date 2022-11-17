import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { createClassAction } from "../state/slices/classSlice";

import Header from "../components/Header";
import Input from "../components/TextInput";
import Button from "../components/Button";
import Separator from "../components/Separator";

const AddClass = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [className, setClassName] = React.useState("");

  const navigateBack = () => {
    navigation.goBack();
  };

  const addClass = () => {
    if (!className.trim()) return;
    dispatch(createClassAction(className.trim()));
    navigateBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        backButton={true}
        onBackButtonPressed={navigateBack}
        title="Add a class"
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.page}>
          <Input
            label="Class name"
            placeholder="Class name"
            value={className}
            onChangeText={setClassName}
            required
          />
          <Separator height={20} />
          <Button onPress={addClass} title="Add" icon={faPlus} />
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
  scrollView: {
    height: "100%",
  },
});

export default AddClass;
