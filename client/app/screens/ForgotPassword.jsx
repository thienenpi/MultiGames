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
const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendOtp = () => {
    // Logic to send OTP goes here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Tên người dùng
        <Text style={styles.required}> *</Text>
      </Text>

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
      {/* <Button
        style={styles.button}
        // color={styles.button.backgroundColor}
        title="Gửi mã OTP"
        onPress={sendOtp}
      /> */}
    </View>
  );
};

export default ForgotPassword;
