import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SIZES } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { getFriends } from "../../services";
import FriendCardView from "../drawing/FriendCardView";
import CustomButton from "../CustomButton";

const FriendsColumn = ({ friends }) => {
  const renderItem = ({ item }) => {
    return <FriendCardView item={item} roomId={null}></FriendCardView>;
  };

  return (
    <FlatList
      style={{ width: "100%" }}
      data={friends}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item)}
      contentContainerStyle={{}}
      scrollEnabled={true}
    ></FlatList>
  );
};

const FriendsDialog = ({ isShow, onChangeShow }) => {
  const [show, setShow] = useState(isShow);
  const [friends, setFriends] = useState([]);

  const { userInfo } = useContext(AuthContext);

  const fetchFriends = async () => {
    try {
      const friends = await getFriends({ id: userInfo._id });

      setFriends(friends);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    onChangeShow(false);
  };

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  useEffect(() => {
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
          <Text style={styles.headerText}>Friends</Text>
        </View>

        <View style={styles.body}>
          <FriendsColumn friends={friends}></FriendsColumn>

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

export default FriendsDialog;

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
