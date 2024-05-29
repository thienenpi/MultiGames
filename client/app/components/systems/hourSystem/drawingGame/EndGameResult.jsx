import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SIZES } from "../../../../constants";
import RankColumns from "../../ranking/drawing/RankColumns";

const EndGameResult = ({ isShow, keyword, items }) => {
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
      <Pressable style={styles.overlay} onPress={closeModal}></Pressable>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{keyword}</Text>
        </View>
        <View style={styles.body}>
          <RankColumns items={items}></RankColumns>
        </View>
      </View>
    </Modal>
  );
};

export default EndGameResult;

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
    top: SIZES.height / 5,
    bottom: SIZES.height / 5,
    left: SIZES.width / 11,
    right: SIZES.width / 11,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  body: {
    flex: 9,
    width: "100%",
    borderRadius: 10,
  },
});
