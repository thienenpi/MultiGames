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
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "./styles/guessingWord.style";
import { WhiteBoard, DrawingOptionsBar } from "../components";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";

import ChatHistory from "../components/ChatHistory";
import { AuthContext } from "../context/AuthContext";
import io from "socket.io-client";
import { BASE_URL } from "../utils/config";
const socket = io(BASE_URL.slice(0, -4), {
  path: "/api/whiteBoard/",
});
const GuessingWord = () => {
  const route = useRoute();
  const { userInfo } = useContext(AuthContext);
  const { roomId } = route.params;

  const [isStart, setIsStart] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const viewShotRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(2);
  const [isRedo, setIsRedo] = useState(false);
  const [isUndo, setIsUndo] = useState(false);
  const [isClear, setIsClear] = useState(false);

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
    setShowOptions(false);
    try {
      const uri = await viewShotRef.current.capture();
      setCapturedImage(uri);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        sender: userInfo.name,
        content: message
      };
      socket.emit('message', newMessage);
      setMessage('');
    }
  };
  useEffect(() => {
    // Join the room when component mounts
    socket.on('message', (data) => {
      setMessageHistory((prevMessageHistory) => [...prevMessageHistory, data])
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllMessage();
  }, [])
  const getAllMessage = () => {
    socket.emit('startChat', roomId);
    socket.emit('getChatHistory', roomId);
    socket.on('chatHistory', (chats) => {
      setMessageHistory(chats);
    })
    // Clean up on unmount
    return () => {
      socket.off('chatHistory');
    };
  }
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
          <Text style={styles.roomName}>Tên Phòng</Text>
          <Text style={styles.roomId}>ID Phòng: 123456</Text>
        </View>
      </View>
      {/* Whiteboard và khung chat */}
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
              roomId={roomId}
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
              marginTop: 90,
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
      <View style={styles.chatBox}>
        {/* Các ô chứa hình ảnh user */}
        <View style={styles.userImagesContainer}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.userImage}></View>
          ))}
        </View>
        {/* Khung chứa các câu trả lời */}
        <ChatHistory message={messageHistory} />
        {/* Ô nhập câu trả lời */}
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập câu trả lời..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Image
              source={require('../../assets/send.png')} // Đặt đường dẫn ảnh của nút gửi ở đây
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View> */}
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
            onChangeText={text => setMessage(text)}
            placeholder="Nhập câu trả lời..."
            placeholderTextColor="#888"
          />
          {/* Icon button chọn bộ icon */}
          <TouchableOpacity
            onPress={sendMessage}
            style={styles.iconButton}
          >
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
