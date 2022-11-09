import React from "react";
import { View, StyleSheet } from "react-native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonShape } from "./Button";

const Footer = ({ onActionButtonPress, icon = faPlus }) => {
  return (
    <View style={styles.root}>
      <Button
        icon={icon}
        buttonShape={ButtonShape.ROUNDED}
        onPress={onActionButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row-reverse",
    position: "absolute",
    bottom: 15,
    right: 0,
  },
});

export default Footer;
