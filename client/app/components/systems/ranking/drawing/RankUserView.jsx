import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { COLORS, SIZES } from "../../../../constants";
import CustomButton from "../../../CustomButton";
import { sendFriendRequest } from "../../../../api/UserApi";
import { AuthContext } from "../../../../context/AuthContext";
import { checkIfFriend } from "../../../../services";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const RankUserView = ({ item }) => {
  const { userInfo } = useContext(AuthContext);
  const isMe = userInfo._id === item._id;
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchFriendStatus = async () => {
      setIsFriend(
        await checkIfFriend({
          id: userInfo._id,
          friendId: item._id,
        })
      );
    };

    fetchFriendStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rank}>
        <Text>{item.rank}</Text>
      </View>
      <View style={styles.avatar}>
        <Image style={styles.avatar} source={{ uri: item.avatarUrl }}></Image>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>

        {item.score ? (
          <Text style={styles.expGain}>Final score: {item.score}</Text>
        ) : (
          <Text style={styles.expGain}>{item.money} $</Text>
        )}
      </View>

      {!isMe ? (
        <View style={styles.addFriend}>
          {isFriend ? (
            <LinearGradient
              colors={COLORS.blueGradient}
              style={styles.frStatusContainer}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
            >
              <View style={styles.frStatusContainer}>
                <Text style={styles.frStatusText}>Friend</Text>
              </View>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={COLORS.primaryGradient}
              style={styles.btnContainer()}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
            >
              <CustomButton
                styles={styles}
                label={"Add"}
                isValid={true}
                onPress={async () => {
                  await sendFriendRequest({
                    senderId: userInfo._id,
                    recipientId: user._id,
                  });
                }}
              ></CustomButton>
            </LinearGradient>
          )}
        </View>
      ) : (
        <View style={styles.addFriend}></View>
      )}
    </View>
  );
};

export default RankUserView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.small,
    alignItems: "center",
    width: "100%",
    height: 70,
    borderRadius: 10,
  },

  rank: {
    flex: 1,
    borderRadius: 99,
    borderWidth: 1,
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
  },

  userInfo: {
    flex: 4,
    flexDirection: "column",
    height: "80%",
    justifyContent: "space-around",
  },

  userName: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: COLORS.text,
  },

  expGain: {
    fontFamily: "sfPro",
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.orange,
  },

  subExpGain: {
    fontFamily: "sfPro",
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.orange,
  },

  addFriend: {
    flex: 2,
    textAlign: "center",
    justifyContent: "center",
  },

  btnContainer: () => ({
    padding: 5,
    width: "100%",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },

  frStatusContainer: {
    padding: 5,
    width: "100%",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },

  frStatusText: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },
});
