import React, { useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";
import styles from "./styles/dashboard.style";
import { ProfileRow, GameCard } from "../components";
import { getRoomActive } from "../api/RoomApi";

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ProfileRow
        avatarSource={require("../../assets/bg01.png")}
        name={userInfo.name}
        money="100"
        eventIcon="star-outline"
        eventText="Events"
      />
      <View style={styles.containerTask}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="stats-chart" size={34} color="blue" />
          <Text style={styles.text}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="list" size={34} color="red" />
          <Text style={styles.text}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="people-sharp" size={34} color="purple" />
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity
        onPress={async () => {
          const res = await getRoomActive();
          const roomInfo = res.data;

          // if roomInfo is empty, navigate to create room
          if (!roomInfo) {
            navigation.navigate("Room Create");
            return;
          }

          navigation.navigate("Guessing Word", { roomInfo: roomInfo });
        }}
      >
        <GameCard
          colorDark="rgba(0,0,180,0.8)"
          colorLight="rgba(0,0,180,0.5)"
          imagePath={require("../../assets/draw_logo.png")}
          text="Guess My Drawing"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Spy Main")}>
        <GameCard
          colorDark="rgba(0,180,0,0.8)"
          colorLight="rgba(0,180,0,0.5)"
          imagePath={require("../../assets/spy_logo.png")}
          text="Who's the Spy?"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;
