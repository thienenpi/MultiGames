import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../../../constants";

const EndTurnResult = ({
  isShow,
  player,
  keyword,
  image,
  numPlayersCorrect,
}) => {
  const [show, setShow] = useState(isShow);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}/>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Image
              key={player._id}
              source={{ uri: player.avatarUrl }}
              style={styles.playerImage}
            />
            <View style={styles.column}>
              <Text style={styles.keywordText}>Keyword: {keyword}</Text>
              <Text style={styles.playerGuessCorrectText}>
                {numPlayersCorrect} users guessed correctly
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ flex: 1, resizeMode: "center" }}
            />
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart" size={25} color="red" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>0 loves</Text>
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
    paddingTop: 15,
    paddingBottom: 10,
  },

  header: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

  body: {
    flex: 8,
    width: "100%",
    borderRadius: 10,
  },

  footer: {
    flex: 1,
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.2,
    paddingTop: 10,
  },

  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightcoral",
    opacity: 0.6,
  },
});
