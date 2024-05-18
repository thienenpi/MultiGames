import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { userLogin, userRegister } from "../api/UserApi";
import { Alert } from "react-native";
// import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const register = async ({ data }) => {
    const res = await userRegister({ data: data });

    if (res.status === 200) {
      const responseData = res.data;
      let userInfo = responseData;
      let userToken = responseData.token;
      let userPhone = responseData.phone;
      userInfo.phone = userPhone;

      setIsLoading(true);
      setUserInfo(userInfo);
      setUserToken(userToken);

      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)).catch(
        (error) => {
          console.error("Error storing user info: ", error);
        }
      );

      AsyncStorage.setItem("userToken", JSON.stringify(userToken)).catch(
        (error) => {
          console.error("Error storing user token: ", error);
        }
      );

      // AsyncStorage.setItem("userPhone", JSON.stringify(userPhone));
      // auth()
      //   .signInWithPhoneNumber(userPhone)
      //   .then((confirmResult) => {
      //     // Save the confirmation result to use in the OTP verification step
      //     AsyncStorage.setItem("confirmResult", JSON.stringify(confirmResult));
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      setIsLoading(false);
    } else {
      Alert.alert(res.data, "Please try again", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    }
  };

  const login = async ({ data }) => {
    const res = await userLogin({ data: data });

    if (res.status === 200) {
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
      Alert.alert(res.data, "Please try again with another password", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
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

    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
