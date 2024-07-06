import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { joinRoom } from "../../services";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

function excuitionModeName(mode) {
  const lowerCaseMode = mode.toLowerCase();

  if (lowerCaseMode.includes("gián điệp")) {
    return "Truy Tìm Gián điệp";
  } else if (lowerCaseMode.includes("vẽ")) {
    return "Bạn vẽ tôi đoán";
  }
}

const RoomCardView = ({ onItemPress, item, isShowRoomsActive }) => {
  const [gameTypeColor, setGameTypeColor] = useState(COLORS.background);
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

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

  const handleJoinRoom = async () => {
    const res = await joinRoom({ roomId: item._id, userId: userInfo._id });

    if (res && res.status === "playing") {
      Alert.alert("Can not join", "The game has started.");
      return;
    }

    const gameMode = excuitionModeName(item.mode);

    if (gameMode === "Bạn vẽ tôi đoán") {
      navigation.navigate("Guessing Word", { roomInfo: item });
    }
    if (gameMode === "Truy Tìm Gián điệp") {
      navigation.navigate("Spy Game", { roomInfo: item });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleJoinRoom().then(() => {
          onItemPress();
        });
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://fastly.picsum.photos/id/591/200/200.jpg?hmac=5agpVWsRchY0DObXs23vYWjjgqLZEBhqSvTwfCAcyng",
          }}
          style={styles.avatar}
          imageStyle={styles.avatar}
        ></ImageBackground>

        <View style={styles.roomInfo}>
          {isShowRoomsActive ? (
            <Text style={[styles.roomID, { fontSize: 14, width: 90 }]}>
              ID: {item.name}
            </Text>
          ) : (
            <Text style={styles.roomID}>ID: {item.name}</Text>
          )}

          <View style={styles.roomState}>
            <Text style={styles.waiting}>
              Waiting {item.list_guest.length}/{item.capacity}
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
