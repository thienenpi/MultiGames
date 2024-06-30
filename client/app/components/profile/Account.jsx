import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid, // For Android-specific toast message
  Alert, // For iOS-specific alert message
  Platform, // To handle cross-platform differences
} from "react-native";
import React from "react";
import styles from "../styles/account.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const Account = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleCopyText = async () => {
    await Clipboard.setStringAsync(userInfo._id);
    if (Platform.OS === "android") {
      ToastAndroid.show(`Đã copy ${userInfo._id}`, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      Alert.alert(`Đã copy ${userInfo._id}`);
    }
  };

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

          {/* <TouchableOpacity style={{ width: 50, alignItems: 'flex-start', backgroundColor: 'blue' }} onPress={handleCopyText}>
            <Ionicons name="copy-outline" size={24}></Ionicons>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* foward button */}
      <View style={styles.forward}>
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
          <Ionicons name="chevron-forward" size={24}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCopyText}>
          <Ionicons name="copy-outline" size={24}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
