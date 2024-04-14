import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import SpyScreen from '../screens/SpyGameScreen';
import SpyMainScreen from '../screens/SpyMainScreen';

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
        name="Spy Game"
        component={SpyScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Spy Main"
        component={SpyMainScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>

    </Stack.Navigator>
  );
};

export default AppStack;