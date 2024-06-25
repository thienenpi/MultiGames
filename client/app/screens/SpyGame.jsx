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
  Pressable,
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
  const [isVoting, setIsVoting] = useState(false);
  const [votes, setVotes] = useState({});

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
    setVotes((prevVotes) => {
      const newVotes = { ...prevVotes };
      newVotes[userId] = (newVotes[userId] || 0) + 1;
      return newVotes;
    });
  };

  const endRound = () => {
    setIsVoting(true);
  };

  const submitVotes = () => {
    setIsVoting(false);
    let maxVotes = 0;
    let eliminatedUser = null;
    for (let userId in votes) {
      if (votes[userId] > maxVotes) {
        maxVotes = votes[userId];
        eliminatedUser = userId;
      }
    }
    spySocket.emit("eliminate", {
      roomId: roomInfo._id,
      userId: eliminatedUser,
    });
    setVotes({});
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
                <Text style={{ color: "white", fontSize: 18 }}>Sẵn sàng</Text>
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
        <ChatHistory message={messageHistory} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            multiline
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <Button title="Gửi" onPress={sendMessage} />
        </View>
        {isVoting && (
          <Modal transparent={true} visible={isVoting}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Vote for a player to eliminate
                </Text>
                {usersInRoom.map((player) => (
                  <TouchableOpacity
                    key={player._id}
                    onPress={() => handleVote(player._id)}
                    style={styles.voteButton}
                  >
                    <Text style={styles.voteButtonText}>{player.name}</Text>
                  </TouchableOpacity>
                ))}
                <Button title="Submit Votes" onPress={submitVotes} />
              </View>
            </View>
          </Modal>
        )}
        <Button title="End Round" onPress={endRound} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  menuIcon: { width: 30, height: 30 },
  roomBanner: { alignItems: "center" },
  roomNameText: { fontSize: 18, color: "white" },
  roomIdText: { fontSize: 14, color: "white" },
  settingIcon: { width: 30, height: 30 },
  playersContainer: { flexDirection: "row", flex: 1 },
  column: { flex: 1, justifyContent: "center", alignItems: "center" },
  containerReady: { padding: 10 },
  containerStart: { padding: 10 },
  gradientButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    width: 150,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 25,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, marginBottom: 20 },
  voteButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  voteButtonText: { fontSize: 16 },
});

export default SpyScreen;
