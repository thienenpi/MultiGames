import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { COLORS, SIZES } from "../../constants";

const UserCardView = ({ user, isOut }) => {
  const { userInfo } = useContext(AuthContext);
  const isMe = userInfo._id === user._id;

  return (
    <View style={styles.userCard}>
      <View style={styles.imageContainer}>
        <Image
          key={user._id}
          source={{ uri: user.avatarUrl }}
          style={styles.userImage}
        />
        {isOut && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Out</Text>
          </View>
        )}
      </View>
      <Text style={styles.userName}>{isMe ? "Me" : user.name}</Text>
    </View>
  );
};

export default UserCardView;

const styles = StyleSheet.create({
  userCard: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },

  imageContainer: {
    position: "relative",
  },

  userName: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: COLORS.white,
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(128, 128, 128, 0.7)", // semi-transparent gray color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  overlayText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: "sfProBold",
  },
});
