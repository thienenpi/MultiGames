import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";

const CustomTimer = ({ controller }) => {
  const [timer, setTimer] = useState(controller.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          controller.setNextStatusAndTime();
          return controller.getTime();
        }
        controller.timeDown();
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [controller]);

  return <Text style={styles.timer}>{timer}</Text>;
};

const styles = StyleSheet.create({
  timer: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    height: 35,
    textAlignVertical: "center",
  },
});

export default CustomTimer;