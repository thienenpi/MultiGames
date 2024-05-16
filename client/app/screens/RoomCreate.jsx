import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Switch, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppBar, CustomButton } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { createRoom } from "../api/RoomApi";
import styles from "./styles/createroom.style";

const RoomCreate = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [modalVisibleCapacity, setModalVisibleCapacity] = useState(false);
  const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [selectedButton, setSelectedButton] = useState(0);
  const [capacitySpy, setCapacitySpy] = useState([4, 5, 6, 7, 8]);
  const [capacityDraw, setCapacityDraw] = useState([2, 3, 4, 5, 6]);
  const buttonTitles = [
    ["Ai Là Gián Điệp - Chế độ giọng nói", capacitySpy],
    ["Ai Là Gián Điệp - Chế độ văn bản", capacitySpy],
    ["Gián Điệp Không Lời - Chế đội giọng nói", capacitySpy],
    ["Gián Điệp Không Lời - Chế đội văn bản", capacitySpy],
    ["Bạn Vẽ Tôi Đoán", capacityDraw],
  ];
  const [lastIndex, setLastIndex] = useState(buttonTitles[selectedButton][1].length - 1);
  const [password, setPassword] = useState('');

  function generateRoomId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleCreateRoom = async () => {
    try {
      const data = {
        name: "roomName",
        isPassword: true,
        password: "123456",
        mode: "buttonTitles",
        capacity: 1,
        list_guest: [],
        owner: "room",
        chatGame: "a",
        status: "active"
      }

      const res = await createRoom({ data: data });

      if (res.status === 200) {
        Alert.alert('Room created successfully');
      } else {
        console.log(res);
        Alert.alert('Failed to create room');
      }
    } catch {
      Alert.alert('An error occurred while creating the room');
    }
  }

  const handleCancel = () => {
    setModalVisiblePassword(false);
  }

  const handleConfirm = () => {
    setIsPassword(true)
    setModalVisiblePassword(false);
  }

  const handlePasswordChange = (text) => {
    // Kiểm tra nếu text không phải là ký tự delete hoặc là chuỗi rỗng
    if (text === '' || text[text.length - 1] === '\u0008') {
      setPassword(text); // Giữ nguyên chuỗi nếu là ký tự delete hoặc chuỗi rỗng
    } else {
      // Loại bỏ các ký tự không phải là số
      const cleanedText = text.replace(/[^0-9]/g, '');
      // Giới hạn độ dài của chuỗi nhập vào thành 4 ký tự
      const truncatedText = cleanedText.slice(0, 4);
      // Cập nhật giá trị của password
      setPassword(truncatedText);
    }
  };


  return (
    <View style={styles.container}>
      <AppBar
        title="Tạo phòng"
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>

      <View style={{
        backgroundColor: "white",
        paddingBottom: 10,
      }}>
        <Text style={{ marginVertical: 8, marginHorizontal: 10 }}>Chế độ chơi</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            paddingHorizontal: 20,
          }}
        >
          {buttonTitles.map((title, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "45%",
                height: 60,
                marginVertical: 6,
                backgroundColor: "white",
                borderColor: selectedButton === index ? "#4FBFFF" : "gray",
                borderWidth: 1,
                borderRadius: 10,
                padding: 8,
                justifyContent: "center",
              }}
              onPress={() => {
                setLastIndex(title[1].length - 1);
                setSelectedButton(index);
              }}
            >
              <Text
                style={{
                  color: selectedButton === index ? "#4FBFFF" : "gray",
                  textAlign: "center",
                }}
              >
                {title[0]}
              </Text>
            </TouchableOpacity>
          ))}

        </View>
      </View>

      <View style={styles.separator} />

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          padding: 10,
          backgroundColor: "white",
        }}
        onPress={() => setModalVisibleCapacity(true)}>
        <Text>Số lượng người chơi</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 8, color: "gray" }}>{buttonTitles[selectedButton][1][lastIndex]} người</Text>
          <Ionicons name="chevron-forward" size={16} color="gray" />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="pade"
        transparent={true}
        visible={modalVisibleCapacity}
        onRequestClose={() => {
          setModalVisibleCapacity(!modalVisibleCapacity);
        }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",

          }}
          onPress={() => setModalVisibleCapacity(false)}
        >
        </Pressable>
        <View style={styles.centeredView}>
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            {buttonTitles[selectedButton][1].map((count, index) => (
              <TouchableOpacity
                key={count}
                onPress={() => {
                  setLastIndex(index);
                  setModalVisibleCapacity(false);
                }}
                style={{
                  height: 50,
                  width: "100%",
                  marginVertical: 6,
                  backgroundColor: "white",
                  borderColor: lastIndex === index ? "#4FBFFF" : "black",
                  borderWidth: lastIndex === index ? 2 : 0.5,
                  borderRadius: 10,
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: lastIndex === index ? "#4FBFFF" : "gray",
                    fontWeight: lastIndex === index ? "bold" : "normal",
                  }}
                >{count} người chơi</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <View style={styles.separator} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <Text>Mật khẩu</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          trackColor={{ false: "lightgray", true: "#81b0ff" }}
          thumbColor="white"
          onValueChange={() => {
            if (!isPassword) setModalVisiblePassword(!isPassword);
            else {
              setPassword('');
              setIsPassword(!isPassword);
            }
          }}
          value={isPassword}
        />
      </View>

      <Modal
        animationType="pade"
        transparent={true}
        visible={modalVisiblePassword}
        onRequestClose={() => {
          setModalVisiblePassword(!modalVisiblePassword);
        }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
          }}
        >
        </View>
        <View style={styles.centeredView}>
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 18 }}>Nhập mật khẩu</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                }}
                onChangeText={handlePasswordChange}
                value={password}
                keyboardType="numeric" // Hiển thị bàn phím số
                maxLength={4} // Giới hạn độ dài của TextInput
              />

              <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{
                    backgroundColor: "white",
                    borderColor: "#00CDF9",
                    borderWidth: 1,
                    borderRadius: 90,
                    flex: 1,
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text style={{ color: "#00CDF9", fontWeight: "bold" }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={{
                    backgroundColor: "#00CDF9",
                    borderColor: "#00CDF9",
                    borderWidth: 1,
                    borderRadius: 90,
                    flex: 1,
                    marginRight: 10,
                    marginLeft: 10,
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.separator} />

      {isPassword &&
        <TouchableOpacity
          onPress={() => setModalVisiblePassword(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "white",
            height: 50,
          }}
        >
          <Text>Đổi mật khẩu</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 8, color: "gray" }}>{password}</Text>
            <Ionicons name="chevron-forward" size={16} color="gray" />
          </View>
        </TouchableOpacity>
      }

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
          onPress={() => {
            handleCreateRoom();
          }}
        />
      </View>
    </View>
  );
};

export default RoomCreate;
