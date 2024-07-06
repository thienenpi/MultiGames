import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "../../constants";
import RoomCardView from "../roomHistory/RoomCardView";
import CustomButton from "../CustomButton";
import { getAllRoomsActive } from "../../api/index";

const RoomActiveColumn = ({ rooms }) => {
  const renderItem = ({ item }) => {
    return <RoomCardView item={item} isShowRoomsActive={true} ></RoomCardView>;
  };

  return (
    <FlatList
      style={{ width: "100%" }}
      data={rooms}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item)}
      contentContainerStyle={{}}
      scrollEnabled={true}
    ></FlatList>
  );
};

const RoomActiveDialog = ({ isShow, onChangeShow }) => {
  const [show, setShow] = useState(isShow);
  const [rooms, setRooms] = useState([]);

  const fetchRoomsActive = async () => {
    try {
      const res = await getAllRoomsActive();
      if (res.status === 200) {
        setRooms(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    onChangeShow(false);
  };

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  useEffect(() => {
    fetchRoomsActive();
  }, []);

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
          <Text style={styles.headerText}>Activity Rooms</Text>
        </View>

        <View style={styles.body}>
          <RoomActiveColumn rooms={rooms}></RoomActiveColumn>

          <CustomButton
            isValid={true}
            label={"Close"}
            styles={styles}
            onPress={closeModal}
          ></CustomButton>
        </View>
      </View>
    </Modal>
  );
};

export default RoomActiveDialog;

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
    flex: 1,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.2,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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

  body: {
    flex: 9,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },

  footer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.2,
  },

  btnContainer: (backgroundColor) => ({
    width: "40%",
    backgroundColor: backgroundColor,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    color: "white",
    fontWeight: "bold",
  },
});
