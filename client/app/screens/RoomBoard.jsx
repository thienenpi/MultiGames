import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AppBar, CustomButton, RoomCardView } from "../components";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { getRoomsOwner } from "../api/RoomApi";
import Dialog from "react-native-dialog";
import styles from "./styles/boardroom.style";
import { joinRoom, accessRoom } from "../services";

const renderItem = ({ item }) => <RoomCardView item={item}></RoomCardView>;

const RoomBoard = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();
  const showDialog = () => {
    setDialogVisible(true);
  };

  async function fetchRoomsOwner() {
    try {
      const id = userInfo._id;
      const res = await getRoomsOwner({ id });
      if (res.status === 200) {
        setItems(res.data);
      }
    } catch (error) {
      Alert.alert("Error", "Error retrieving data from the server");
    }
  }
  
  useEffect(() => {
    if (isFocused) {
      fetchRoomsOwner();
    }
  }, [isFocused]);

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = () => {
    // Xử lý số phòng ở đây
    setDialogVisible(false);
  };

  const handleAccessRoom = async () => {
    // const data = {
    //   gameMode: "Bạn Vẽ Tôi Đoán",
    // };
    // var roomInfo = await accessRoom({ data: data });
    // if (!roomInfo) {
    //   navigation.navigate("Room Create");
    //   return;
    // }

    // await joinRoom({ roomId: roomInfo._id, userId: userInfo._id });
    // navigation.navigate("Guessing Word", { roomInfo: roomInfo });
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="Phòng Board"
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#62C7FF", flexDirection: "row" },
          ]}
          onPress={() => navigation.navigate("Room Create")}
        >
          <Ionicons name="add-circle" size={30} color="white" />
          <Text style={styles.buttonText}>Tạo phòng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,

            { backgroundColor: "#FC356E", flexDirection: "row" },
          ]}
          onPress={showDialog}
        >
          <Ionicons name="search-circle" size={30} color="white" />
          <Text style={styles.buttonText}>Tìm phòng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.itemContainer}>
        <CustomButton
          isValid={true}
          icon={
            <View style={styles.btnIcon}>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={30}
                color={"white"}
              ></Ionicons>
            </View>
          }
          styles={styles}
          label={"Phòng tôi đã từng chơi"}
          onPress={() => {
            navigation.navigate("Room History");
          }}
        ></CustomButton>
      </View>

      <View style={styles.separator} />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item._id)}
        onPress={handleAccessRoom}
      ></FlatList>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title style={{ textAlign: "center" }}>Tìm phòng</Dialog.Title>
        <Dialog.Input
          onChangeText={(number) => setRoomNumber(number)}
          placeholder="Nhập số phòng"
          underlineColorAndroid="transparent"
          placeholderTextColor="#C7C7C7"
          backgroundColor="#F5F5F5"
          style={{
            borderColor: "#F5F5F5",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
          }}
        ></Dialog.Input>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              backgroundColor: "white",
              borderColor: "#00CDF9",
              borderWidth: 1,
              borderRadius: 90,
              flex: 1,
              marginLeft: 10,
              marginRight: 10,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "#00CDF9", fontWeight: "bold" }}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={{
              backgroundColor: "#00CDF9",
              borderColor: "#00CDF9",
              borderWidth: 1,
              borderRadius: 90,
              flex: 1,
              marginRight: 10,
              marginLeft: 10,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    </View>
  );
};

export default RoomBoard;
