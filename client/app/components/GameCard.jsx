import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles/gameCard.style';

const GameCard = ({ color, imagePath, text }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.innerContainer, { backgroundColor: color }]}>
        <Text style={styles.text}>{text}</Text>
        <Image style={styles.icon} source={imagePath} />
      </View>
    </View>
  );
};

export default GameCard;