import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const Player = ({ id, name, onVote }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleVote = () => {
    onVote(id);
    setShowDialog(false);
  };

  return (
    <View style={styles.playerContainer}>
      <TouchableOpacity onPress={() => setShowDialog(true)}>
        <Text>{name}</Text>
      </TouchableOpacity>
      <Modal visible={showDialog} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Vote cho {name}</Text>
            <TouchableOpacity onPress={handleVote} style={styles.voteButton}>
              <Text style={{ color: "white" }}>Vote</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDialog(false)}
              style={styles.cancelButton}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
