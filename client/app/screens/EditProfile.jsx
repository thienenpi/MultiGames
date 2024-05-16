import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView } from "react-native";
import styles from "./styles/editProfile.style";
import { HorizontalItem, AppBar } from "../components";

const EditProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppBar
        title="Edit Profile"
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.separator} />
      <HorizontalItem
        title="Avatar"
        isAvt={true}
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Nickname"
        desc="Huynh Phat"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="User ID"
        isIconDesc={true}
        iconDesc="alert-circle"
        colorIconDesc="red"
        desc="Not set"
        colorDesc="red"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="QR Code Contact Card"
        iconRight="qr-code-sharp"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />
      <HorizontalItem
        title="Gender"
        desc="Male"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Birthday"
        desc="24/09/2003"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Region"
        desc="Vietnam"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Signature"
        desc=""
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />
    </View>
  );
};

export default EditProfile;
