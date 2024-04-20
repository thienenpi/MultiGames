import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Message, Profile } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import Store from "../screens/Store";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: "#F8C06D",
  tabBarInactiveTintColor: "#7C7773",
  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: "sfProBold",
    color: COLORS.text,
  },
  tabBarStyle: [
    {
      display: "flex",
    },
    null,
  ],
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home-outline" size={24} />;
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="storefront-outline" size={24}></Ionicons>;
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons name="chatbubble-ellipses-outline" size={24}></Ionicons>
            );
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="person-circle-outline" size={24}></Ionicons>;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigation;
