import React from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../styles/player.style";

const Player = ({
  id,
  name,
  avatar,
  confirmVote,
  isReady,
  description,
  isShowDes,
  isShowVote,
  voteCount = 0,
  isEliminated,
  isBeVoted,
}) => {
  return (
    <View key={id} style={styles.player}>
      <View style={styles.statusDot(isReady)} />
      {isShowDes && (
        <View style={styles.descChat}>
          <Text>{description}</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => confirmVote(id)}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        {isShowVote && (
          <View style={styles.descChat}>
            <Text>Số phiếu: {voteCount}</Text>
          </View>
        )}
        {isEliminated && (
          <View style={styles.eliminated}>
            <Text style={styles.eliminatedText}> Loại </Text>
          </View>
        )}
        {isBeVoted && (
          <View style={styles.voted}>
            <Text style={styles.votedText}> Đã bỏ phiếu! </Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 10 }}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  voteButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Player;
