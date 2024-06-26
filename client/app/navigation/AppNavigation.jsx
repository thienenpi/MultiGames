import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventProvider } from "../context/EventContext";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <EventProvider>
        <Stack.Navigator>
          {userToken !== null ? (
            <Stack.Screen
              name="App"
              component={AppStack}
              options={{ headerShown: false }}
            ></Stack.Screen>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false }}
            ></Stack.Screen>
          )}
        </Stack.Navigator>
      </EventProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
