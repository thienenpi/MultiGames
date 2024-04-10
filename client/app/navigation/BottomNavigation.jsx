import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#F8C06D',
  tabBarInactiveTintColor: '#7C7773',
  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: 'sfProBold',
    color: COLORS.text,
  },
  tabBarStyle: [
    {
      display: 'flex',
      backgroundColor: COLORS.button,
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
