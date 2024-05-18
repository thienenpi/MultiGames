import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/gradientButton.style";
const GradientButton = ({ gradientColors, text }) => {
    return (
        <TouchableOpacity style={styles.containerButton} >
            <LinearGradient colors={gradientColors} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                <Text style={styles.buttonText}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
export default GradientButton;