import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { AppBar } from "../components";
import { useNavigation } from "@react-navigation/native";

const OTPVerified = () => {
  const navigation = useNavigation();

  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputs = useRef([]);

  const focusNextInput = (index) => {
    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    focusNextInput(index);
  };

  return (
    <View style={styles.container}>
      <AppBar title="Nhập mã OTP" onPressLeftIcon={() => navigation.goBack()} />
      <View style={styles.inputContainer}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleChange(index, value)}
              value={otp[index]}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gửi mã OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
    marginTop: 100,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    textAlign: "center",
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00CDF9",
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    marginTop: 40,
    marginHorizontal: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OTPVerified;
