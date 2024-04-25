import { View } from "react-native";
import React, { useContext } from "react";
import styles from "./styles/profile.style";
import { CustomButton } from "../components";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <CustomButton
          styles={styles}
          label={"Sign Out"}
          isValid={true}
          onPress={() => {
            logout();
          }}
        ></CustomButton>
      </View>
    </View>
  );
};

export default Profile;
