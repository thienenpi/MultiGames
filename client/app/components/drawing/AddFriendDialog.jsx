import React, { useContext, useEffect, useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";
import CustomButton from "../CustomButton";
import { AuthContext } from "../../context/AuthContext";
import { sendFriendRequest } from "../../api/UserApi";
import { checkIfFriend } from "../../services";

const AddFriendDialog = ({ isShow, onChangeShow, keyword, user }) => {
  const { userInfo } = useContext(AuthContext);
  const [isFriend, setIsFriend] = useState(
    checkIfFriend({ id: userInfo._id, friendId: user._id }).then((res) => {
      setIsFriend(res);
    })
  );


  const closeModal = () => {
    onChangeShow(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}></Pressable>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{keyword}</Text>
        </View>
        <View style={styles.body}>
          <Image style={styles.avatar} source={{ uri: user.avatarUrl }}></Image>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          {isFriend ? (
            <View style={styles.frStatusContainer}>
              <Text style={styles.frStatusText}>Bạn bè</Text>
            </View>
          ) : (
            <CustomButton
              styles={styles}
              label={"Kết bạn"}
              isValid={true}
              onPress={async () => {
                await sendFriendRequest({
                  senderId: userInfo._id,
                  recipientId: user._id,
                });
              }}
            ></CustomButton>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddFriendDialog;

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
    bottom: SIZES.height / 2,
    left: SIZES.width / 11,
    right: SIZES.width / 11,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: SIZES.medium,
  },

  header: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  body: {
    flex: 7,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  userInfo: {
    flex: 2,
    paddingLeft: SIZES.medium,
    height: "100%",
  },

  userName: {
    fontSize: 20,
    fontFamily: "sfProBold",
  },

  btnContainer: () => ({
    flex: 1,
    backgroundColor: COLORS.button,
    borderRadius: 99,
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },

  frStatusContainer: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderRadius: 99,
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },

  frStatusText: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },
});
