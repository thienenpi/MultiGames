import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#F8C06D',
  tabBarInactiveTintColor: '#7C7773',
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarStyle: [
    {
      display: 'flex',
      backgroundColor: 'black',
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
            return <Ionicons name="home" size={24} />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigation;
