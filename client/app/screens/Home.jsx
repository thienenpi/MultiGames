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
    <View style={styles.container}>
      <Text>Welcome {userInfo.name}</Text>
      <CustomButton
        styles={styles}
        label={"Drawing & Guessing 0001"}
        isValid={true}
        onPress={() => navigation.navigate("Guessing Word", { roomId: "0001" })}
      ></CustomButton>

      <CustomButton
        styles={styles}
        label={"Drawing & Guessing 0002"}
        isValid={true}
        onPress={() => navigation.navigate("Guessing Word", { roomId: "0002" })}
      ></CustomButton>

      <CustomButton
        styles={styles}
        label={"Spy Game"}
        isValid={true}
        onPress={() => navigation.navigate("Spy Game")}
      ></CustomButton>

      <CustomButton
        styles={styles}
        label={"Room Config"}
        isValid={true}
        onPress={() => navigation.navigate("Room Config")}
      ></CustomButton>
    </View>
  );
};

export default Home;
