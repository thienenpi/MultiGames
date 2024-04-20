import { Image, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants";

const AppBar = ({ style }) => {
  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primaryLight]}
      style={style.appBar}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    ></LinearGradient>
  );
};

export default AppBar;
