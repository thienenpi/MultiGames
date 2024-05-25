import { useNavigation } from "@react-navigation/native";
import { View, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/roomHistory.style";
import { AppBar, RoomColumn } from "../components";
import { AuthContext } from "../context/AuthContext";
import { getRoomsGuest } from "../api/RoomApi";

const RoomHistory = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [roomHistoryData, setRoomHistoryData] = useState([]);

  async function fetchRoomsGuest() {
    try {
      const id = userInfo._id;
      const res = await getRoomsGuest({id});
      if (res.status === 200) {
        setRoomHistoryData(res.data);
      }
    } catch (error) {
      Alert.alert("Error", "Error retrieving data from the server");
    }
  }

  useEffect(() => {
    fetchRoomsGuest();
  }, []);

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
