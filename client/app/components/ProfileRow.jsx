import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/profileRow.style";

const ProfileRow = ({ avatarSource, money, name, eventIcon, eventText }) => {
  const handleAvatarPress = () => {
    // Xử lý khi nhấn vào avatar
    console.log("Avatar pressed");
  };

  const handleEventPress = () => {
    // Xử lý khi nhấn vào phần event
    console.log("Event pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable style={styles.avatarContainer} onPress={handleAvatarPress}>
          <Image source={{ uri: avatarSource }} style={styles.avatar} />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Welcome {name}</Text>
          <Pressable style={styles.moneyContainer}>
            <Ionicons name="cash-outline" size={18} style={styles.icon} />
            <Text style={styles.moneyText}>{money}</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.rightContainer} onPress={handleEventPress}>
        <View style={styles.eventContainer}>
          <Ionicons name={eventIcon} size={26} color="pink" />
          <Text style={styles.eventText}>{eventText}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ProfileRow;
