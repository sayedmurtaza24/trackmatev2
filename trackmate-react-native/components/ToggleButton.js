import React from "react";
import { StyleSheet, Text } from "react-native";
import Separator from "./Separator";
import Button, { ButtonStyle, IconPosition } from "./Button";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

function ToggleButton({ label, title, value = false, onChange }) {
  return (
    <>
    {label && <Text style={styles.label}>{label}</Text>}
    {label && <Separator height={10} />}
      {value ? (
        <Button
          title={title}
          icon={faCheck}
          iconPosition={IconPosition.RIGHT}
          onPress={() => onChange(!value)}
        />
      ) : (
        <Button
          title={title}
          iconPosition={IconPosition.RIGHT}
          icon={faTimes}
          buttonStyle={ButtonStyle.TRANSPARENT}
          onPress={() => onChange(!value)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 10,
    fontSize: 15.5,
  },
});

export default ToggleButton;
