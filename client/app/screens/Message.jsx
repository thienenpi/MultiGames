import { Text, TouchableOpacity, View, Modal, TextInput, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/message.style";
import { MessageColumn } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { acceptFriendRequest, sendFriendRequest } from "../api/UserApi";
import { getUserById } from "../api/UserApi";
import { AuthContext } from "../context/AuthContext";

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendId, setFriendId] = useState("");
  const { userInfo } = useContext(AuthContext);
  const [frienndList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendRequestModalVisible, setFriendRequestModalVisible] = useState(false);
  useEffect(() => {
    handleLoadFriend();
    handleLoadAcpectFriendRequest();
  }, []);

  const handleLoadFriend = () => {
    console.log(userInfo.friends);
    setFriendList([]);
    userInfo.friends.forEach(async (id) => {
      const res = await getUserById({ id: id });
      setFriendList((pevFriendlist) => [...pevFriendlist, res.data]);
    });
  };
  const handleAcceptFriendRequest = async ({userInfoId, friendId}) => {
    const res = await acceptFriendRequest({userId: userInfoId, friendId: friendId});
  }
  const handleLoadAcpectFriendRequest = () => {
    setFriendRequestList([]);
    userInfo.sentFriendRequests.forEach(async (id) => {
      const res = await getUserById({ id: id });
      setFriendRequestList((pevFriendRequestList) => [
        ...pevFriendRequestList,
        res.data,
      ]);
    });
  };
  const handleSendFriendRequest = async () => {
    try {
      setModalVisible(false);
      await sendFriendRequest({
        senderId: userInfo._id,
        recipientId: friendId,
      });
    } catch (error) {
      console.error("Failed to send friend request: ", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Message</Text>

        <TouchableOpacity onPress={() => setFriendRequestModalVisible(true)}>
          <Ionicons name="person-outline" style={styles.headerIcon} />
        </TouchableOpacity>

        <View style={{ width: 10 }}></View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-outline" style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <MessageColumn items={frienndList}></MessageColumn>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Enter friend's ID"
                onChangeText={setFriendId}
                value={friendId}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendFriendRequest}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={friendRequestModalVisible}
        onRequestClose={() => {
          setFriendRequestModalVisible(!friendRequestModalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => setFriendRequestModalVisible(false)}
        >
          <View>
            <View style={styles.modalView}>
              <FlatList
                data={friendRequestList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.friendRequestItem}>
                    <Text>{item.senderName}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleAcceptFriendRequest({userInfoId:  userInfo._id, friendId: item._id})}
                    >
                      <Text style={{ color: "white" }}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Message;
