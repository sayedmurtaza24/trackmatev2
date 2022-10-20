import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./components/Login/LoginScreen";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";

export default function App() {
  return (
    <AnimatedBackgroundColorView
      color="#e7feff"
      initialColor="white"
      style={styles.homeScreen}
    >
      <LoginScreen />
      <StatusBar style="auto" />
    </AnimatedBackgroundColorView>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
