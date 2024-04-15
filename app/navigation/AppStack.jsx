import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import { GuessingWord } from '../screens';
import CreateRoom from '../screens/CreateRoom';


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
        name="CreateRoom"
        component={CreateRoom}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppStack;
