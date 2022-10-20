import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { signIn } from "./firebase";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle"
import Logo from "./components/Logo";
import Button from './components/Button';

export default function App() {
  return (
    <View style={styles.homeScreen}>
      <Logo />
      <Button title="Sign in" onPress={signIn} icon={faGoogle} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
