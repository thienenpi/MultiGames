import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SIZES } from "../../constants";
import FriendsColumn from "./FriendsColumn";
import { AuthContext } from "../../context/AuthContext";
import { getFriends } from "../../services";
import { getRoomGuests } from "../../api";

const InviteDialog = ({ isShow, roomInfo, onChangeShow }) => {
  const [show, setShow] = useState(isShow);
  const [friends, setFriends] = useState([]);

  const { userInfo } = useContext(AuthContext);

  const closeModal = () => {
    onChangeShow(false);
  };

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const guests = await getRoomGuests({ id: roomInfo._id });
        const guestIds = guests.data;

        let res = await getFriends({ id: userInfo._id });

        // remove friend from list
        res = res.filter((friend) => !guestIds.includes(friend));
        console.log(res);
        setFriends(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriends();
  }, [userInfo]);

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
          <Text style={styles.headerText}>Invite your friends</Text>
        </View>

        <View style={styles.body}>
          <FriendsColumn items={friends} roomId={roomInfo._id}></FriendsColumn>
        </View>

        {/* <View style={styles.footer}></View> */}
      </View>
    </Modal>
  );
};

export default InviteDialog;

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
  },

  footer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.2,
  },
});
