import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/login.style";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    login({ data: data });
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View
          style={{
            height: 200,
            width: 200,
            alignSelf: "center",
            marginTop: -40,
            marginBottom: 50,
          }}
        >
          <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={require("../../assets/image_login.png")}
          />
        </View>
        <InputField
          icon={<Ionicons name="mail" size={24}></Ionicons>}
          styles={styles}
          label={"Email"}
          keyboardType={"email-address"}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onSubmitEditing={handleSubmit}
        ></InputField>

        <View style={{ height: 20 }}></View>

        <InputField
          icon={<Ionicons name="keypad" size={24}></Ionicons>}
          styles={styles}
          label={"Password"}
          inputType={"password"}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          onSubmitEditing={handleSubmit}
        ></InputField>

        <View style={{ height: 20 }}></View>

        <CustomButton
          styles={styles}
          isValid={true}
          label={"Đăng nhập"}
          onPress={() => {
            handleSubmit();
          }}
        ></CustomButton>

        <View
          style={{
            ...styles.registerContainer,
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text>Nếu bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
