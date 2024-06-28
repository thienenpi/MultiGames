import React, { useState, useEffect, useContext, useRef } from "react";
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
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ChatHistory,
  GameTimeController,
  KeyWordDialog,
  NotificationDialog,
  Player,
} from "../components";
import { spySocket } from "../utils/config";
import { getRoomGuests, getUserById, isRoomFull } from "../api";
import { leaveRoom } from "../services";
import { AuthContext } from "../context/AuthContext";
import GameTimer from "../components/spyGame/GameTimer";
import { SPY_GAME_STATUS } from "../constants/gamestatus";

const SpyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo } = useContext(AuthContext);
  const { roomInfo } = route.params;

  const [isStart, setIsStart] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isDesrTime, setIsDesrTime] = useState(false);
  const [isShowDes, setIsShowDes] = useState(false);
  const [isShowVote, setisShowVote] = useState(false);
  const [showKeyWordModal, setShowKeyWordModal] = useState(false);
  const [showVoteDialog, setShowVoteDialog] = useState(false);

  const [messageHistory, setMessageHistory] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [descriptionMessage, setDescriptionMessage] = useState([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);

  const voteResult = useRef();

  const [message, setMessage] = useState("");
  const [keyword, setKeyword] = useState(null);

  const gameTimeController = new GameTimeController();
  gameTimeController.setModeSpy();

  const [timer, setTimer] = useState(gameTimeController.getTime());

  const confirmVote = async (selectedId) => {
    spySocket.emit("vote", {
      voter: userInfo._id,
      votee: selectedId,
      room: roomInfo._id,
    });
  };

  const checkRoomFull = async () => {
    const idRoom = roomInfo._id;
    return await isRoomFull({ id: idRoom });
  };

  const handleGamingTimelines = () => {
    if (
      gameTimeController.getStatus() === SPY_GAME_STATUS.WORD_VIEW &&
      checkRoomFull()
    ) {
    }
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.DESCRIPTION) {
      setIsDesrTime(true);
      console.log("Phần mô tả");
    }
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.VOTE) {
      setIsDesrTime(false);
      setIsShowDes(true);
      setShowVoteDialog(true);
      spySocket.emit("users", usersInRoom);
      console.log("Phần Voting");
    }
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.RESULT) {
      setIsShowDes(false);
      setisShowVote(true);
      console.log(voteResult.current);
      spySocket.emit("votingResult", roomInfo._id);
      spySocket.on("eliminated", (data) => {
        console.log(data)
        setEliminatedPlayers(data);
      });
      console.log("Kết quả");
    }
  };

  const handleReady = () => {
    setIsReady(true);
    spySocket.emit("ready", roomInfo._id);
  };

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

    spySocket.on("startGame", () => {
      setIsStart(true);
    });

    spySocket.on("assignKeyword", (data) => {
      setKeyword(data.keyword);
    });

    return () => {
      leaveRoom({ roomId: roomInfo._id, userId: userInfo._id });
      spySocket.emit("leave", roomInfo._id);
    };
  }, []);

  useEffect(() => {
    if (!isStart) return;
    setShowKeyWordModal(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          gameTimeController.setNextStatusAndTime();

          handleGamingTimelines();

          return gameTimeController.getTime();
        }
        gameTimeController.timeDown();

        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStart]);

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

    spySocket.on("voteUpdate", (data) => {
      voteResult.current = data;
    });

    getAllUsers();

    spySocket.on("join", (room) => {
      setTimeout(async () => getAllUsers(), 500);
    });

    spySocket.on("leave", (room) => {
      setTimeout(async () => getAllUsers(), 500);
    });
  }, []);

  const sendMessage = () => {
    if (eliminatedPlayers.includes(userInfo._id)) {
      let notification = {
        sender: "Hệ thống",
        content: "Bạn đã bị loại!",
      };
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        notification,
      ]);
      return;
    }
    if (message.trim() !== "") {
      if (isDesrTime === true) {
        let notification = {
          sender: "Hệ thống",
          content: "Mô tả của bạn đã được gửi!",
        };
        let newMessage = {
          senderId: userInfo._id,
          sender: userInfo.name,
          content: message,
          isDescMessage: true,
        };
        spySocket.emit("message", newMessage);
        spySocket.on("descriptionMessage", (messages) => {
          setDescriptionMessage(messages);
        });
        setMessageHistory((prevMessageHistory) => [
          ...prevMessageHistory,
          notification,
        ]);
        setMessage("");
      } else {
        let newMessage = {
          senderId: userInfo._id,
          sender: userInfo.name,
          content: message,
          isDescMessage: false,
        };
        spySocket.emit("message", newMessage);
        setMessage("");
      }
      // setMessageHistory((prevMessageHistory) => [
      //   ...prevMessageHistory,
      //   newMessage,
      // ]);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background_spygame_image.png")}
        style={styles.background}
      >
        <View style={styles.headerCotainer}>
          <View style={{ gap: 10 }}>
            <Pressable>
              <Image
                source={require("../../assets/menu.png")}
                style={{ width: 32, height: 32 }}
              />
            </Pressable>
            <GameTimer gameTime={timer} isStart={isStart} />
          </View>
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
              style={{ width: 40, height: 40 }}
            />
          </Pressable>
        </View>
        <View style={styles.playersContainer}>
          <View style={styles.column}>
            {usersInRoom.slice(0, 4).map((player) => (
              <Player
                key={player._id}
                avatar={player.avatarUrl}
                id={player._id}
                confirmVote={confirmVote}
                name={player._id === userInfo._id ? "Tôi" : player.name}
                isReady={isReady && userInfo._id === player._id}
                description={descriptionMessage[player._id]}
                isShowDes={isShowDes}
                isShowVote={isShowVote}
                voteCount={isShowVote && voteResult.current[player._id]}
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
            {!isStart && (
              <TouchableOpacity
                style={styles.containerReady}
                onPress={handleReady}
              >
                <LinearGradient
                  colors={["#6B91FF", "#62C7FF"]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.gradientButton}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Sẵng sàng
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <View style={{ height: 20 }}></View>
            {!isStart && (
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
            )}
          </View>
          <View style={styles.column}>
            {usersInRoom.slice(4, 8).map((player) => (
              <View key={player._id} style={styles.player}>
                <Text style={{ color: "white" }}>{player.name}</Text>
              </View>
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
            onSubmitEditing={sendMessage}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
        {showKeyWordModal && (
          <KeyWordDialog
            word={keyword.keyword}
            isVisible={showKeyWordModal}
            duration={timer}
            onClose={() => setShowKeyWordModal(false)}
          />
        )}
        {showVoteDialog && (
          <NotificationDialog
            isVisible={showVoteDialog}
            onClose={() => setShowVoteDialog(false)}
            text={"Bắt đầu chọn ra gián điệp"}
            duration={3}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default SpyScreen;
