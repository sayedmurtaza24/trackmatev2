import { View, StatusBar } from "react-native";
import Logo from "../components/Logo";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherAction } from "../state/slices/teacherSlice";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Overview() {
  const navigation = useNavigation();
  const firstSignIn = useSelector((store) => store.teacher.firstSignIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeacherAction());
  }, [dispatch]);

  useEffect(() => {
    if (firstSignIn) {
        navigation.replace("Signup")
    }
  }, [firstSignIn])

  return (
    <View>
      <Logo />
      <StatusBar style="auto" />
    </View>
  );
}
