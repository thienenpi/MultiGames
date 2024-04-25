import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Pressable,
  FlatList,
} from "react-native";
import styles from "./styles/createroom.style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants";
import { AppBar, CustomButton, RoomCardView } from "../components";
import { MaterialIcons } from "@expo/vector-icons";
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
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryDark, COLORS.primaryLight]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Phòng Board Game</Text>
        </View>
      </LinearGradient>

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
            // navigation.navigate("RoomHistory");
          }}
        ></CustomButton>
      </View>

      <View style={styles.separator} />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item._id)}
      ></FlatList>
    </SafeAreaView>
  );
};

export default CreateRoom;
