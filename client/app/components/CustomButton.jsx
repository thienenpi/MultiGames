import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const CustomButton = ({ styles, icon, label, onPress, isValid, isLoading }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer(isValid ? COLORS.button : COLORS.disable)}
      onPress={isValid ? onPress : () => {}}
    >
      {icon}
      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <Text style={styles.btnLabel}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
