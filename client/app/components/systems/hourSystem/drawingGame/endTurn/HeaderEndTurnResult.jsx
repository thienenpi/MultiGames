import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HeaderEndTurnResult = ({ player, keyword, numPlayersCorrect }) => {
    return (
        <View style={styles.row}>
            <Image
                key={player._id}
                source={{ uri: player.avatarUrl }}
                style={styles.playerImage}
            />
            <View style={styles.column}>
                <Text style={styles.keywordText}>Từ khóa: {keyword}</Text>
                <Text style={styles.playerGuessCorrectText}>{numPlayersCorrect} người đoán đúng</Text>
            </View>
        </View>
    );
};

export default HeaderEndTurnResult;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },

    column: {
        margin: 5,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },

    playerImage: {
        width: 40,
        height: 40,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: "#ccc",
    },

    keywordText: {
        fontSize: 20,
        fontWeight: "bold",
    },

    playerGuessCorrectText: {
        fontSize: 16,
        color: "gray",
        opacity: 0.7,
    },
});