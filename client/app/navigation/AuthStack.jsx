import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import OTPVerified from "../screens/OTPVerified";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      ></Stack.Screen> */}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPVerified"
        component={OTPVerified}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
