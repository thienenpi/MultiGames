import { Text, TouchableOpacity, View, Modal, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import styles from "./styles/message.style";
import { MessageColumn } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { getUserById, sendFriendRequest } from "../api/UserApi";
import { AuthContext } from "../context/AuthContext";

const items = [
  {
    _id: "65ed90b0f12e78c2a6456d25",
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 2,
    userName: "phat",
    date: "20/10/2021",
    message: "Hello",
  },
  {
    _id: "65ed877e0da840aa5bc41fd7",
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Thien03",
    date: "20/10/2021",
    message: "Hi",
  },
];

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendId, setFriendId] = useState("");
  const {userInfo} = useContext(AuthContext)
  
  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest({ senderId: userInfo._id, recipientId: friendId });
      // Gửi lời mời kết bạn thành công, xử lý tại đây
      setModalVisible(true);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Failed to send friend request: ", error);
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Message</Text>

        <TouchableOpacity>
          <Ionicons name="person-outline" style={styles.headerIcon} />
        </TouchableOpacity>

        <View style={{ width: 10 }}></View>

        <TouchableOpacity onPress={handleSendFriendRequest}>
          <Ionicons name="add-outline" style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <MessageColumn items={items}></MessageColumn>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Enter friend's ID"
              onChangeText={setFriendId}
              value={friendId}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendFriendRequest}>
              <Text style={styles.buttonText}>Send Friend Request</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Message;
