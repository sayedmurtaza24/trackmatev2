import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTeacherAction } from "../state/slices/teacherSlice";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./Login";
import Signup from "./Signup";
import AddClass from "./AddClass";
import Overview from "./Overview";
import Classroom from "./Classroom";
import AddStudent from "./AddStudent";
import StudentPage from "./StudentPage";
import AddAssessment from "./AddAssessment";
import StudentProfile from "./StudentProfile";
import UpdateAssessment from "./UpdateAssessment";
import UpdateStudentProfile from "./UpdateStudentProfile";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.auth.loggedIn);

  useEffect(() => {
    dispatch(getTeacherAction());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Overview" component={Overview} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="AddClass" component={AddClass} />
            <Stack.Screen name="Classroom" component={Classroom} />
            <Stack.Screen name="AddStudent" component={AddStudent} />
            <Stack.Screen name="StudentPage" component={StudentPage} />
            <Stack.Screen name="AddAssessment" component={AddAssessment} /> 
            <Stack.Screen name="UpdateAssessment" component={UpdateAssessment} />
            <Stack.Screen name="StudentProfile" component={StudentProfile} />
            <Stack.Screen name="UpdateStudentProfile" component={UpdateStudentProfile} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
