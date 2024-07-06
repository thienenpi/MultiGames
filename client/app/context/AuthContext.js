import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import {
  userLogin,
  userLogout,
  userRegister,
  getUserById,
  updateUserInfo,
} from "../api/UserApi";
import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isBiometric, setIsBiometric] = useState(false);
  const [supportedAuthTypes, setSupportedAuthTypes] = useState([]);

  const saveCredentials = async (email, password) => {
    await SecureStore.setItemAsync("userEmail", email);
    await SecureStore.setItemAsync("userPassword", password);
  };

  const getCredentials = async () => {
    const email = await SecureStore.getItemAsync("userEmail");
    const password = await SecureStore.getItemAsync("userPassword");
    return { email, password };
  };

  const register = async ({ data }) => {
    const res = await userRegister({ data: data });

    if (res.status === 200) {
      const responseData = res.data;
      let userInfo = responseData;
      let userPhone = responseData.phone;
      userInfo.phone = userPhone;

      setIsLoading(true);

      setIsLoading(false);
      return true
    } else {
      Alert.alert("Please try again", res.data, [
        {
          text: "Try again",
          style: "Cancel",
        },
      ]);
      return false
    }
  };

  const login = async ({ data }) => {
    const res = await userLogin({ data: data });

    if (res.status === 200) {
      await saveCredentials(data.email, data.password);
      const responseData = res.data;
      let userInfo = responseData;
      let userToken = responseData.token;

      setIsLoading(true);
      setUserInfo(userInfo);
      setUserToken(userToken);

      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      AsyncStorage.setItem("userToken", JSON.stringify(userToken));

      setIsLoading(false);
      console.log("token ", userToken);
    } else {
      Alert.alert("Login failed", res.data, [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    }
  };

  const logout = async ({ id }) => {
    const res = await userLogout({ id: id });

    if (res.status === 200) {
      Alert.alert("Goodbye!", res.data, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);

      setIsLoading(true);
      setUserToken(null);
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userInfo");
      setIsLoading(false);
    } else {
      Alert.alert("Logout failed", res.data, [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    }
  };

  const fetchUserInfo = async (id) => {
    try {
      const res = await getUserById({ id });
      if (res.status === 200) {
        const data = res.data;

        setUserInfo(data);
        AsyncStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        Alert.alert("Failed to fetch user info", res.data, [
          {
            text: "Try again",
            style: "cancel",
          },
        ]);
      }
    } catch (error) {
      //   console.error("Error fetching user info: ", error);
    }
  };

  const updateInfo = async ({ id, data }) => {
    AsyncStorage.setItem("userInfo", JSON.stringify(data));
    try {
      const res = await updateUserInfo({ id, data });
      if (res.status === 200) {
        const data = res.data;
      } else {
        Alert.alert("Failed to update user info", res.data, [
          {
            text: "Try again",
            style: "cancel",
          },
        ]);
      }
    } catch (error) {
      console.error("Error updating user info: ", error);
    }
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem("userInfo");
        let userToken = await AsyncStorage.getItem("userToken");
        userInfo = JSON.parse(userInfo);

        if (userInfo) {
          setUserInfo(userInfo);
          setUserToken(userToken);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("isLoggedIn error: ", error);
      }
    };

    const checkBiometric = async () => {
      const hasBiometric = await LocalAuthentication.hasHardwareAsync();
      setIsBiometric(hasBiometric);
    };

    const getSupportedAuthTypes = async () => {
      const supportedAuthTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setSupportedAuthTypes(supportedAuthTypes);
    };

    getSupportedAuthTypes();
    checkBiometric();
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        fetchUserInfo,
        updateInfo,
        isLoading,
        isBiometric,
        supportedAuthTypes,
        getCredentials,
        userToken,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
