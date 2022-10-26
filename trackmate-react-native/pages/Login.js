import { View, StyleSheet, Text } from "react-native";
import { signIn } from "../firebase";
import { useDispatch } from "react-redux";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { loginAction } from "../state/slices/authSlice";
import { StatusBar } from "expo-status-bar";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import Button from "../components/Button";

export default function Login() {
  const dispatch = useDispatch();

  const login = async () => {
    const idToken = await signIn();
    dispatch(loginAction(idToken));
  };

  return (
    <View style={styles.loginView}>
      <Logo />
      <Separator height={30} />
      <Button title="Get started" onPress={login} icon={faGoogle} />
      <Separator height={30} />
      <Text style={styles.text}>Welcome to the official TrackMate mobile app. Let's get started. If you don't have an account, you will be able to create one.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  loginView: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  text: {
    paddingHorizontal: 50
  }
});
