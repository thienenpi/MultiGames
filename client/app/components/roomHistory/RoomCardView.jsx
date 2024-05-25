import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

function excuitionModeName(mode) {
  const lowerCaseMode = mode.toLowerCase();

  if (lowerCaseMode.includes("gián điệp")) {
    return "Truy Tìm Gián điệp";
  } else if (lowerCaseMode.includes("vẽ")) {
    return "Bạn vẽ tôi đoán";
  }
}

const RoomCardView = ({ item }) => {
  const [gameTypeColor, setGameTypeColor] = useState(COLORS.background);

  useEffect(() => {
    handleGameTypePress();
  }, []);

  const handleGameTypePress = () => {
    if (item.mode.toLowerCase().includes("gián điệp")) {
      setGameTypeColor(COLORS.lightBlue);
    } else if (item.mode.toLowerCase().includes("vẽ")) {
      setGameTypeColor(COLORS.green);
    }
  };

  return (
    <TouchableOpacity onPress={handleGameTypePress}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://fastly.picsum.photos/id/591/200/200.jpg?hmac=5agpVWsRchY0DObXs23vYWjjgqLZEBhqSvTwfCAcyng",
          }}
          style={styles.avatar}
          imageStyle={styles.avatar}
        ></ImageBackground>

        <View style={styles.roomInfo}>
          <Text style={styles.roomID}>Room ID: {item.name}</Text>

          <View style={styles.roomState}>
            <Text style={styles.waiting}>
              Đang chờ {item.list_guest.length}/{item.capacity}
            </Text>

            <View style={[styles.gameType, { backgroundColor: gameTypeColor }]}>
              <Text style={styles.gameTypeText}>
                {excuitionModeName(item.mode)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge * 2,
    width: SIZES.width,
    padding: SIZES.medium,
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
    fontSize: SIZES.large * 0.9,
    fontFamily: "sfPro",
    left: SIZES.small,
    width: SIZES.width / 2,
    overflow: "hidden",
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
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },

  gameTypeText: {
    color: COLORS.background,
  },
});

export default RoomCardView;
