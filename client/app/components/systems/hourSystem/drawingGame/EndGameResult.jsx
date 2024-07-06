import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";
import RankColumns from "../../ranking/drawing/RankColumns";
import CustomButton from "../../../CustomButton";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const EndGameResult = ({ isShow, keyword, items }) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(isShow);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={styles.overlay} />
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{keyword}</Text>
        </View>
        <View style={styles.body}>
          <RankColumns items={items}></RankColumns>

          <LinearGradient
            colors={COLORS.blueGradient}
            style={{
              flexDirection: "row",
              width: "30%",
              borderRadius: 10,
              position: "absolute",
              bottom: 10,
            }}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <CustomButton
              isValid={true}
              label={"Leave"}
              styles={styles}
              onPress={() => navigation.navigate("Dashboard")}
            ></CustomButton>
          </LinearGradient>
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
    alignItems: "center",
  },

  btnContainer: (backgroundColor) => ({
    width: "100%",
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    color: "white",
    fontWeight: "bold",
  },
});
