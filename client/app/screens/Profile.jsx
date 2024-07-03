import { View } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import styles from "./styles/profile.style";
import { Account, AppBar, OptionRow, Recommendation } from "../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const navigation = useNavigation();
  const { fetchUserInfo, userInfo } = useContext(AuthContext);

    useFocusEffect(
      useCallback(() => {
        fetchUserInfo(userInfo._id);
      }, [])
    );

  return (
    <View style={styles.container}>
      <AppBar
        showLeftIcon={false}
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>

      <View style={styles.header}>
        <Account></Account>
      </View>

      <View style={styles.body}>
        <Recommendation></Recommendation>

        <View style={styles.options}>
          <OptionRow
            onPress={() => {}}
            iconLeft={
              <Ionicons name="information-circle-outline" size={24}></Ionicons>
            }
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"My Moments"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={<Ionicons name="rocket-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"My Stats"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={<Ionicons name="briefcase-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"My Inventory"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={<Ionicons name="person-add-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Invite Friends"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={
              <Ionicons name="help-circle-outline" size={24}></Ionicons>
            }
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Contributions"}
          ></OptionRow>

          <OptionRow
            onPress={() => navigation.navigate("Setting")}
            iconLeft={<Ionicons name="settings-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Settings"}
          ></OptionRow>
        </View>
      </View>
    </View>
  );
};

export default Profile;
