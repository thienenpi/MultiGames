import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
const EndRoundDialog = ({
  avatar,
  isVisible,
  onClose,
  duration,
  name,
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.modalView}>
        <Text style={styles.gameTile}>Roud result!</Text>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.word}>Player {name} is eliminated.</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EndRoundDialog;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    top: SIZES.height / 3,
    bottom: SIZES.height / 3,
    left: SIZES.width / 20,
    right: SIZES.width / 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
  },

  gameTile: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.brightBlue,
    marginBottom: 10,
  },

  word: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },

  closeButton: {
    backgroundColor: "lightgreen",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  closeButtonText: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});
