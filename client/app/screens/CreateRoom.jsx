import { useNavigation } from "@react-navigation/native";
import { AppBar, CustomButton, RoomCardView} from "../components";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import styles from "./styles/createroom.style";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

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

  return (
    <View style={styles.container}>
      <AppBar
        title='Create Room'
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
        >
          <Ionicons name="add-circle" size={30} color="white" />
          <Text style={styles.buttonText}>Tạo phòng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#FC356E", flexDirection: "row" },
          ]}
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
    </View>
  );
};

export default CreateRoom;
