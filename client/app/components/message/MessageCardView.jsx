import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

const MessageCardView = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style></View>
        <ImageBackground
          source={{
            uri: item.avatarUrl,
          }}
          style={styles.avatar}
          imageStyle={styles.avatar}
        >
          <View style={styles.unreadNumber}>
            <Text style={{ color: COLORS.background, fontSize: 12 }}>
              {item.unreadNumber}
            </Text>
          </View>
        </ImageBackground>

        <View style={{ width: SIZES.large }}></View>

        <View style={styles.message}>
          <View style={styles.messageHeader}>
            <Text style={styles.userName}>{item.userName}</Text>

            <Text style={styles.date}>{item.date}</Text>
          </View>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.messageText}
          >
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCardView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge * 2,
    padding: SIZES.medium,
    // create border around the message card
    borderWidth: 0.2,
    borderColor: COLORS.text,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.medium,
  },

  avatar: {
    width: SIZES.xLarge * 2.5,
    height: SIZES.xLarge * 2.5,
    borderRadius: SIZES.xLarge * 2.5,
  },

  // unreadNumber on the top right corner of the avatar
  unreadNumber: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.button,
    width: SIZES.large,
    height: SIZES.large,
    borderRadius: SIZES.large,
    borderColor: COLORS.background,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },

  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userName: {
    color: COLORS.text,
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
  },

  date: {
    color: COLORS.text,
  },

  messageText: {
    color: COLORS.text,
    fontWeight: "bold",
    // show ... if the message is too long
    overflow: "hidden",
  },
});
