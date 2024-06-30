import {
  FlatList,
  Image,
  Text,
  View,
  ToastAndroid, // For Android-specific toast message
  Alert, // For iOS-specific alert message
  Platform, // To handle cross-platform differences
} from "react-native";
import React from "react";
import styles from "./styles/roomConfig.style";
import { AppBar, CustomButton, HorizontalItem } from "../components/";
import { useNavigation } from "@react-navigation/native";
// import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from "expo-clipboard";

const players = [
  {
    _id: "1",
    name: "Player 1",
    avatarUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "2",
    name: "Player 2",
    avatarUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "3",
    name: "Player 3",
    avatarUrl: "https://picsum.photos/200/300",
  },
];

const handleCopyText = async (text) => {
  await Clipboard.setStringAsync(text);
  if (Platform.OS === "android") {
    ToastAndroid.show(`Đã copy ${text}`, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    Alert.alert(`Đã copy ${text}`);
  }
};

const renderPlayer = ({ item }) => {
  return (
    <View style={styles.playerContainer}>
      <Image
        style={styles.playerAvatar}
        source={{ uri: item.avatarUrl }}
      ></Image>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.playerName}>
        {item.name}
      </Text>
    </View>
  );
};

const RoomConfig = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppBar
        title={"Thiết lập phòng"}
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>

      <View style={styles.body}>
        <View style={styles.playersRow}>
          <FlatList
            data={players}
            renderItem={renderPlayer}
            keyExtractor={(item) => item._id}
            horizontal={true}
          ></FlatList>
        </View>

        <View style={styles.settingsColumn}>
          <HorizontalItem
            title={"ID phòng"}
            desc={"ID123456"}
            onPress={() => handleCopyText("ID123456")}
            iconRight={"copy-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Tên phòng"}
            desc={"Phòng này hề"}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Số phòng"}
            desc={"0123"}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Chế độ chơi"}
            desc={"Bạn vẽ tôi đoán"}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>

          <HorizontalItem
            title={"Số lượng người chơi"}
            desc={"6"}
            iconRight={"chevron-forward-outline"}
          ></HorizontalItem>
        </View>

        <View style={styles.footer}>
          <CustomButton
            title={"Tạo phòng"}
            onPress={() => {}}
            styles={styles}
            isValid={true}
            label={"Thoát phòng"}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
};

export default RoomConfig;
