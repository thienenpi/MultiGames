import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/forgotpassword.style";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants";
import { InputField } from "../components";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
// import auth from "@react-native-firebase/app";
// import auth from "@react-native-firebase/auth";
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
    <LinearGradient
      colors={[COLORS.lightBlue, "#fff"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.logo}>
        <Image
          style={{ flex: 1, width: undefined, height: undefined }}
          source={require("../../assets/image_login.png")}
        />
      </View>
      <InputField
        icon={<Ionicons name="person-outline" size={24}></Ionicons>}
        styles={styles}
        label={"Username"}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <InputField
        icon={<Ionicons name="keypad-outline" size={24}></Ionicons>}
        styles={styles}
        label={"Phone Number"}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <LinearGradient
          colors={COLORS.blueGradient}
          style={styles.btnContainer()}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <CustomButton
            styles={styles}
            isValid={true}
            label={"Back"}
            onPress={() => navigation.goBack()}
          ></CustomButton>
        </LinearGradient>
        <LinearGradient
          colors={COLORS.blueGradient}
          style={styles.btnContainer()}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <CustomButton
            styles={styles}
            isValid={true}
            label={"Send OTP"}
            // onPress={sendOtp}
          ></CustomButton>
        </LinearGradient>
      </View>

    </LinearGradient>
  );
};

export default ForgotPassword;
