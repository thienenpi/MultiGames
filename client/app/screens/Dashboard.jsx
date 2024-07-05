import React, { useContext, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/dashboard.style";
import {
  ProfileRow,
  GameCard,
  RankingDialog,
  FriendsDialog,
} from "../components";
import { joinRoom, accessRoom } from "../services";
import { socket, spySocket } from "../utils/config";
import { useState } from "react";

const Dashboard = () => {
  const { userInfo, fetchUserInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isShowRanking, setIsShowRanking] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);

  const GAME_MODE = {
    DRAW: "Bạn Vẽ Tôi Đoán",
    SPY: "Ai Là Gián Điệp - Chế độ văn bản",
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo(userInfo._id);
    }, [])
  );

  const handleAccessRoom = async (mode) => {
    const data = {
      gameMode: mode,
    };

    var roomInfo = await accessRoom({ data: data });

    if (!roomInfo) {
      navigation.navigate("Room Create");
      return;
    }

    const res = await joinRoom({ roomId: roomInfo._id, userId: userInfo._id });

    if (res.status === "playing") {
      Alert.alert("Cannot join", "Room is playing.");
      return;
    }
    // navigation.navigate("Guessing Word", { roomInfo: roomInfo });
    // await joinRoom({ roomId: roomInfo._id, userId: userInfo._id });

    if (mode === "Bạn Vẽ Tôi Đoán") {
      navigation.navigate("Guessing Word", { roomInfo: roomInfo });
    }

    if (mode === "Ai Là Gián Điệp - Chế độ văn bản") {
      navigation.navigate("Spy Game", { roomInfo: roomInfo });
    }
  };

  useEffect(() => {
    socket.connect();
    spySocket.connect();
    socket.emit("online", userInfo._id);
  }, [userInfo]);

  return (
    <View style={{ marginHorizontal: 8 }}>
      <ProfileRow
        avatarSource={userInfo.avatarUrl}
        name={userInfo.name}
        money={userInfo.money}
      />

<View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setIsShowRanking((prev) => !prev)}
          >
            <Image source={require("../../assets/icon_ranking.png")} style={ styles.icon } />
            <Text style={styles.text}>Ranking</Text>
          </TouchableOpacity>

          {isShowRanking && (
            <RankingDialog
              isShow={isShowRanking}
              onChangeShow={setIsShowRanking}
            />
          )}

          <TouchableOpacity style={styles.item}>
            <Image source={require("../../assets/icon_playgame.png")} style={ styles.icon } />
            <Text style={styles.text}>Room Active</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => setIsShowFriends((prev) => !prev)}
          >
            <Image source={require("../../assets/icon_friends.png")} style={ styles.icon } />
            <Text style={styles.text}>Friends</Text>
          </TouchableOpacity>

          {isShowFriends && (
            <FriendsDialog
              isShow={isShowFriends}
              onChangeShow={setIsShowFriends}
            ></FriendsDialog>
          )}
        </View>

      <Image
        source={require("../../assets/slide1.jpg")}
        style={{ height: 250, width: "95%", borderRadius: 15, justifyContent: "center", alignSelf: "center" }}
        resizeMode="cover"
      />

      <View style={styles.containerInfo}>
        <View style={styles.row}>
          <Text style={{ fontSize: 30, fontWeight: "600" }}>Let's Play</Text>
          <TouchableOpacity
            style={[
              styles.button,
              { paddingHorizontal: 10, paddingVertical: 4 },
            ]}
            onPress={() => navigation.navigate("Room Board")}
          >
            <Ionicons
              name="lock-open-outline"
              size={16}
              color="gray"
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.buttonText, { fontSize: 14 }]}>Game Room</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          <Text
            style={{
              fontSize: 14,
              color: "#333333",
              opacity: 0.5,
              marginRight: 10,
            }}
          >
            Recently played :
          </Text>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 6, paddingVertical: 2 }]}
            onPress={() => handleAccessRoom(GAME_MODE.DRAW)}
          >
            <Ionicons
              name="pencil-outline"
              size={14}
              color="gray"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.buttonText}>Guess My Drawing</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleAccessRoom(GAME_MODE.DRAW)}>
        <GameCard
          colorDark="rgba(0,180,0,0.8)"
          colorLight="rgba(0,180,0,0.5)"
          imagePath={require("../../assets/draw_logo.png")}
          text="Guess My Drawing"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAccessRoom(GAME_MODE.SPY)}>
        <GameCard
          colorDark="rgba(0,0,180,0.8)"
          colorLight="rgba(0,0,180,0.5)"
          imagePath={require("../../assets/spy_logo.png")}
          text="Who's the Spy?"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
