import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles/gameCard.style';

const GameCard = ({ colorDark, colorLight, imagePath, text }) => {
  return (
    <View style={styles.outerContainer}>
      <LinearGradient style={styles.innerContainer}
        colors={[colorDark, colorLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.text}>{text}</Text>
        <Image style={styles.icon} source={imagePath} />
      </LinearGradient>
    </View>
  );
};

export default GameCard;