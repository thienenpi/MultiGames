import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Message, Profile, Shop, Dashboard } from "../screens";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Platform, StyleSheet, Text } from "react-native";

const IS_IOS = Platform.OS === "ios";
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
      height: IS_IOS ? 80 : 60,
    },
    null,
  ],
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="game-controller-outline"
                size={24}
                color={focused ? COLORS.primaryDark : COLORS.text}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return <Text style={styles.tabBarLabel(focused)}>Dashboard</Text>;
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? COLORS.primaryDark : COLORS.text}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return <Text style={styles.tabBarLabel(focused)}>Shop</Text>;
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={focused ? COLORS.primaryDark : COLORS.text}
              ></Ionicons>
            );
          },
          tabBarLabel: ({ focused }) => {
            return <Text style={styles.tabBarLabel(focused)}>Message</Text>;
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                color={focused ? COLORS.primaryDark : COLORS.text}
                name="person-circle-outline"
                size={24}
              ></Ionicons>
            );
          },
          tabBarLabel: ({ focused }) => {
            return <Text style={styles.tabBarLabel(focused)}>Profile</Text>;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBarLabel: (focused) => ({
    fontSize: SIZES.medium,
    fontFamily: "sfProBold",
    color: focused ? COLORS.primaryDark : COLORS.text,
  }),
});
