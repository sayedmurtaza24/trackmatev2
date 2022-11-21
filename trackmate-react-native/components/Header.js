import { View, Text, StyleSheet } from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonStyle, ButtonShape } from "./Button";
import Separator from "./Separator";

export default function Header({
  title,
  backButton = false,
  onBackButtonPressed = () => {},
  rightButton = false,
  rightButtonIcon,
  rightButtonOnPressed,
}) {
  return (
    <View style={styles.header}>
      {backButton && (
        <Button
          icon={faArrowLeft}
          buttonStyle={ButtonStyle.TRANSPARENT}
          onPress={onBackButtonPressed}
          width={50}
          height={50}
          buttonShape={ButtonShape.ROUNDED}
        />
      )}
      {/* {backButton && <Separator width={30} />} */}
      <Text style={styles.title}>{title ? title : "Loading..."}</Text>
      {rightButton && <Separator width={30} />}
      {rightButton && rightButtonIcon ? (
        <Button
          icon={rightButtonIcon}
          buttonStyle={ButtonStyle.TRANSPARENT}
          onPress={rightButtonOnPressed}
          buttonShape={ButtonShape.ROUNDED}
          width={50}
          height={50}
        />
      ) : <Separator width={50} height={50} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: "center",
    height: 65,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
  },
});
