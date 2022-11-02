import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Separator from "./Separator";

export const IconPosition = Object.freeze({
  RIGHT: "right",
  LEFT: "left",
});

export const ButtonStyle = Object.freeze({
  SOLID: "solid",
  TRANSPARENT: "transparent",
});

export const ButtonShape = Object.freeze({
  ROUNDED: "rounded",
  RECTANGULAR: "rectangular",
});

export const ButtonSize = Object.freeze({
  NORMAL: "normal",
  SMALL: "small",
});

export default function Button({
  onPress,
  title,
  icon,
  iconPosition = IconPosition.LEFT,
  buttonStyle = ButtonStyle.SOLID,
  buttonShape = ButtonShape.RECTANGULAR,
  buttonSize = ButtonSize.NORMAL,
  width,
  height,
}) {
  const textIconColor = buttonStyle === ButtonStyle.SOLID ? "white" : "#187dc9";
  const highlightColor =
    buttonStyle === ButtonStyle.SOLID ? "#3297e3" : "#ececec";
  const bgColor = buttonStyle === ButtonStyle.SOLID ? "#187dc9" : "transparent";

  return (
    <TouchableHighlight
      style={{
        backgroundColor: bgColor,
        width,
        height,
        borderRadius: buttonShape === ButtonShape.ROUNDED ? "50%" : 8,
      }}
      underlayColor={highlightColor}
      onPress={onPress}
    >
      <View style={{ ...styles.button }}>
        {iconPosition === "left" && (
          <>
            {icon && <FontAwesomeIcon color={textIconColor} size={18} icon={icon} />}
            {title && <Separator width={10} />}
          </>
        )}
        {!!title && (
          <Text style={{
            color: textIconColor,
            fontSize: buttonSize === ButtonSize.NORMAL ? 18 : 15,
          }}>{title}</Text>
        )}
        {iconPosition === "right" && (
          <>
            {title && <Separator width={10} />}
            {icon && <FontAwesomeIcon
              color={textIconColor}
              size={buttonSize === ButtonSize.NORMAL ? 18 : 15}
              icon={icon} />}
          </>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
  },
});
