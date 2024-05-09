import React, { useState } from "react";

import { View, Text, TouchableOpacity, Modal, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppBar, CustomButton } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { roomCreate } from '../api/RoomApi';
import styles from "./styles/addroom.style";

const AddRoom = () => {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState('BMW_Rollroyce_Mercedes_Benz');
  const [playerCount, setPlayerCount] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const buttonTitles = [
    "Ai Là Gián Điệp - Chế độ giọng nói",
    "Ai Là Gián Điệp - Chế độ văn bản",
    "Gián Điệp Không Lời - Chế đội giọng nói",
    "Gián Điệp Không Lời - Chế đội văn bản",
    "Bạn Vẽ Tôi Đoán",
  ];

  const handleSubmit = async () => {
    try {
      const data = {
        name: roomName,
        isPassword: isSwitchEnabled,
        password: '123456',
        mode: buttonTitles[selectedButton],
        capacity: playerCount,
        list_guest: [],
      }
      const res = await roomCreate({ data : data });
      if (res.status === 200) {
        alert('Room created successfully');
      } else {
        alert('Failed to create room');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the room');
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="Tạo phòng"
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>

      <Text style={{ fontWeight: "bold" }}>Chế độ chơi</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {buttonTitles.map((title, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: "45%",
              height: 60,
              margin: 10,
              backgroundColor: "white",
              borderColor: selectedButton === index ? "#4FB9BF" : "black",
              borderWidth: 1,
              borderRadius: 20,
              padding: 8,
            }}
            onPress={() => setSelectedButton(index)}
          >
            <Text
              style={{
                color: selectedButton === index ? "#4FB9BF" : "black",
                textAlign: "center",
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.separator} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Số lượng người chơi: </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{playerCount}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {[2, 4, 6, 8].map((count) => (
            <TouchableOpacity
              key={count}
              onPress={() => {
                setPlayerCount(count);
                setModalVisible(false);
              }}
            >
              <Text>{count} người chơi</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <View style={styles.separator} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Mật khẩu</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={setIsSwitchEnabled}
          value={isSwitchEnabled}
        />
      </View>
      <View style={styles.separator} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <CustomButton
          isValid={true}
          styles={styles}
          label={"Tạo phòng"}
          onPress= {handleSubmit}
        />
      </View>
    </View>
  );
};

export default AddRoom;
