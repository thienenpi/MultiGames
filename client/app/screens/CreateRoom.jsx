import { useNavigation } from "@react-navigation/native";
import { AppBar, CustomButton, RoomCardView } from "../components";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import styles from "./styles/createroom.style";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Dialog from "react-native-dialog";

const items = [
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
const renderItem = ({ item }) => <RoomCardView item={item}></RoomCardView>;

const CreateRoom = () => {
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = () => {
    // Xử lý số phòng ở đây
    setDialogVisible(false);
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
          onPress={() => navigation.navigate("AddRoom")}
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
              <MaterialIcons
                name="door-front"
                size={30}
                color={"white"}
              ></MaterialIcons>
            </View>
          }
          styles={styles}
          label={"Phòng tôi đã từng chơi"}
          onPress={() => {
            navigation.navigate("RoomHistory");
          }}
        ></CustomButton>
      </View>

      <View style={styles.separator} />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item._id)}
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

export default CreateRoom;