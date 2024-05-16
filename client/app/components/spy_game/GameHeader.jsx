import React from "react";
import styles from "../styles/spyGameHeader.style";
import { View, Image, Text } from "react-native";

const GameHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Image
          source={require("../../../assets/spy_logo.png")}
          style={styles.image}
        />
        <View style={styles.gameNameContainer}>
          <Text style={styles.gameTile("#A8EAF9")}>Ai là</Text>
          <Text style={styles.gameTile("#FECF44")}>Gián Điệp</Text>
        </View>
      </View>
    </View>
  );
};

export default GameHeader;
