import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import { signIn } from "./firebase"

export default function App() {
  return (
    <View style={styles.container}>
        <Button title="Sign-in" onPress={signIn}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
