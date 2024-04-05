import React, { useEffect, useRef, useState } from 'react';
import { View, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from './styles/whiteBoard.style';
import io from 'socket.io-client';

const socket = io('https://multigames.webpubsub.azure.com', {
  path: '/clients/socketio/hubs/Hub',
});

const WhiteBoard = () => {
  const [paths, setPaths] = useState([]);
  const path = useRef('');

  useEffect(() => {
    // Listen for draw event from server
    socket.on('draw', (newPath) => {
      setPaths((prevPaths) => [...prevPaths, newPath]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        path.current = '';
      },
      onPanResponderMove: (event, gesture) => {
        path.current += `${gesture.moveX},${gesture.moveY} `;
        setPaths((previousPaths) => [...previousPaths, path.current]);
        // Emit draw event to server
        socket.emit('draw', path.current);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        {paths.map((p, index) => (
          <Path
            key={index}
            d={`M${p}`}
            stroke="black"
            strokeWidth={2}
            fill="none"
          />
        ))}
      </Svg>
      <View style={styles.touchArea} {...panResponder.panHandlers} />
    </View>
  );
};

export default WhiteBoard;
