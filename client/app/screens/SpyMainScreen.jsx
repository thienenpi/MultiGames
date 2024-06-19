import React from "react";
import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/spyMain.style";
import { COLORS } from "../constants";
import GameHeader from "../components/spyGame/GameHeader";
import GameType from "../components/spyGame/GameType";

const SpyMainScreen = () => {
  const navigation = useNavigation();

  const handleFindRoom = () => {
    // Xử lý khi người dùng nhấn nút Tìm Phòng
    console.log("Navigate to find room screen");
    // Thêm logic xử lý khác nếu cần
  };

  const handleCreateRoom = () => {
    // Xử lý khi người dùng nhấn nút Tạo Phòng
    console.log("Navigate to create room screen");
    // Thêm logic xử lý khác nếu cần
  };

  const navigateToSpyGame = () => {
    // Xử lý khi người dùng nhấn vào một trong các loại chơi game
    navigation.navigate("Spy Game");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/spy_game_main_background.png")}
        style={styles.background}
      >
        <GameHeader />

        {/* Game option container 1 */}
        <View style={styles.gameOptionContainer("#FCBE4F")}>
          <Text style={styles.gameText}>Ai Là Gián Điệp</Text>
          <View style={styles.gameTypeContainer}>
            <Pressable onPress={navigateToSpyGame}>
              <GameType
                backgroundColor={COLORS.lightOrange}
                textColor={COLORS.orange}
                imageUrl={require("../../assets/micro_images.png")}
                gametypeName={"Chế độ giọng nói"}
              />
            </Pressable>
            <Pressable onPress={navigateToSpyGame}>
              <GameType
                backgroundColor={COLORS.lightOrange}
                textColor={COLORS.orange}
                imageUrl={require("../../assets/pencil_images.png")}
                gametypeName={"Chế độ văn bản"}
              />
            </Pressable>
          </View>
        </View>

        {/* Game option container 2 */}
        <View style={styles.gameOptionContainer("#2CADFE")}>
          <Text style={styles.gameText}>Gián điệp không lời</Text>
          <View style={styles.gameTypeContainer}>
            <Pressable onPress={navigateToSpyGame}>
              <GameType
                backgroundColor={COLORS.brightBlue}
                textColor={COLORS.darkBlue}
                imageUrl={require("../../assets/micro_images.png")}
                gametypeName={"Chế độ giọng nói"}
              />
            </Pressable>
            <Pressable onPress={navigateToSpyGame}>
              <GameType
                backgroundColor={COLORS.brightBlue}
                textColor={COLORS.darkBlue}
                imageUrl={require("../../assets/pencil_images.png")}
                gametypeName={"Chế độ văn bản"}
              />
            </Pressable>
          </View>
        </View>

        {/* Button containers */}
        <View style={styles.buttonContainers}>
          <Pressable style={styles.containerFindRoom} onPress={handleFindRoom}>
            <LinearGradient
              colors={COLORS.blueGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
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
          </Pressable>

          <Pressable
            style={styles.containerCreateRoom}
            onPress={handleCreateRoom}
          >
            <LinearGradient
              colors={COLORS.redGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
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
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SpyMainScreen;
