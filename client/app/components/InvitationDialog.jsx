import { StyleSheet, Text, View, Modal, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import CustomButton from "./CustomButton";
import { getRoom } from "../api";
import { useNavigation } from "@react-navigation/native";
import { joinRoom } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InvitationDialog = ({ inviteRoom, visible, onChangeVisible }) => {
  const navigation = useNavigation();
  const [roomInfo, setRoomInfo] = useState({});

  useEffect(() => {
    if (!inviteRoom) return;
    const fetchRoomInfo = async () => {
      const res = await getRoom({ id: inviteRoom });

      if (res.status !== 200) {
        Alert.alert("Error", "Cannot get room info");
        return;
      }

      const roomInfo = res.data;
      setRoomInfo(roomInfo);
    };

    fetchRoomInfo();
  }, [inviteRoom]);

  const handleAcceptInvitation = async () => {
    try {
      var userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      const res = await joinRoom({ roomId: inviteRoom, userId: userInfo._id });
      onChangeVisible();

      if (res && res.status === "playing") {
        Alert.alert("Can not join", "The game has started");
        return;
      }

    //   console.log(roomInfo.mode)
      if (roomInfo.mode.toLowerCase().includes("vẽ")) {
        navigation.navigate("Guessing Word", { roomInfo: roomInfo });
      } else {
        navigation.navigate("Spy Game", { roomInfo: roomInfo });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onChangeVisible}
      animationType="slide"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.invitationInfo}>
            <View style={styles.avatar}>
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://multigames.blob.core.windows.net/images/user.png",
                }}
              ></Image>
            </View>
            <View style={styles.roomInfo}>
              <Text style={styles.modalText}>
                Invite you to {roomInfo.name}
              </Text>
              <Text style={styles.gameMode}>{roomInfo.mode}</Text>
            </View>
          </View>
          <View style={styles.action}>
            <CustomButton
              styles={buttonAccept}
              label={"Accept"}
              isValid={true}
              onPress={handleAcceptInvitation}
            ></CustomButton>
            <CustomButton
              styles={buttonDecline}
              label={"Deny"}
              isValid={true}
              onPress={onChangeVisible}
            ></CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvitationDialog;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },

  modalView: {
    flexDirection: "row",
    marginVertical: SIZES.xxLarge,
    marginHorizontal: SIZES.large,
    backgroundColor: "white",
    borderRadius: SIZES.large,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  roomInfo: {
    flexDirection: "column",
  },

  invitationInfo: {
    flex: 7,
    flexDirection: "row",
    gap: SIZES.small,
  },

  action: {
    flex: 3,
    flexDirection: "column",
    gap: SIZES.xSmall,
  },

  modalText: {
    marginBottom: 15,
  },

  gameMode: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "bold",
  },

  btnContainer: () => ({
    alignItems: "center",
    padding: SIZES.small,
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.xLarge,
  }),

  btnLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

const buttonAccept = StyleSheet.create({
  btnContainer: () => ({
    alignItems: "center",
    padding: SIZES.small,
    backgroundColor: COLORS.green,
    borderRadius: SIZES.xLarge,
  }),

  btnLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

const buttonDecline = StyleSheet.create({
  btnContainer: () => ({
    alignItems: "center",
    padding: SIZES.small,
    backgroundColor: COLORS.darkBlue,
    borderRadius: SIZES.xLarge,
  }),

  btnLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
