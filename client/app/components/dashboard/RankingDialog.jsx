import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants";
import CustomButton from "../CustomButton";
import { getUsers } from "../../api";
import RankUserView from "../systems/ranking/drawing/RankUserView";
import { LinearGradient } from "expo-linear-gradient";

const RankColumns = ({ users }) => {
  const renderItem = ({ item }) => <RankUserView item={item}></RankUserView>;

  return (
    <FlatList
      style={{ width: "100%" }}
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item._id)}
      contentContainerStyle={{ rowGap: SIZES.medium }}
      scrollEnabled={true}
    ></FlatList>
  );
};

const RankingDialog = ({ isShow, onChangeShow }) => {
  const [show, setShow] = useState(isShow);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();

      setUsers(
        res.data
          .sort((a, b) => b.money - a.money)
          .map((item, index) => ({ ...item, rank: index + 1 }))
      );
    };

    fetchUsers();
    setShow(isShow);
  }, []);

  const closeModal = () => {
    setShow(false);
    onChangeShow(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <Pressable style={styles.overlay} onPress={closeModal} />
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ranking</Text>
        </View>
        <View style={styles.body}>
          <RankColumns users={users}></RankColumns>

          <LinearGradient
            colors={COLORS.primaryGradient}
            style={styles.btnContainer()}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <CustomButton
              isValid={true}
              label={"Close"}
              styles={styles}
              onPress={closeModal}
            ></CustomButton>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default RankingDialog;

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
    width: "100%",
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
    width: "40%",
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
