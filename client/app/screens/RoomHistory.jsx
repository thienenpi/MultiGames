import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import React from "react";
import styles from "./styles/roomHistory.style";
import { AppBar, RoomColumn } from "../components";

// give me an array of room history data
const roomHistoryData = [
  {
    _id: 1,
    roomID: "0001",
    avatarUrl: "https://picsum.photos/200",
    gameType: 0,
    state: 0,
    maxPlayers: 6,
    currentPlayers: 0,
  },
  {
    _id: 2,
    roomID: "0002",
    avatarUrl: "https://picsum.photos/200",
    gameType: 0,
    state: 0,
    maxPlayers: 6,
    currentPlayers: 0,
  },
  {
    _id: 3,
    roomID: "0003",
    avatarUrl: "https://picsum.photos/200",
    gameType: 1,
    state: 0,
    maxPlayers: 6,
    currentPlayers: 0,
  },
];

const RoomHistory = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppBar
        title='Room History'
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>

      <View style={styles.body}>
        <RoomColumn items={roomHistoryData}></RoomColumn>
      </View>
    </View>
  );
};

export default RoomHistory;