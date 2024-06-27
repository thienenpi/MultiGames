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
  const [scores, setScores] = useState({});
  const [isScoresDialogVisible, setIsScoresDialogVisible] = useState(false);

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

    const newScores = { ...scores };
    if (eliminatedUser === spyUserId) {
      // Giả sử spyUserId là ID của gián điệp
      usersInRoom.forEach((user) => {
        if (user._id !== spyUserId) {
          newScores[user._id] = (newScores[user._id] || 0) + 1;
        }
      });
    } else {
      newScores[spyUserId] = (newScores[spyUserId] || 0) + usersInRoom.length;
    }
    setScores(newScores);

    spySocket.emit("eliminate", {
      roomId: roomInfo._id,
      userId: eliminatedUser,
    });
    setVotes({});
    showScoresDialog();
  };

  const showScoresDialog = () => {
    setIsScoresDialogVisible(true);
  };

  const hideScoresDialog = () => {
    setIsScoresDialogVisible(false);
  };

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

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
          <Text style={styles.headerTitle}>{roomInfo.roomName}</Text>
          <Pressable>
            <Image
              source={require("../../assets/setting.png")}
              style={styles.menuIcon}
            />
          </Pressable>
        </View>

        <LinearGradient
          colors={["#d68f7f", "#ba5a3c", "#994136"]}
          style={styles.chatContainer}
        >
          <ChatHistory messageHistory={messageHistory} />
        </LinearGradient>

        <View style={styles.playersContainer}>
          {usersInRoom.map((user) => (
            <Player user={user} key={user._id} />
          ))}
        </View>

        <View style={styles.messageContainer}>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message..."
            placeholderTextColor="#BDBDBD"
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
        <Button title="End Round" onPress={endRound} />

        {isVoting && (
          <Modal transparent={true} visible={isVoting}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Vote for a player to eliminate
                </Text>
                {usersInRoom
                  .filter((user) => user._id !== userInfo._id)
                  .map((player) => (
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

        {isScoresDialogVisible && (
          <Modal transparent={true} visible={isScoresDialogVisible}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Điểm số sau trò chơi</Text>
                {sortedScores.map(([userId, score]) => {
                  const user = usersInRoom.find((user) => user._id === userId);
                  return (
                    <Text key={userId} style={styles.scoreText}>
                      {user ? user.name : "Unknown"}: {score}
                    </Text>
                  );
                })}
                <Button title="Đóng" onPress={hideScoresDialog} />
              </View>
            </View>
          </Modal>
        )}
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
  },
  headerCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  chatContainer: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  playersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "#333",
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
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  voteButton: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  voteButtonText: {
    fontSize: 16,
  },
  scoreText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default SpyScreen;
