import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
const ResultDialog = ({ isVisible, onClose, duration, name, identify}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, duration*1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.modalView}>
        <Text style={styles.gameTile}>Kết quả ván vòng đấu!</Text>
        <Text style={styles.title}>Người chơi {name} đã bị loại</Text>
        <Text style={styles.word}>Người chơi {name} là {identify}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Kết thúc</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ResultDialog;

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
    bottom: SIZES.height / 2.6,
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
