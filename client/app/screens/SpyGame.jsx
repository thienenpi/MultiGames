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
  EndRoundDialog,
  GameTimeController,
  InviteDialog,
  KeyWordDialog,
  NotificationDialog,
  Player,
  ResultDialog,
  SpyScoreController,
} from "../components";
import { socket, spySocket } from "../utils/config";
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
  const [isShowDialogRoundEnd, setIsShowDialogRoundEnd] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const spyData = useRef({});

  const [messageHistory, setMessageHistory] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [descriptionMessage, setDescriptionMessage] = useState([]);
  const eliminatedPlayers = useRef([]);
  const [IsShowDialogResult, setIsShowDialogResult] = useState(false);
  const voteResult = useRef({});
  const numberOfUser = useRef([]);
  const [message, setMessage] = useState("");
  const [keyword, setKeyword] = useState(null);
  const eliminatedPlayerData = useRef({});
  const [idUserVoted, setIdUserVoted] = useState("");
  const remainingPlayers = useRef([]);
  const [resultDialog, setResultDialog] = useState({
    isVisible: false,
    text: "",
    identify: "",
  });

  const eliminatedPlayer = useRef("");
  const gameTimeController = new GameTimeController();
  gameTimeController.setModeSpy();

  const [timer, setTimer] = useState(gameTimeController.getTime());

  // Set game score
  const spyScoreController = useRef(new SpyScoreController()).current;

  const checkEliminated = (id) => {
    if (eliminatedPlayers.current) {
      return eliminatedPlayers.current.includes(id);
    }
  };
  const confirmVote = async (selectedId) => {
    if (isStart) {
      if (idUserVoted === "" && selectedId !== userInfo._id && !eliminatedPlayers.current.includes(userInfo._id)) {
        setIdUserVoted(selectedId);
        spySocket.emit("vote", {
          voter: userInfo._id,
          votee: selectedId,
          room: roomInfo._id,
          amoutVoter: usersInRoom.length - eliminatedPlayers.current.length,
        });
      } else {
        setMessageHistory((pervMessages) => [
          ...pervMessages,
          {
            sender: "Notification:",
            content: "Vote error",
          },
        ]);
      }
    }
  };

  const handleGamingTimelines = () => {
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.WORD_VIEW) {
      setIsDesrTime(false);
      setIsShowDes(false);
    }
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.DESCRIPTION) {
      voteResult.current = {};
      setIsDesrTime(true);
      setisShowVote(false);
      const notification = {
        sender: "Notify:",
        content: "describe your keyword.",
      };
      setMessageHistory((pervMessages) => [...pervMessages, notification]);
    }
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.VOTE) {
      setIsDesrTime(false);
      setIsShowDes(true);
      setShowVoteDialog(true);
      spySocket.emit("users", usersInRoom);
    }
    if (gameTimeController.getStatus() === SPY_GAME_STATUS.RESULT) {
      setIsShowDes(false);
      setDescriptionMessage([]);
      setisShowVote(true);
      if (voteResult.current) {
        spySocket.emit("votingResult", {
          room: roomInfo._id,
          voteFinalResult: voteResult.current,
        });
      } else {
        const notification = {
          sender: "Notify",
          content: "No one get elimited last round",
        };
        setMessageHistory((pervMessages) => [...pervMessages, notification]);
      }
      setIdUserVoted("");
    }
  };

  const handleReady = () => {
    setIsReady(true);
    spySocket.emit("ready", roomInfo._id);
  };

  const handleEliminated = async (data) => {
    remainingPlayers.current = [];
    eliminatedPlayers.current = data;
    eliminatedPlayer.current =
      eliminatedPlayers.current[eliminatedPlayers.current.length - 1];

    if (eliminatedPlayers.current.length > 0) {
      console.log("eliminatedPlayer.current", eliminatedPlayer.current);
      if (spyData.current._id === eliminatedPlayer.current) {
        setIsShowDialogResult(true);
        console.log("Gián điệp đã bị loại, thường dân chiến thắng");
        // Show result dialog for winning
        setResultDialog({
          text: "Thường dân chiến thắng!",
          identify: "citizen",
        });
        for (let i = 0; i < numberOfUser.current.length; i++) {
          if (!eliminatedPlayers.current.includes(numberOfUser.current[i])) {
            remainingPlayers.current.push(numberOfUser.current[i]);
          }
        }
        spyScoreController.updateMoneyForPlayers(
          remainingPlayers.current,
          "civ_win"
        );
        setTimeout(()=> setIsStart(false), 3000);
      } else if (
        numberOfUser.current.length - eliminatedPlayers.current.length ===
        2
      ) {
        console.log("Number player in room now is 2");
        for (let i = 0; i < numberOfUser.current.length; i++) {
          if (!eliminatedPlayers.current.includes(numberOfUser.current[i])) {
            remainingPlayers.current.push(numberOfUser.current[i]);
          }
        }
        console.log("remainingPlayer: " + remainingPlayers.current);
        if (
          remainingPlayers.current.some(
            (player) => player === spyData.current._id
          )
        ) {
          setIsShowDialogResult(true);
          console.log("Gián điệp chiến thắng");
          setResultDialog({
            text: "Gián điệp chiến thắng!",
            identify: "imposter",
          });
          spyScoreController.updateMoneyForPlayers(
            [spyData.current._id],
            "spy_win"
          );
          setTimeout(()=> setIsStart(false), 3000)
        }
      } else {
        if (eliminatedPlayer.current !== undefined) {
          const res = await getUserById({ id: eliminatedPlayer.current });
          eliminatedPlayerData.current = res.data;
          setIsShowDialogRoundEnd(true);
          socket.emit("Reset", roomInfo._id);
          console.log("Kết quả");
        }
      }
    }
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

    spySocket.on("SpyPlayer", (data) => {
      if (data === spySocket.id) {
        console.log(data + " và " + spySocket.id);
        spySocket.emit("SpyData", userInfo);
      }
    });

    spySocket.on("SpyData", (data) => {
      console.log(data);
      spyData.current = data;
    });

    spySocket.on("startGame", () => {
      setIsStart(true);
    });

    spySocket.on("eliminated", handleEliminated);

    spySocket.on("assignKeyword", (data) => {
      setKeyword(data.keyword);
    });

    return () => {
      leaveRoom({ roomId: roomInfo._id, userId: userInfo._id });
      spySocket.emit("leave", roomInfo._id);

      spySocket.off("message");
      spySocket.off("SpyPlayer");
      spySocket.off("SpyData");
      spySocket.off("startGame");
      spySocket.off("eliminated");
      spySocket.off("assignKeyword");
    };
  }, []);
  useEffect(() => {
    if (!isStart) return;
    setShowKeyWordModal(true);
    usersInRoom.forEach((user) => {
      spyScoreController.addPlayer(user);
    });

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
      numberOfUser.current = users;
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

    return () => {
      spySocket.off("voteUpdate");
      spySocket.off("getChatHistory");
      spySocket.off("join");
      spySocket.off("leave");
    };
  }, [roomInfo._id]);

  const sendMessage = () => {
    if (eliminatedPlayers.current.includes(userInfo._id)) {
      let notification = {
        sender: "Notify",
        content: "You have been eliminated!",
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
          sender: "Notify",
          content: "Your describe have been sent!",
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
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background_spygame_image.png")}
        style={styles.background}
      >
        {showInviteDialog && (
          <InviteDialog
            onChangeShow={setShowInviteDialog}
            isShow={showInviteDialog}
            roomInfo={roomInfo}
          ></InviteDialog>
        )}
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
              Room ID {roomInfo.name}
            </Text>
            <View style={styles.roomName}>
              <Text style={{ fontSize: 14, color: "white" }}>
                Room {roomInfo._id}
              </Text>
            </View>
            {keyword && (
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                Keyword: {keyword.keyword}
              </Text>
            )}
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
                positionleft={true}
                key={player._id}
                avatar={player.avatarUrl}
                id={player._id}
                confirmVote={confirmVote}
                name={player._id === userInfo._id ? "Me" : player.name}
                isReady={isReady && userInfo._id === player._id}
                description={descriptionMessage[player._id]}
                isShowDes={isShowDes}
                isShowVote={isShowVote}
                isBeVoted={idUserVoted === player._id}
                voteCount={isShowVote && voteResult.current[player._id]}
                isEliminated={checkEliminated(player._id)}
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
                  <Text style={{ color: "white", fontSize: 18 }}>Ready</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <View style={{ height: 20 }}></View>
            {!isStart && (
              <TouchableOpacity
                style={styles.containerStart}
                onPress={() => setShowInviteDialog(true)}
              >
                <LinearGradient
                  colors={["#FA972B", "#F3D14F"]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.gradientButton}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Invite Friend
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.column}>
            {usersInRoom.slice(4, 8).map((player) => (
              <Player
                positionleft={false}
                key={player._id}
                avatar={player.avatarUrl}
                id={player._id}
                confirmVote={confirmVote}
                name={player._id === userInfo._id ? "Me" : player.name}
                isReady={isReady && userInfo._id === player._id}
                description={descriptionMessage[player._id]}
                isShowDes={isShowDes}
                isShowVote={isShowVote}
                isBeVoted={idUserVoted === player._id}
                voteCount={isShowVote && voteResult.current[player._id]}
                isEliminated={checkEliminated(player._id)}
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
        {IsShowDialogResult && (
          <ResultDialog
            avatar={spyData.current.avatarUrl}
            name={spyData.current.name}
            identify={resultDialog.identify}
            isVisible={resultDialog.isVisible}
            onClose={() => navigation.goBack()}
            text={resultDialog.text}
            duration={3}
          />
        )}
        {isShowDialogRoundEnd && (
          <EndRoundDialog
            avatar={eliminatedPlayerData.current.avatarUrl}
            name={eliminatedPlayerData.current.name}
            isVisible={isShowDialogRoundEnd}
            onClose={() => setIsShowDialogRoundEnd(false)}
            duration={3}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default SpyScreen;
