import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomNavigation";
import {
  GuessingWord,
  SpyScreen,
  SpyMainScreen,
  BoardRoom,
  Shop,
  ItemBag,
  Setting,
  EditProfile,
  RoomHistory,
  RoomConfig,
  CreateRoom
} from "../screens";

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Guessing Word"
        component={GuessingWord}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Spy Game"
        component={SpyScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Spy Main"
        component={SpyMainScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Board Room"
        component={BoardRoom}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Item Bag"
        component={ItemBag}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Room History"
        component={RoomHistory}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Create Room"
        component={CreateRoom}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Room Config"
        component={RoomConfig}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppStack;
