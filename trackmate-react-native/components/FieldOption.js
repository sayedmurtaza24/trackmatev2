import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import Button, { ButtonSize, ButtonStyle } from "./Button";
import Separator from "./Separator";
import Input, { InputType } from "./TextInput";
import NumberPicker from "./NumberPicker";

const FieldOptions = ({
  onNameChange,
  onRangeChange,
  nameValue,
  rangeValue,
  deletable = true,
  onRemove,
}) => {
  return (
    <View style={styles.root}>
      <Input
        label="Field name"
        placeholder="Name of field"
        style={styles.input}
        value={nameValue}
        onChangeText={onNameChange}
      />
      <Separator height={10} />
      <NumberPicker
        label="Range of values"
        minimum={2}
        maximum={10}
        currentNumber={rangeValue}
        onChange={(value) => onRangeChange(value)}
      />
      <Separator height={10} />
      {deletable && (
        <Button
          title="Remove"
          icon={faTrash}
          buttonStyle={ButtonStyle.TRANSPARENT}
          onPress={onRemove}
          buttonSize={ButtonSize.SMALL}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: "rgb(250, 250, 250)",
    display: "flex",
    borderRadius: 8,
  },
});

export default FieldOptions;
