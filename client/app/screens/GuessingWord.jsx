import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'; // Thêm TextInput từ react-native
import React from 'react';
import styles from './styles/guessingWord.style';
import { WhiteBoard } from '../components';

const GuessingWord = () => {
  const handleSendImage = () => {
    
  };

  const handleChooseIcon = () => {
    // Xử lý khi người dùng nhấn vào nút chọn bộ icon
  };
  return (
    <View style={styles.container}>
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
      <View style={styles.whiteBoard}>
        <WhiteBoard></WhiteBoard>
      </View>
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
            source={require('../../assets/send_image.png')}
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
        <TouchableOpacity onPress={handleChooseIcon} style={styles.iconButton}>
          <Image
            // source={require('../../assets/choose-icon.png')}
            source={require('../../assets/send.png')}
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
