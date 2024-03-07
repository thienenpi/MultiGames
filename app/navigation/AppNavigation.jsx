import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const AppNavigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack></AppStack> : <AuthStack></AuthStack>}
    </NavigationContainer>
  );
};

export default AppNavigation;
