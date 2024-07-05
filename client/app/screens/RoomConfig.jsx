import {
  View,
  ToastAndroid, // For Android-specific toast message
  Alert, // For iOS-specific alert message
  Platform,
  TouchableOpacity, // To handle cross-platform differences
} from "react-native";
import React from "react";
import styles from "./styles/roomConfig.style";
import {
  AppBar,
  CustomButton,
  HorizontalItem,
  UserCardView,
} from "../components/";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants";

const handleCopyText = async (text) => {
  await Clipboard.setStringAsync(text);
  if (Platform.OS === "android") {
    ToastAndroid.show("Copied room id to clipboard", ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    Alert.alert("Copied room id to clipboard");
  }
};

const RoomConfig = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomInfo, usersInRoom } = route.params;
  const { userInfo } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppBar
        title={"Room Config"}
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>

      <View style={styles.body}>
        <LinearGradient
          colors={COLORS.blueGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.playersRow}
        >
          {usersInRoom.map((user) => (
            <TouchableOpacity
              key={user._id}
              onPress={() => {
                if (user._id === userInfo._id) return;
                setShowAddFriendDialog(true);
                setUserToAddFriend(user);
              }}
            >
              <UserCardView user={user}></UserCardView>
            </TouchableOpacity>
          ))}
        </LinearGradient>

        <View style={styles.settingsColumn}>
          <HorizontalItem
            title={"Room ID"}
            desc={roomInfo._id}
            onPress={() => handleCopyText(roomInfo._id)}
            iconRight={"copy-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Room Name"}
            desc={roomInfo.name}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Game Mode"}
            desc={roomInfo.mode}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Capacity"}
            desc={roomInfo.capacity}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>

          {/* <HorizontalItem
            title={"Password"}
            desc={roomInfo.password}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem> */}
        </View>

        <View style={styles.footer}>
          <CustomButton
            onPress={() => navigation.navigate("Dashboard")}
            styles={styles}
            isValid={true}
            label={"Leave Room"}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
};

export default RoomConfig;
