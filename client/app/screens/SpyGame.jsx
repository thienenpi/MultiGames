import React, { useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/spyGame.style";

const SpyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players.players);
  const roomNumber = useSelector((state) => state.room.roomNumber);
  const roomName = useSelector((state) => state.room.roomName);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchRoomInfo());
  }, []);

  const handleReady = () => {
    // Xử lý khi người dùng nhấn nút Sẵn sàng
    console.log("Sẵn sàng pressed");
    // Thêm logic xử lý khác nếu cần
  };

  const handleStart = () => {
    // Xử lý khi người dùng nhấn nút Bắt đầu
    console.log("Bắt đầu pressed");
    // Thêm logic xử lý khác nếu cần
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/background_spygame_image.png")}
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <Pressable>
            <Image
              source={require("../../assets/menu.png")}
              style={styles.menuIcon}
            />
          </Pressable>
          <View style={styles.roomBanner}>
            <Text style={styles.roomNumber}>Số phòng {roomNumber}</Text>
            <Text style={styles.roomName}>Phòng {roomName}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate("Room Config")}>
            <Image
              source={require("../../assets/friend_setting.png")}
              style={styles.settingIcon}
            />
          </Pressable>
        </View>

        <View style={styles.playersContainer}>
          {/* Column 1 */}
          <View style={styles.column}>
            {players.slice(0, 4).map((player) => (
              <View key={player.id} style={styles.player}>
                <Text style={styles.playerText}>{player.name}</Text>
              </View>
            ))}
          </View>

          {/* Center column */}
          <View style={styles.centerColumn}>
            <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
              <LinearGradient
                colors={["#6B91FF", "#62C7FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Sẵn sàng</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <LinearGradient
                colors={["#F3D14F", "#FA972B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Bắt đầu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Column 2 */}
          <View style={styles.column}>
            {players.slice(4, 8).map((player) => (
              <View key={player.id} style={styles.player}>
                <Text style={styles.playerText}>{player.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Chat history */}
        <View style={styles.chatHistory}>
          {/* Placeholder for chat messages */}
        </View>

        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            multiline
          />
          <Button title="Gửi" onPress={() => null} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SpyScreen;
