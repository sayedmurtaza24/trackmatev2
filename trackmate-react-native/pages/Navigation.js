import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./Login";
import Overview from "./Overview";
import Signup from "./Signup"

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isLoggedIn = useSelector((store) => store.auth.loggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Overview" component={Overview} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer >
  );
}
