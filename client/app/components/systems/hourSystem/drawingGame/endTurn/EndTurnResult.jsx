import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../../../../constants";
import { HeaderEndTurnResult } from "./HeaderEndTurnResult"

const EndTurnResult = ({ isShow, player, keyword, image, numPlayersCorrect }) => {
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
      <View style={styles.overlay} />
      <View style={styles.modalView}>
        <View style={styles.header}>
          {/* <HeaderEndTurnResult
            player={player}
            keyword={"keyword"}
            numPlayersCorrect={numPlayersCorrect}
          /> */}
        </View>
        <View style={styles.body}>
          <Image
            source={{ uri: image }}
            style={{ flex: 1, resizeMode: "center" }}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart" size={25} color="red" />
          </TouchableOpacity>
        </View>
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
    paddingVertical: 20,
  },

  header: {
    flex: 1,
    height: 150,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.2,
  },

  body: {
    flex: 9,
    width: "100%",
    borderRadius: 10,
  },

  footer: {
    flex: 1,
    height: 70,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.2,
  },

  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    opacity: 0.7,
  },
});
