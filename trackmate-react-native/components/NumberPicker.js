import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button, { ButtonStyle, ButtonShape } from "./Button";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Separator from "./Separator";

function NumberPicker({
  label,
  currentNumber = 2,
  minimum = 2,
  maximum,
  onChange,
}) {
  const [value, setValue] = React.useState(currentNumber);

  const onValueChange = (operation) => {
    if (operation(value) < minimum || operation(value) > maximum) return;
    const v = operation(value);
    setValue(v);
    onChange(v);
  };

  const increase = () => onValueChange((v) => v + 1);
  const decrease = () => onValueChange((v) => v - 1);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      {label && <Separator height={10} />}
      <View style={styles.root}>
        <Button
          onPress={decrease}
          icon={faMinus}
          buttonStyle={ButtonStyle.TRANSPARENT}
          buttonShape={ButtonShape.ROUNDED}
        />
        <Text style={styles.text}>{value}</Text>
        <Button
          onPress={increase}
          icon={faPlus}
          buttonStyle={ButtonStyle.TRANSPARENT}
          buttonShape={ButtonShape.ROUNDED}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
  label: {
    paddingHorizontal: 10,
    fontSize: 15.5,
  },
});

export default NumberPicker;
