import { Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CustomButton } from "../components";
import styles from "./styles/home.style";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Welcome {userInfo.name}</Text>
      <CustomButton
        styles={styles}
        label={"Drawing & Guessing 0001"}
        isValid={true}
        onPress={() => navigation.navigate("Guessing Word", { roomId: "0001" })}
      ></CustomButton>

      <View style={{ height: 20 }}></View>

      <CustomButton
        styles={styles}
        label={"Drawing & Guessing 0002"}
        isValid={true}
        onPress={() => navigation.navigate("Guessing Word", { roomId: "0002" })}
      ></CustomButton>

      <View style={{ height: 20 }}></View>

      <CustomButton
        styles={styles}
        label={"CreateRoom"}
        isValid={true}
        onPress={() => navigation.navigate("CreateRoom")}
      ></CustomButton>

      <View style={{ height: 20 }}></View>

      <CustomButton
        styles={styles}
        label={"Setting"}
        isValid={true}
        onPress={() => navigation.navigate("Setting")}
      ></CustomButton>

      <View style={{ height: 20 }}></View>

      <CustomButton
        styles={styles}
        label={"Edit Profile"}
        isValid={true}
        onPress={() => navigation.navigate("EditProfile")}
      ></CustomButton>
    </View>
  );
};

export default Home;
