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
import React, { useState, useRef, useContext, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";

import { AuthContext } from "../context/AuthContext";
import { socket } from "../utils/config";
import styles from "./styles/guessingWord.style";
import { WhiteBoard, DrawingOptionsBar, ChatHistory } from "../components";
import { getUserById } from "../api/UserApi";

const GuessingWord = () => {
  const route = useRoute();
  const { userInfo } = useContext(AuthContext);
  const { roomInfo } = route.params;
  const viewShotRef = useRef(null);

  const [isStart, setIsStart] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState(0);
  const [message, setMessage] = useState("");
  //   const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(2);
  const [isRedo, setIsRedo] = useState(false);
  const [isUndo, setIsUndo] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);

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

  const handleChooseIcon = () => {
    // Xử lý khi người dùng nhấn vào nút chọn bộ icon
  };

  const handleStart = () => {
    setIsStart(true); // Update state to show the whiteboard
  };

  const hanldeDialog = async () => {
    setShowDialog(true);
  };

  const closeModal = () => {
    setShowDialog(false);
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

  useEffect(() => {
    const getAllUsers = async () => {
      setUsersInRoom([]);
      for (let userId of roomInfo.list_guest) {
        const res = await getUserById({ id: userId });

        if (res.status === 200) {
          const user = res.data;
          setUsersInRoom((prevUsers) => [...prevUsers, user]);
        }
      }
    };

    setMessageHistory([]);
    socket.emit("getChatHistory", roomInfo._id);

    getAllUsers();
  }, []);

  return (
    <View style={styles.container}>
      {showDialog && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDialog}
          onRequestClose={closeModal}
        >
          <Pressable style={styles.dialogContainer} onPress={closeModal}>
            <View style={styles.dialogBody}>
              {capturedImage && (
                <Image
                  source={{ uri: capturedImage }}
                  style={{ flex: 1, resizeMode: "center" }}
                />
              )}
            </View>
          </Pressable>
        </Modal>
      )}
      <View style={styles.appBar}>
        <View style={styles.roomInfoContainer}>
          <Text style={styles.roomName}>{roomInfo._id}</Text>
          <Text style={styles.roomId}>ID Phòng: {roomInfo._id}</Text>
        </View>
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
              <Image
                key={user._id}
                source={{ uri: user.avatarUrl }}
                style={styles.userImage}
              />
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
