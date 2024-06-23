import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../utils/config";
import { AppBar } from "../components";

const FriendChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const route = useRoute();

  const { item } = route.params;
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (userInfo && item) {
      socket.emit("getMessages", { userId: userInfo._id, friendId: item._id });
      
      socket.on("messages", (messages) => {
        setMessages(messages);
      });

      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("messages");
        socket.off("receiveMessage");
      };
    }
  }, []);

  const renderItem = ({ item, index }) => {
    const isLastMessage = index === messages.length - 1;
    const isSeen = item.isSeen;

    return (
      <View>
        <View
          style={[
            styles.messageContainer,
            item.senderId === userInfo._id
              ? styles.messageSent
              : styles.messageReceived,
          ]}
        >
          <Text style={styles.messageContent}>{item.message}</Text>
        </View>
        {isLastMessage && isSeen && <Text style={styles.seenText}>Đã xem</Text>}
      </View>
    );
  };

  const handleSendMessage = () => {
    if (userInfo && item) {
      const message = {
        senderId: userInfo._id,
        recipientId: item._id,
        message: newMessage,
      };

      socket.emit("sendMessage", message);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title={"Friend chat"}
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>
      <View style={styles.header}>
        <Image
          source={{ uri: item.avatarUrl }} // Thay thế bằng đường dẫn đến ảnh profile
          style={styles.profileImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{item.userName}</Text>
          <Text style={styles.status}>Đang hoạt động</Text>
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhắn tin"
          onSubmitEditing={handleSendMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    color: "green",
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageSent: {
    backgroundColor: "#d1e7ff",
    alignSelf: "flex-end",
  },
  messageReceived: {
    backgroundColor: "#e1e1e1",
    alignSelf: "flex-start",
  },
  messageContent: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  seenText: {
    fontSize: 12,
    color: "gray",
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: -5,
  },
});

export default FriendChat;
