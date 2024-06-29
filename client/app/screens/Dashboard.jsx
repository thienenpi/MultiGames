import React, { useContext, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/dashboard.style";
import { ProfileRow, GameCard, MyCarousel } from "../components";
import { joinRoom, accessRoom } from "../services";
import { socket, spySocket } from "../utils/config";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Dashboard = () => {
  const { userInfo, fetchUserInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo(userInfo._id);
    }, [])
  );

  const handleAccessRoom = async () => {
    const data = {
      gameMode: "Bạn Vẽ Tôi Đoán",
    };
    var roomInfo = await accessRoom({ data: data });
    if (!roomInfo) {
      navigation.navigate("Room Create");
      return;
    }

    await joinRoom({ roomId: roomInfo._id, userId: userInfo._id });
    navigation.navigate("Guessing Word", { roomInfo: roomInfo });
  };

  useEffect(() => {
    socket.connect();
    spySocket.connect();
    socket.emit("online", userInfo._id);
  }, [userInfo]);

  return (
    <View>
      <ProfileRow
        avatarSource={userInfo.avatarUrl}
        name={userInfo.name}
        money={userInfo.money}
        eventIcon="star-outline"
        eventText="Events"
      />

      {/* <GestureHandlerRootView>
        <MyCarousel />
      </GestureHandlerRootView> */}

      <View style={styles.containerTask}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="stats-chart" size={34} color="blue" />
          <Text style={styles.text}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="add-circle-outline" size={34} color="red" />
          <Text style={styles.text}>Invitations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="people-sharp" size={34} color="purple" />
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
      </View>

      <Image source={require("../../assets/slide1.jpg")} style={{ height: 250, width: '100%' }} resizeMode="cover"/>

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
            onPress={handleAccessRoom}
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
      <TouchableOpacity onPress={handleAccessRoom}>
        <GameCard
          colorDark="rgba(0,180,0,0.8)"
          colorLight="rgba(0,180,0,0.5)"
          imagePath={require("../../assets/draw_logo.png")}
          text="Guess My Drawing"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Spy Main")}>
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
