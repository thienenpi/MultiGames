import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SIZES } from "../../../../constants";

const EndTurnResult = ({ isShow, player, image, keyword }) => {
  const [show, setShow] = useState(isShow);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  useEffect(() => {

  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
    >
      <Pressable style={styles.overlay} />
      <View style={styles.modalView}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {player} guessed the word
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{keyword}</Text>
        {/* <Image
          source={{ uri: image }}
          style={{ flex: 1, resizeMode: "center" }}
        /> */}
      </View>
    </Modal>
  );
};

export default EndTurnResult;

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
    top: SIZES.height / 4,
    bottom: SIZES.height / 4,
    left: SIZES.width / 9,
    right: SIZES.width / 9,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    padding: 20,
  },
});
