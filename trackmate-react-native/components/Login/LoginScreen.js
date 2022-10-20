import { View } from "react-native";
import { signIn } from "../../firebase";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import Logo from "../Logo";
import Button from "../Button";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View>
      <Logo />
      <Button title="Sign in" onPress={signIn} icon={faGoogle} />
      <StatusBar style="auto" />
    </View>
  );
}
