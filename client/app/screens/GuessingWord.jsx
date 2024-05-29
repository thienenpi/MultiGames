import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../utils/config";
import styles from "./styles/guessingWord.style";
import {
  WhiteBoard,
  DrawingOptionsBar,
  ChatHistory,
  GameTimeController,
  KeywordSelection,
  EndGameResult,
  AddFriendDialog,
} from "../components";
import { getUserById } from "../api/UserApi";
import { isRoomFull } from "../api/RoomApi";
import { DRAWING_GAME_STATUS } from "../constants/gamestatus";

const GuessingWord = () => {
  const route = useRoute();
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const { roomInfo } = route.params;
  const viewShotRef = useRef(null);

  const [isStart, setIsStart] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState(0);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(2);
  const [isRedo, setIsRedo] = useState(false);
  const [isUndo, setIsUndo] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [userToAddFriend, setUserToAddFriend] = useState(null);

  const [showDownloadImageDialog, setShowDownloadImageDialog] = useState(false);
  const [showKeywordDialog, setShowKeywordDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(true);

  // Set game time
  const gameTimeController = new GameTimeController();
  gameTimeController.setModeDrawing();

  // Set timer using state hook
  const [timer, setTimer] = useState(gameTimeController.getTime());

  const updateColor = (color) => {
    setColor(color);
  };

  const updateSize = (size) => {
    setSize(size);
  };

  const updateIsClear = () => {
    setIsClear((prev) => !prev);
  };

  const handleButtonPress = () => {
    captureAndSaveImage().then(hanldeDialog());
  };

  const handleSendImage = () => {};

  const handleChooseIcon = () => {};

  const handleStart = () => {
    setIsStart(true); // Update state to show the whiteboard
  };

  const hanldeDialog = async () => {
    setShowDownloadImageDialog(true);
  };

  const closeAllModal = () => {
    setShowDownloadImageDialog(false);
    // setShowAddFriendDialog(false);
    setShowInviteDialog(false);
    setShowKeywordDialog(false);
    setShowResultDialog(false);
  };

  const toggleOptions = (optionNumber) => {
    if (optionNumber === option) {
      setOption(0);
      setShowOptions(false);
    } else {
      setOption(optionNumber);
      setShowOptions(true);
    }
  };

  const captureAndSaveImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setCapturedImage(uri);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: userInfo.name,
        content: message,
      };

      socket.emit("message", newMessage);
      setMessage("");
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        newMessage,
      ]);
    }
  };

  const checkRoomFull = async () => {
    const idRoom = roomInfo._id;
    return await isRoomFull({ id: idRoom });
  };

  const checkYourTurn = () => {
    // Implement logic to check if it's your turn
  };

  const handleGamingTimelines = () => {
    if (gameTimeController.getStatus() === DRAWING_GAME_STATUS.WORD_SELECTION) {
      if (
        checkRoomFull() &&
        {
          /*checkYourTurn()*/
        }
      ) {
        closeAllModal();
        setShowKeywordDialog(true);
      }
    } else if (gameTimeController.getStatus() === DRAWING_GAME_STATUS.RESULT) {
      closeAllModal();
      setShowResultDialog(true);
    }
  };

  // UseEffect to join the room and get chat history
  useEffect(() => {
    socket.emit("join", roomInfo._id);

    // Join the room when component mounts
    socket.on("message", (data) => {
      if (data !== null) {
        setMessageHistory((prevMessageHistory) => [
          ...prevMessageHistory,
          data,
        ]);
      }
    });

    return () => {
      socket.emit("leave", roomInfo._id);
    };
  }, []);

  // UseEffect to get all users in the room
  useEffect(() => {
    const getAllUsers = async () => {
      setUsersInRoom([]);
      for (let userId of roomInfo.list_guest) {
        const res = await getUserById({ id: userId });

        if (res.status === 200) {
          const user = res.data;
          user["score"] = 0;
          setUsersInRoom((prevUsers) => [...prevUsers, user]);
        }
      }
    };

    setMessageHistory([]);
    socket.emit("getChatHistory", roomInfo._id);

    getAllUsers();

    // When starting the game, show the keyword dialog if the room is full
    if (checkRoomFull()) {
      closeAllModal();
      setShowKeywordDialog(true);
    }
  }, []);

  // UseEffect to handle game time
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          // Set next status and time
          gameTimeController.setNextStatusAndTime();

          // Affter changing status, handle the game timeline
          handleGamingTimelines();

          // Update timer
          return gameTimeController.getTime();
        }
        gameTimeController.timeDown();

        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Show invite dialog */}
      {showInviteDialog && <View></View>}

      {/* Show keyword dialog */}
      {/* <KeywordSelection
        isShow={showKeywordDialog}
        keyword={"Keyword"}
      ></KeywordSelection> */}

      {/* Show result dialog */}
      {/* <EndGameResult
        items={usersInRoom}
        isShow={true}
        keyword={"Trò chơi kết thúc"}
      ></EndGameResult> */}

      {/* Show add friend dialog */}
      {showAddFriendDialog && (
        <AddFriendDialog
          isShow={showAddFriendDialog}
          onChangeShow={setShowAddFriendDialog}
          keyword={"Add friend"}
          user={userToAddFriend}
        ></AddFriendDialog>
      )}

      {/* Show download image dialog */}
      {showDownloadImageDialog && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDownloadImageDialog}
          onRequestClose={closeAllModal}
        >
          <Pressable style={styles.overlay} onPress={closeAllModal} />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {capturedImage && (
                <Image
                  source={{ uri: capturedImage }}
                  style={{ flex: 1, resizeMode: "center" }}
                />
              )}
            </View>
          </View>
        </Modal>
      )}

      {/* AppBar */}
      <View style={styles.appBar}>
        <Ionicons name="menu" size={30} color="white" />
        <Text style={styles.timer}>{timer}</Text>
        <View style={styles.roomInfoContainer}>
          <Text style={styles.roomName}>{roomInfo.name}</Text>
          <Text style={styles.roomId}>ID Phòng: {roomInfo._id}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Room Config")}>
          <Ionicons
            name="settings"
            size={26}
            color="white"
            style={{ margin: 4 }}
          />
        </Pressable>
      </View>

      {/* Whiteboard */}
      {isStart ? (
        <View style={styles.whiteBoard}>
          <ViewShot
            ref={viewShotRef}
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <WhiteBoard
              roomId={roomInfo._id}
              color={color}
              size={size}
              isRedo={isRedo}
              onRedo={() => setIsRedo(false)}
              isUndo={isUndo}
              onUndo={() => setIsUndo(false)}
              isClear={isClear}
              onClearDrawing={updateIsClear}
            ></WhiteBoard>
            {showOptions && (
              <Animated.View style={styles.topBar}>
                <DrawingOptionsBar
                  onUpdateColor={updateColor}
                  onUpdateSize={updateSize}
                  color={color}
                  size={size}
                  option={option}
                  toggleOptions={toggleOptions}
                  onClearDrawing={updateIsClear}
                />
              </Animated.View>
            )}
          </ViewShot>
        </View>
      ) : (
        <View style={styles.bannerCotainer}>
          <Image
            source={require("../../assets/draw_and_guess_logo.png")}
            style={{
              resizeMode: "contain",
              marginTop: 110,
              height: "60%",
              width: "100%",
            }}
          />
          <View style={styles.buttonContainers}>
            <View style={styles.containerInvite}>
              <LinearGradient
                colors={["#2CB4FF", "#62C7FF"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradientButton}
              >
                <Image
                  source={require("../../assets/find_icon.png")}
                  style={{ flex: 1, resizeMode: "center" }}
                />
                <Text style={{ flex: 2, color: "white", fontSize: 18 }}>
                  Mời bạn
                </Text>
              </LinearGradient>
            </View>
            <TouchableOpacity
              style={styles.containerStart}
              onPress={handleStart}
            >
              <LinearGradient
                colors={["#AB012B", "#FF003F"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradientButton}
              >
                <Image
                  source={require("../../assets/create_icon.png")}
                  style={{ flex: 1, resizeMode: "center" }}
                />
                <Text style={{ flex: 2, color: "white", fontSize: 18 }}>
                  Bắt đầu
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Drawing options */}
      {isStart ? (
        <View
          style={[
            styles.bottomBar,
            {
              borderTopColor: "lightgray",
              borderTopWidth: 1,
              borderTopHeight: 1,
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => toggleOptions(1)}
            >
              <Ionicons
                name={option === 1 ? "brush" : "brush-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => toggleOptions(2)}
            >
              <Ionicons
                name={option === 2 ? "color-palette" : "color-palette-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => toggleOptions(3)}
            >
              <Ionicons
                name={option === 3 ? "trash" : "trash-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
              <Ionicons name="download" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setIsUndo(true)}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setIsRedo(true)}
            >
              <Ionicons name="arrow-forward" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.bottomBar, { backgroundColor: "#79c060" }]}></View>
      )}
      {/* Chat box */}
      <View style={styles.chatBox}>
        {/* Các ô chứa hình ảnh user */}
        <View style={styles.userImagesContainer}>
          {
            // Hiển thị hình ảnh của các user trong phòng
            usersInRoom.map((user) => (
              <TouchableOpacity
                key={user._id}
                onPress={() => {
                  setShowAddFriendDialog(true);
                  setUserToAddFriend(user);
                }}
              >
                <Image
                  key={user._id}
                  source={{ uri: user.avatarUrl }}
                  style={styles.userImage}
                />
              </TouchableOpacity>
            ))
          }
        </View>
        {/* Khung chứa các câu trả lời */}
        <ChatHistory message={messageHistory} />
        <View style={styles.inputContainer}>
          {/* Icon button gửi ảnh */}
          <TouchableOpacity onPress={handleSendImage} style={styles.iconButton}>
            <Image
              source={require("../../assets/send_image.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* TextInput */}
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Nhập câu trả lời..."
            placeholderTextColor="#888"
          />
          {/* Icon button chọn bộ icon */}
          <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
            <Image
              source={require("../../assets/send.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GuessingWord;
