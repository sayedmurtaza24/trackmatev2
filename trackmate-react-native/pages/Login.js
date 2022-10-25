import { View, StyleSheet } from "react-native";
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
      <Button title="Sign in" onPress={login} icon={faGoogle} />
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
  },
});
