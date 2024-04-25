import { View, Text, TextInput, TouchableOpacity, Image, Modal, Pressable } from "react-native"; // Thêm TextInput từ react-native
import React, { useState, useRef } from "react";
import styles from "./styles/guessingWord.style";
import { WhiteBoard } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from 'react-native-view-shot';

const GuessingWord = () => {
  const [isStart, setIsStart] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const viewShotRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null)
  const handleButtonPress = () => {
    captureAndSaveImage().then(hanldeDialog());
  };
  const handleSendImage = () => { };
  const handleChooseIcon = () => {
    // Xử lý khi người dùng nhấn vào nút chọn bộ icon
  };
  const handleStart = () => {
    setIsStart(true); // Update state to show the whiteboard
  };
  const hanldeDialog = async () => {
    setShowDialog(true);
  }
  const closeModal = () => {
    setShowDialog(false);
  };

  const captureAndSaveImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setCapturedImage(uri);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  return (
    <View style={styles.container}>
      {showDialog &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDialog}
          onRequestClose={closeModal}
        >
          <Pressable style={styles.dialogContainer} onPress={closeModal}>
            <View style={styles.dialogBody}>
              {capturedImage && <Image source={{ uri: capturedImage }} style={{ flex: 1, resizeMode: 'center' }} />}
            </View>
          </Pressable>
        </Modal>}
      <View style={styles.appBar}>
        {/* <TouchableOpacity style={styles.menuButton}>
          <Image
            source={require('../../assets/send.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>  */}
        <View style={styles.roomInfoContainer}>
          <Text style={styles.roomName}>Tên Phòng</Text>
          <Text style={styles.roomId}>ID Phòng: 123456</Text>
        </View>
      </View>
      {/* Whiteboard và khung chat */}
      {isStart ? (<View style={styles.whiteBoard}>
        <ViewShot ref={viewShotRef} style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0 }}> 
          <WhiteBoard />
        </ViewShot>
      </View>) : (
        <View style={styles.bannerCotainer}>
          <Image source={require('../../assets/draw_and_guess_logo.png')} style={{ resizeMode: 'contain', marginTop: 90, height: '60%', width: '100%' }} />
          <View style={styles.buttonContainers}>
            <View style={styles.containerInvite}>
              <LinearGradient colors={['#2CB4FF', '#62C7FF']} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                <Image source={require('../../assets/find_icon.png')} style={{ flex: 1, resizeMode: 'center' }} />
                <Text style={{ flex: 2, color: 'white', fontSize: 18 }}>Mời bạn</Text>
              </LinearGradient>
            </View>
            <TouchableOpacity style={styles.containerStart} onPress={handleStart}>
              <LinearGradient colors={['#AB012B', '#FF003F']} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                <Image source={require('../../assets/create_icon.png')} style={{ flex: 1, resizeMode: 'center' }} />
                <Text style={{ flex: 2, color: 'white', fontSize: 18 }}>Bắt đầu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>)}
      <View style={styles.chatBox}>
        {/* Các ô chứa hình ảnh user */}
        <View style={styles.userImagesContainer}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.userImage}></View>
          ))}
        </View>
        {/* Khung chứa các câu trả lời */}
        <View style={styles.answersContainer}>
          {/* Các câu trả lời sẽ được render ở đây */}
        </View>
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
        {/* <View style={styles.container}> */}
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
            placeholder="Nhập câu trả lời..."
            placeholderTextColor="#888"
          />
          {/* Icon button chọn bộ icon */}
          <TouchableOpacity
            onPress={handleButtonPress}
            style={styles.iconButton}
          >
            <Image
              // source={require('../../assets/choose-icon.png')}
              source={require("../../assets/send.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </View>
  );
};

export default GuessingWord;
