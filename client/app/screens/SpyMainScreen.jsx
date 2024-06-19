import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/spyMain.style";
import { COLORS } from "../constants";
import GameHeader from "../components/spyGame/GameHeader";
import GameType from "../components/spyGame/GameType";

const SpyMainScreen = () => {
  const navigation = useNavigation();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Call your API endpoint to fetch players data
        const response = await fetch("https://api.example.com/players");
        const data = await response.json();

        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching players:", error);
        // Handle error case if needed
      }
    };

    fetchPlayers();
  }, []);

  const handleVote = (index) => {
    // Xử lý khi người dùng nhấn vào nút bầu chọn
    if (!voted) {
      setVoterIndex(index);
      setVoted(true);
    }
  };

  const handleStartGame = () => {
    if (spyIndex === -1 || voterIndex === -1) {
      alert(
        "Vui lòng bầu chọn cho người chơi làm gián điệp và người chơi bầu cho gián điệp!"
      );
    } else {
      navigation.navigate("Spy Game", {
        spyIndex: spyIndex,
        voterIndex: voterIndex,
      });
    }
  };

  const renderPlayerList = () => {
    return players.map((player, index) => (
      <Pressable
        key={player.id}
        style={[
          styles.playerItem,
          index === spyIndex ? styles.spyPlayer : null,
          index === voterIndex ? styles.voterPlayer : null,
        ]}
        onPress={() => handleVote(index)}
      >
        <Text style={styles.playerName}>{player.name}</Text>
      </Pressable>
    ));
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/spy_game_main_background.png")}
        style={styles.background}
      >
        <GameHeader />

        {/* Game option container 1 */}
        <View style={styles.gameOptionContainer("#FCBE4F")}>
          <Text style={styles.gameText}>Ai Là Gián Điệp</Text>
          <ScrollView style={styles.playerListContainer}>
            {renderPlayerList()}
          </ScrollView>
        </View>

        {/* Button containers */}
        <View style={styles.buttonContainers}>
          <Pressable style={styles.containerFindRoom} onPress={handleStartGame}>
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
                Bắt đầu trò chơi
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={styles.containerCreateRoom}
            onPress={navigateToCreateRoom}
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
