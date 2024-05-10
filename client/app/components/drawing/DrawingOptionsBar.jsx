import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ColorPicker } from "react-native-status-color-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const colors = [
  "#000000",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
];

const DrawingOptionsBar = ({
  option,
  toggleOptions,
  color,
  onUpdateColor,
  size,
  onUpdateSize,
}) => {
  const onSelection = (color) => {
    onUpdateColor(color);
    toggleOptions(option);
  };

  const handleOptionPress = (selectedOption) => {
    onUpdateSize(selectedOption);
    toggleOptions(option);
  };

  const renderOptionUI = () => {
    switch (option) {
      case 1:
        const renderOption1 = () => {
          const optionButtons = [
            { size: 3 },
            { size: 6 },
            { size: 10 },
            { size: 20 },
            { size: 26 },
            { size: 32 },
          ];

          return optionButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                size === button.size && styles.selectedOptionButton,
              ]}
              onPress={() => handleOptionPress(button.size)}
            >
              <FontAwesome name="circle" size={button.size} color="black" />
            </TouchableOpacity>
          ));
        };

        return <View style={styles.container}>{renderOption1()}</View>;
      case 2:
        const renderOption2 = () => {
          return (
            <View style={styles.container}>
              <ColorPicker
                colors={colors}
                selectedColor={color}
                onSelect={(color) => onSelection(color)}
              />
            </View>
          );
        };
        return <View style={styles.container}>{renderOption2()}</View>;
      case 3:
        const renderOption3 = () => {
          const optionButtons = [
            { size: 3 },
            { size: 6 },
            { size: 10 },
            { size: 20 },
            { size: 26 },
          ];

          return (
            <View style={styles.container}>
              {optionButtons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === button.size &&
                      styles.selectedOptionButton,
                  ]}
                  onPress={() => handleOptionPress(button.size)}
                >
                  <FontAwesome name="circle" size={button.size} color="black" />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => handleOptionPress(null)}
              >
                <Ionicons name="trash-outline" size={24} color="gray" />
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          );
        };

        return renderOption3();
      case 4:
        return <View style={styles.container}></View>;
      default:
        return null;
    }
  };
  return renderOptionUI();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  optionButton: {
    margin: 8,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedOptionButton: {
    borderWidth: 2,
    borderColor: "green",
  },
  clearButton: {
    margin: 8,
    height: 50,
    width: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    color: "gray",
  },
});

export default DrawingOptionsBar;
