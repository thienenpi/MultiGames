import { View } from 'react-native';
import React from 'react';
import styles from './styles/guessingWord.style';
import { WhiteBoard } from '../components';

const GuessingWord = () => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteBoard}>
        <WhiteBoard></WhiteBoard>
      </View>
      <View style={styles.chatBox}></View>
    </View>
  );
};

export default GuessingWord;
