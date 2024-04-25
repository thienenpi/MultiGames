import { Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CustomButton } from "../components";
import styles from "./styles/home.style";
import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation = useNavigation() }) => {
  const { userInfo } = useContext(AuthContext);
  
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Welcome {userInfo.name}</Text>
      <CustomButton
        styles={styles}
        label={"Drawing & Guessing"}
        isValid={true}
        onPress={() => navigation.navigate("Guessing Word")}
      ></CustomButton>
      <CustomButton
        styles={styles}
        label={"Spy Main"}
        isValid={true}
        onPress={() => navigation.navigate("Spy Main")}
      ></CustomButton>
      <CustomButton
        styles={styles}
        label={"Spy Game"}
        isValid={true}
        onPress={() => navigation.navigate("Spy Game")}
      ></CustomButton>
    </View>
  );
};

export default Home;
