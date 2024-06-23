import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/spyGame.style";
import {
  View,
  TextInput,
  Button,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChatHistory } from "../components";
import { spySocket } from "../utils/config";
import { getRoomGuests, getUserById } from "../api";
import { leaveRoom } from "../services";
import { AuthContext } from "../context/AuthContext";

const SpyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo } = useContext(AuthContext);
  const { roomInfo } = route.params;
  const [messageHistory, setMessageHistory] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [message, setMessage] = useState("");
  const players = [
    { id: 1, name: "+" },
    { id: 2, name: "+" },
    { id: 3, name: "+" },
    { id: 4, name: "+" },
    { id: 5, name: "+" },
    { id: 6, name: "+" },
    { id: 7, name: "+" },
    { id: 8, name: "+" },
  ];

  useEffect(() => {
    spySocket.emit("join", roomInfo._id);

    // Join the room when component mounts
    spySocket.on("message", (data) => {
      if (data !== null) {
        setMessageHistory((prevMessageHistory) => [
          ...prevMessageHistory,
          data,
        ]);
      }
    });

    // Listen when to start the game
    // spySocket.on("startGame", () => {
    //   setIsStart(true);
    // });

    // spySocket.on("selectKeyword", (keyword) => {
    //   selectedKeyword.current = keyword;
    // });

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

    // Get all users in the room
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
      // Check if the message is the keyword
      let newMessage = {
        sender: userInfo.name,
        content: message,
      };
      // Send message to server
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
        <View style={styles.headerContainer}>
          <Pressable>
            <Image
              source={require("../../assets/menu.png")}
              style={styles.menuIcon}
            />
          </Pressable>
          <View style={styles.roomBanner}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
              Số phòng {roomInfo.name}
            </Text>
            <View style={styles.roomName}>
              <Text style={{ fontSize: 14, color: "white" }}>
                Phòng {roomInfo._id}
              </Text>
            </View>
          </View>
          <Pressable onPress={() => navigation.navigate("Room Config")}>
            <Image
              source={require("../../assets/friend_setting.png")}
              style={styles.settingIcon}
            />
          </Pressable>
        </View>

        <View style={styles.playersContainer}>
          {/* Column 1 */}
          <View style={styles.column}>
            {usersInRoom.slice(0, 4).map((player) => (
              <View key={player._id} style={styles.player}>
                <Text style={{ color: "white" }}>{player.name}</Text>
              </View>
            ))}
          </View>

          {/* Center column */}
          <View style={styles.centerColumn}>
            <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
              <LinearGradient
                colors={["#6B91FF", "#62C7FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Sẵn sàng</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <LinearGradient
                colors={["#F3D14F", "#FA972B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Bắt đầu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Column 2 */}
          <View style={styles.column}>
            {players.slice(4, 8).map((player) => (
              <View key={player.id} style={styles.player}>
                <Text style={styles.playerText}>{player.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Chat history */}

        <ChatHistory message={messageHistory} />
        {/* Placeholder for chat messages */}
        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            multiline
            value={message}
            onChangeText={(text) => setMessage(text)}
            // onChangeText={...}
            // value={...}
          />
          {/* Send button */}
          <Button title="Send" onPress={sendMessage} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SpyScreen;
