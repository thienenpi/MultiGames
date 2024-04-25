import React, { useEffect, useRef, useState } from "react";
import { View, PanResponder } from "react-native";
import Svg, { Path } from "react-native-svg";
import styles from "./styles/whiteBoard.style";
import io from "socket.io-client";
import { BASE_URL } from "../utils/config";

const socket = io(BASE_URL.slice(0, -4), {
  path: "/api/whiteBoard/",
});

const WhiteBoard = () => {
  const [paths, setPaths] = useState([]);
  const path = useRef("");
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        path.current = "";
      },
      onPanResponderMove: (event, gesture) => {
        //-60 để vị trí người dùng chạm vào trùng với vị trí của mà màn hình bị trừ xuống
        path.current += `${gesture.moveX},${gesture.moveY-60} `;
        setPaths((previousPaths) => [...previousPaths, path.current]);
        // Emit draw event to server
        socket.emit("draw", path.current);
      },
    })
  ).current;

  useEffect(() => {
    // Listen for draw event from server
    socket.on("draw", (newPath) => {
      setPaths((prevPaths) => [...prevPaths, newPath]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
