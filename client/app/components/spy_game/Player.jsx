import React from "react";
import { View, Image, Text } from "react-native";
import styles from "../styles/player.style";

const Player = ({ id, name }) => {
    return (
        <View key = {id} style={styles.playerCotainer}>
            <View style={styles.statusIndicator} />
            <Image style={styles.playerAvatar} source={require('../../../assets/create_icon.png')} />
            <Text style={styles.playerName}>{name}</Text>
        </View>
    );
};
export default Player;