import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./styles/message.style";
import { AppBar, MessageColumn } from "../components";
import { Ionicons } from "@expo/vector-icons";

// create a sample for the items
const items = [
  {
    _id: 1,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 2,
    userName: "Tham Duy",
    date: "20/10/2021",
    message: "Hello",
  },
  {
    _id: 2,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat",
    date: "20/10/2021",
    message: "Hi",
  },
  {
    _id: 3,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 1,
    userName: "Tham Thien",
    date: "20/10/2021",
    message: "Hey",
  },
  {
    _id: 4,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 1,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
  {
    _id: 5,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
  {
    _id: 6,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
  {
    _id: 7,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
  {
    _id: 8,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
  {
    _id: 9,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
  {
    _id: 10,
    avatarUrl: "https://multigames.blob.core.windows.net/images/user.png",
    unreadNumber: 0,
    userName: "Tham Phat Tran",
    date: "20/10/2021",
    message: "Hola",
  },
];

const Message = () => {
  return (
    <View style={styles.container}>
      <AppBar style={styles}></AppBar>

      <View style={styles.header}>
        <Text style={styles.headerText}>Message</Text>

        <TouchableOpacity>
          <Ionicons name="person-outline" style={styles.headerIcon} />
        </TouchableOpacity>

        <View style={{ width: 10 }}></View>

        <TouchableOpacity>
          <Ionicons name="add-outline" style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <MessageColumn items={items}></MessageColumn>
      </View>
    </View>
  );
};

export default Message;
