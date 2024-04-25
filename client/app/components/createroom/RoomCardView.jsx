import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

const RoomCardView = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: item.avatarUrl,
          }}
          style={styles.avatar}
          imageStyle={styles.avatar}
        ></ImageBackground>

        <View style={styles.roomInfo}>
          <Text style={styles.roomID}>Số phòng {item.roomID}</Text>

          <View style={styles.roomState}>
            <Text style={styles.waiting}>
              Đang chờ {item.currentPlayers}/{item.maxPlayers}
            </Text>

            <View style={styles.gameType}>
              <Text
                style={{
                  color: COLORS.background,
                }}
              >
                {item.gameType === 0 ? "Bạn vẽ tôi đoán" : "Ai là gián điệp"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCardView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge * 2,
    width: SIZES.width,
    padding: SIZES.medium,
    // create border around the message card
    borderBottomWidth: 0.5,
    borderColor: COLORS.text,
  },

  avatar: {
    width: SIZES.xLarge * 2.5,
    height: SIZES.xLarge * 2.5,
    borderRadius: SIZES.xLarge * 2.5,
  },

  roomInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  roomID: {
    fontSize: SIZES.large,
    fontFamily: "sfPro",
    left: SIZES.small,
  },

  roomState: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.xSmall / 2,
  },

  waiting: {
    fontSize: SIZES.medium,
    fontFamily: "sfPro",
  },

  gameType: {
    fontSize: SIZES.medium,
    fontFamily: "sfPro",
    backgroundColor: COLORS.primaryLight,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.small,
  },
});
