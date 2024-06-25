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

          // Add player to game score controller
          //   gameScoreController.addPlayer(user);
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background_spygame_image.png")}
        style={styles.background}
      >
        <View style={styles.headerCotainer}>
          <Pressable>
            <Image
              source={require("../../assets/menu.png")}
              style={styles.menuIcon}
            />
          </Pressable>
          <View style={styles.roomBanner}>
            <Text style={styles.roomNameText}>Số phòng {roomInfo.name}</Text>
            <Text style={styles.roomIdText}>Phòng {roomInfo._id}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Room Config")}>
            <Image
              source={require("../../assets/friend_setting.png")}
              style={styles.settingIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.playersContainer}>
          {/* Hai cột người chơi */}
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
          <View
            style={{
              flex: 4,
              justifyContent: "flex-end",
              alignItems: "center",
              borderRadius: 50,
              margin: 10,
            }}
          >
            <TouchableOpacity style={styles.containerReady}>
              <LinearGradient
                colors={["#6B91FF", "#62C7FF"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradientButton}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Sẵng sàng</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ height: 20 }}></View>
            <TouchableOpacity style={styles.containerStart}>
              <LinearGradient
                colors={["#F3D14F", "#FA972B"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradientButton}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Bắt đầu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            {players.slice(4, 8).map((player) => (
              <View key={player.id} style={styles.player}>
                <Text style={{ color: "white" }}>{player.name}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Chat history */}
        <ChatHistory message={messageHistory} />

        <ChatHistory message={messageHistory} />
        {/* Placeholder for chat messages */}
        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            multiline
            value={message}
            onChangeText={(text) => setMessage(text)}
            // onChangeText={...}
            // value={...}
          />
          <Button title="Gửi" onPress={sendMessage} />
        </View>
      </ImageBackground>
    </View>
  );
};
export default SpyScreen;
