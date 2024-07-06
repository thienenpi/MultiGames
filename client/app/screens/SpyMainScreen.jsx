import React, { useContext } from "react";
import styles from "./styles/spyMain.style";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { COLORS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import GameHeader from "../components/spyGame/GameHeader";
import GameType from "../components/spyGame/GameType";
import { useNavigation } from "@react-navigation/native";
import { accessRoom, joinRoom } from "../services";
import { AuthContext } from "../context/AuthContext";

const SpyMainScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const handleAccessRoom = async () => {
    const data = {
      gameMode: "Ai Là Gián Điệp - Chế độ giọng nói",
    };
    var roomInfo = await accessRoom({ data: data });
    if (!roomInfo) {
      navigation.navigate("Room Create");
      return;
    }

    const res = await joinRoom({ roomId: roomInfo._id, userId: userInfo._id });

    if (res && res.status === "playing") {
      Alert.alert("Can not join", "The game has started.");
      return;
    }

    navigation.navigate("Spy Game", { roomInfo: roomInfo });
  };
  return (
    <View style={{ flexDirection: "column" }}>
      <ImageBackground
        source={require("../../assets/spy_game_main_background.png")}
        style={styles.background}
      >
        <GameHeader />
        <View style={styles.gameOptionContainer("#FCBE4F")}>
          <Text style={styles.gameText}> Ai Là Gián Điệp</Text>
          <View style={styles.gameTypeContainer}>
            <Pressable onPress={handleAccessRoom}>
              <GameType
                backgroundColor={COLORS.lightOrange}
                textColor={COLORS.orange}
                imageUrl={require("../../assets/micro_images.png")}
                gametypeName={"Chế độ giọng nói"}
              ></GameType>
            </Pressable>
            <Pressable onPress={handleAccessRoom}>
              <GameType
                backgroundColor={COLORS.lightOrange}
                textColor={COLORS.orange}
                imageUrl={require("../../assets/pencil_images.png")}
                gametypeName={"Chế độ văn bản"}
              ></GameType>
            </Pressable>
          </View>
        </View>
        <View style={styles.gameOptionContainer("#2CADFE")}>
          <Text style={styles.gameText}> Gián điệp không lời</Text>
          <View style={styles.gameTypeContainer}>
            <Pressable onPress={handleAccessRoom}>
              <GameType
                backgroundColor={COLORS.brightBlue}
                textColor={COLORS.darkBlue}
                imageUrl={require("../../assets/micro_images.png")}
                gametypeName={"Chế độ giọng nói"}
              ></GameType>
            </Pressable>
            <Pressable onPress={handleAccessRoom}>
              <GameType
                backgroundColor={COLORS.brightBlue}
                textColor={COLORS.darkBlue}
                imageUrl={require("../../assets/pencil_images.png")}
                gametypeName={"Chế độ văn bản"}
              ></GameType>
            </Pressable>
          </View>
        </View>
        <View style={styles.buttonContainers}>
          <View style={styles.containerFindRoom}>
            <LinearGradient
              colors={COLORS.blueGradient}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Image
                source={require("../../assets/find_icon.png")}
                style={{ flex: 1, resizeMode: "center" }}
              />
              <Text style={{ flex: 2, color: "white", fontSize: 18 }}>
                Tìm phòng
              </Text>
            </LinearGradient>
          </View>
          <View style={styles.containerCreateRoom}>
            <LinearGradient
              colors={COLORS.redGradient}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Image
                source={require("../../assets/create_icon.png")}
                style={{ flex: 1, resizeMode: "center" }}
              />
              <Text style={{ flex: 2, color: "white", fontSize: 18 }}>
                Tạo Phòng
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default SpyMainScreen;
