import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/login.style";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants";
import * as LocalAuthentication from "expo-local-authentication";

const Login = () => {
  const navigation = useNavigation();
  const { login, isBiometric, supportedAuthTypes, getCredentials } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [highestAuthType, setHighestAuthType] = useState(null);

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleSubmit = ({ email, password }) => {
    const data = {
      email: email,
      password: password,
    };

    login({ data: data });
  };

  useEffect(() => {
    const checkSupportedAuthentication = async () => {
      if (
        supportedAuthTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        setHighestAuthType(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        );
      } else if (
        supportedAuthTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      ) {
        setHighestAuthType(LocalAuthentication.AuthenticationType.FINGERPRINT);
      }
    };

    checkSupportedAuthentication();
  }, []);

  const handleAuthentication = async (type) => {
    const credentials = await getCredentials();
    if (!credentials.email || !credentials.password) {
      Alert.alert(
        "Error",
        "You need to log in at least once to enable biometric authentication."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Use Passcode",
      disableDeviceFallback: false,
      cancelLabel: "Cancel",
    });

    console.log(result);

    if (result.success) {
      setTimeout(() => {
        handleSubmit({
          email: credentials.email,
          password: credentials.password,
        });
      }, 1000);
    } else {
      if (result.error === "not_enrolled") {
        Alert.alert(
          "Error",
          "You need to set up your biometric data in your device settings."
        );
      } else {
        Alert.alert("Error", "Biometric authentication failed.");
      }
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderBiometric = () => {
    return (
      <View style={styles.authentication}>
        <LinearGradient
          colors={COLORS.blueGradient}
          style={styles.btnContainer()}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <CustomButton
            styles={styles}
            isValid={true}
            label={"Log in"}
            onPress={() => {
              handleSubmit({ email: email, password: password });
            }}
          ></CustomButton>
        </LinearGradient>

        {highestAuthType ===
          LocalAuthentication.AuthenticationType.FINGERPRINT && (
          <TouchableOpacity
            onPress={() =>
              handleAuthentication(
                LocalAuthentication.AuthenticationType.FINGERPRINT
              )
            }
          >
            <Ionicons
              name="finger-print"
              size={36}
              style={styles.fingerPrint}
            ></Ionicons>
          </TouchableOpacity>
        )}

        {highestAuthType ===
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION && (
          <TouchableOpacity
            style={styles.faceialRecognition}
            onPress={() =>
              handleAuthentication(
                LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
              )
            }
          >
            <Image
              source={{
                uri: "https://multigames.blob.core.windows.net/images/facial-recognition.png",
              }}
              style={styles.faceialRecognition}
              onPress={() => {}}
            ></Image>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderNoBiometric = () => {
    return (
      <LinearGradient
        colors={COLORS.blueGradient}
        style={styles.btnContainer()}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <CustomButton
          styles={styles}
          isValid={true}
          label={"Log in"}
          onPress={() => {
            handleSubmit({ email: email, password: password });
          }}
        ></CustomButton>
      </LinearGradient>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
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
          icon={<Ionicons name="mail-outline" size={24}></Ionicons>}
          styles={styles}
          label={"Email"}
          keyboardType={"email-address"}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onSubmitEditing={() =>
            handleSubmit({ email: email, password: password })
          }
        ></InputField>

        <View style={{ height: 20 }}></View>

        <InputField
          icon={<Ionicons name="keypad-outline" size={24}></Ionicons>}
          styles={styles}
          label={"Password"}
          inputType={"password"}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          onSubmitEditing={() =>
            handleSubmit({ email: email, password: password })
          }
        ></InputField>

        <View style={{ height: 20 }}></View>

        {isBiometric ? renderBiometric() : renderNoBiometric()}

        <View
          style={{
            ...styles.registerContainer,
            flexDirection: "row",
            marginTop: 20,
            width: "65%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>You don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Create one</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Login;
