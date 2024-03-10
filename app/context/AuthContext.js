import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { userLogin } from '../api/UserApi';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async ({ email, password }) => {
    const data = {
      email: email,
      password: password,
    };

    const res = await userLogin({ data: data });

    if (res.status === 200) {
      const responseData = res.data;

      setIsLoading(true);
      setUserInfo(responseData);
      setUserToken(responseData.token);

      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      AsyncStorage.setItem('userToken', JSON.stringify(userToken));

      setIsLoading(false);
    } else {
      Alert.alert(res.statusText, 'Please try again with another password', [
        {
          text: 'Try again',
          style: 'cancel',
        },
      ]);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem('userInfo');
        let userToken = await AsyncStorage.getItem('userToken');
        userInfo = JSON.parse(userInfo);

        if (userInfo) {
          setUserInfo(userInfo);
          setUserToken(userToken);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('isLoggedIn error: ', error);
      }
    };

    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
