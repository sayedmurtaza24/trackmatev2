import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button, { ButtonStyle, ButtonSize, ButtonShape } from "./Button";
import { faTimes, faPencil } from "@fortawesome/free-solid-svg-icons";
import Separator from "./Separator";

const AssessmentComment = ({
  visible = false,
  name,
  value,
  valueRange,
  comment,
  onClose,
  onEdit,
}) => {
  return visible ? (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }} numberOfLines={1}>
          {name}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button
            icon={faPencil}
            buttonShape={ButtonShape.ROUNDED}
            buttonStyle={ButtonStyle.TRANSPARENT}
            buttonSize={ButtonSize.SMALL}
            onPress={onEdit}
          />
          <Button
            icon={faTimes}
            buttonShape={ButtonShape.ROUNDED}
            buttonStyle={ButtonStyle.TRANSPARENT}
            buttonSize={ButtonSize.SMALL}
            onPress={onClose}
          />
        </View>
      </View>
      <Separator height={10} />
      <ScrollView>
        <Text>
          Value: {value}/{valueRange}
        </Text>
        <Separator height={20} />
        <Text>Comment: {comment}</Text>
      </ScrollView>
      <Separator height={20} />
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    shadowColor: "rgb(0, 0, 0)",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    display: "flex",
    marginHorizontal: 20,
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    maxHeight: "40%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AssessmentComment;
