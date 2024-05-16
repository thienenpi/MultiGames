import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants";

const OptionRow = ({ title, iconLeft, iconRight, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconLeft}>{iconLeft}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconRight}>{iconRight}</View>
    </TouchableOpacity>
  );
};

export default OptionRow;

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: SIZES.medium,
  },

  iconLeft: {
    flex: 2,
    alignItems: "center"
  },

  title: {
    flex: 10,
    fontSize: SIZES.medium,
  },

  iconRight: {
    flex: 1,
    alignItems: "center",
  },
});
