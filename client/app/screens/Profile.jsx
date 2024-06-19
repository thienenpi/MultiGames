import { View } from "react-native";
import React from "react";
import styles from "./styles/profile.style";
import { Account, AppBar, OptionRow, Recommendation } from "../components";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const navigation = useNavigation();

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
            title={"Trạng thái của tôi"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={<Ionicons name="rocket-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Thành tích của tôi"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={<Ionicons name="briefcase-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Balo của tôi"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={<Ionicons name="person-add-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Mời bạn bè"}
          ></OptionRow>

          <OptionRow
            onPress={() => {}}
            iconLeft={
              <Ionicons name="help-circle-outline" size={24}></Ionicons>
            }
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Đóng góp"}
          ></OptionRow>

          <OptionRow
            onPress={() => navigation.navigate("Setting")}
            iconLeft={<Ionicons name="settings-outline" size={24}></Ionicons>}
            iconRight={<Ionicons name="chevron-forward" size={24}></Ionicons>}
            title={"Cài đặt"}
          ></OptionRow>
        </View>
      </View>
    </View>
  );
};

export default Profile;
