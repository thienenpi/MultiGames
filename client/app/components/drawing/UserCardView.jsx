import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SIZES } from "../../constants";

const UserCardView = ({ user }) => {
  const { userInfo } = useContext(AuthContext);
  const isMe = userInfo._id === user._id;

  return (
    <View style={styles.userCard}>
      <Image
        key={user._id}
        source={{ uri: user.avatarUrl }}
        style={styles.userImage}
      />
      <Text style={styles.userName}>{isMe ? "Tôi" : user.name}</Text>
    </View>
  );
};

export default UserCardView;

const styles = StyleSheet.create({
  userCard: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userName: {
    fontSize: SIZES.small,
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
});
