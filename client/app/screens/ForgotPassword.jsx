import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/forgotpassword.style";
// import auth from "@react-native-firebase/app";
// import auth from "@react-native-firebase/auth";

import { HorizontalItem, AppBar } from "../components";
``;
// import { auth } from "firebase";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendOtp = () => {
    // const phoneNumberWithCountryCode = "+84" + phoneNumber;
    // auth()
    //   .signInWithPhoneNumber(phoneNumberWithCountryCode)
    //   .then((confirmResult) => {
    //     navigation.navigate("OtpScreen", { confirmResult });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    navigation.navigate("OTPVerified");
  };
  // const sendOtp = async () => {
  //   const phoneNumberWithCountryCode = "+84" + phoneNumber;
  //   const result = await auth().signInWithPhoneNumber(
  //     phoneNumberWithCountryCode
  //   );
  //   setConfirmResult(result);
  // };
  // const verifyOtp = async () => {
  //   try {
  //     const credential = await confirmResult.confirm(otp);
  //     if (credential) {
  //       // OTP is correct. Navigate to the password reset screen.
  //       navigation.navigate("ResetPassword");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // OTP is incorrect or something else went wrong.
  //   }
  // };
  return (
    <View style={styles.container}>
      <AppBar
        title="Cấp lại mật khẩu"
        onPressLeftIcon={() => navigation.goBack()}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Tên người dùng
          <Text style={styles.required}> *</Text>
        </Text>
        <View style={styles.container1}></View>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Nhập tên người dùng"
        />
        <Text style={styles.label}>
          Số điện thoại
          <Text style={styles.required}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="Nhập số điện thoại"
        />
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Gửi mã OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
