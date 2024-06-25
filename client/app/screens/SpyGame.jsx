import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Modal,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChatHistory } from "../components";
import { spySocket } from "../utils/config";
import { getRoomGuests, getUserById } from "../api";
import { leaveRoom } from "../services";
import { AuthContext } from "../context/AuthContext";
import Player from "./Player";

const SpyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo } = useContext(AuthContext);
  const { roomInfo } = route.params;
  const [messageHistory, setMessageHistory] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    spySocket.emit("join", roomInfo._id);

    spySocket.on("message", (data) => {
      if (data !== null) {
        setMessageHistory((prevMessageHistory) => [
          ...prevMessageHistory,
          data,
        ]);
      }
    });

    return () => {
      leaveRoom({ roomId: roomInfo._id, userId: userInfo._id });
      spySocket.emit("leave", roomInfo._id);
    };
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      setUsersInRoom([]);
      const res = await getRoomGuests({ id: roomInfo._id });
      const users = res.data;
      for (let userId of users) {
        const res = await getUserById({ id: userId });

        if (res.status === 200) {
          const user = res.data;
          setUsersInRoom((prevUsers) => [...prevUsers, user]);
        }
      }
    };

    setMessageHistory([]);
    spySocket.emit("getChatHistory", roomInfo._id);

    getAllUsers();

    spySocket.on("join", (room) => {
      setTimeout(async () => getAllUsers(), 500);
    });

    spySocket.on("leave", (room) => {
      setTimeout(async () => getAllUsers(), 500);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      let newMessage = {
        sender: userInfo.name,
        content: message,
      };
      spySocket.emit("message", newMessage);
      setMessage("");
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        newMessage,
      ]);
    }
  };

  const handleVote = (userId) => {
    // Logic to handle vote for the user with userId
    console.log(`Voted for user with id: ${userId}`);
    // You can implement further logic here based on your requirements
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background_spygame_image.png")}
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/menu.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
          <View style={styles.roomBanner}>
            <Text style={styles.roomNameText}>Số phòng {roomInfo.name}</Text>
            <Text style={styles.roomIdText}>Phòng {roomInfo._id}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Room Config")}>
            <Image
              source={require("../../assets/friend_setting.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>

        {/* Players section */}
        <View style={styles.playersContainer}>
          <View style={styles.column}>
            {usersInRoom.slice(0, 4).map((player) => (
              <Player
                key={player._id}
                id={player._id}
                name={player.name}
                onVote={handleVote}
              />
            ))}
          </View>
          <View style={styles.column}>
            {usersInRoom.slice(4, 8).map((player) => (
              <Player
                key={player._id}
                id={player._id}
                name={player.name}
                onVote={handleVote}
              />
            ))}
          </View>
        </View>

        {/* Chat history */}
        <ChatHistory message={messageHistory} />

        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            multiline
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <Button title="Gửi" onPress={sendMessage} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  roomBanner: {
    alignItems: "center",
  },
  roomNameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  roomIdText: {
    fontSize: 14,
    color: "white",
  },
  playersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  column: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "white",
  },
});

export default SpyScreen;
