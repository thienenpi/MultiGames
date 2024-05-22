import React from "react";
import { View, Image, Text } from "react-native";
import styles from "../styles/spyGameType.style";

const GameType = ({ backgroundColor, textColor, imageUrl, gametypeName }) => {
  return (
    <View style={styles.gameType(backgroundColor)}>
      <Image source={imageUrl} style={styles.gameTypeImage} />
      <View style={styles.gameName}>
        <Text style={styles.gameTypeName(textColor)}>{gametypeName}</Text>
      </View>
    </View>
  );
};
export default GameType;
