import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { spySocket } from '../../utils/config';
import styles from '../styles/gameTimer.style';

const GameTimer = ({gameTime, isStart}) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameTime > 0 && isStart) {
        gameTime--;
        setTimer(gameTime)
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  }, [gameTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Image source={require("../../../assets/alarm-clock.png")} style={{resizeMode: "contain", height: 15, width: 15,}}/>
      <Text style={styles.timerText}>{formatTime(timer)}</Text>
    </View>
  );
};

export default GameTimer;
