import { View, Text, StyleSheet, TextInput } from "react-native";
import Logo from "../components/Logo";
import Separator from "../components/Separator";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import React from "react";

export default function Signup() {
  const navigation = useNavigation();

  const [input, onChangeInput] = React.useState(input);

  return (
    <View style={styles.signupView}>
      <Logo />
      <Separator height={30} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput}
        value={input}
        placeholder="your name..."
        keyboardType="numeric"
      />
      <Separator height={30} />
      <Button
        title="Get started"
        onPress={() => navigation.navigate("Overview")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  signupView: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "royalblue",
    borderWidth: 0.5,
    textAlign: "center",
    height: 40,
    fontSize: 20,
  },
});
