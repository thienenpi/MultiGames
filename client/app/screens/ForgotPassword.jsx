import {
  Text,
  Button,
  View,
  TouchableWithoutFeedback,
  Image,
  InputField,
} from "react-native";
import React from "react";
import styles from "./styles/forgotpassword.style";
import { AppBar, MessageColumn } from "../components";
import { Ionicons } from "@expo/vector-icons";
const hideKeyboard = () => {
  Keyboard.dismiss();
};
const sendOtp = () => {};
const ForgotPassword = () => {
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View
          style={{
            height: 200,
            width: 200,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={require("../../assets/image_login.png")}
          />
        </View>
        <InputField
          icon={<Ionicons name="person" size={24}></Ionicons>}
          label={"Nhập tên đầy đủ"}
        />
        <InputField
          icon={<Ionicons name="call" size={24}></Ionicons>}
          label={"Nhập số điện thoại"}
          keyboardType={"numeric"}
        />
        <Button title="Gửi mã OTP" onPress={sendOtp} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
