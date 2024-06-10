import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../styles/account.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: userInfo.avatarUrl,
        }}
        style={styles.avatar}
        imageStyle={styles.avatar}
      ></ImageBackground>

      {/* user name & user id */}
      <View style={styles.user}>
        <Text style={styles.userName}>{userInfo.name}</Text>

        <View style={styles.userId}>
          <MaterialCommunityIcons
            name="identifier"
            size={24}
            style={styles.iconId}
          ></MaterialCommunityIcons>
          <Text style={styles.userId}>{userInfo._id}</Text>
        </View>
      </View>

      {/* foward button */}
      <View style={styles.forward}>
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
          <Ionicons name="chevron-forward" size={24}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
