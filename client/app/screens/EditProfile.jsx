import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import styles from "./styles/editProfile.style";
import { HorizontalItem, AppBar, CustomButton } from "../components";
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
    }
  };

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
        iconRight="chevron-forward"
        isCenter={false}
        onPress={() => {
          requestPermission();
          actionSheetRef.current?.setModalVisible(true);
        }}
      />
      <HorizontalItem
        title="Nickname"
        desc="Huynh Phat"
        iconRight="chevron-forward"
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
        iconRight="chevron-forward"
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
        iconRight="chevron-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Birthday"
        desc="24/09/2003"
        iconRight="chevron-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Region"
        desc="Vietnam"
        iconRight="chevron-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Signature"
        desc=""
        iconRight="chevron-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContent}>
          <CustomButton
            label={"Camera"}
            styles={styles}
            isValid={true}
            onPress={pickImageFromCamera}
          ></CustomButton>
          <CustomButton
            label={"Library"}
            styles={styles}
            isValid={true}
            onPress={pickImageFromLibrary}
          ></CustomButton>
          <CustomButton
            label={"Cancel"}
            styles={styles}
            isValid={true}
            onPress={() => actionSheetRef.current?.setModalVisible(false)}
          ></CustomButton>
        </View>
      </ActionSheet>
    </View>
  );
};

export default EditProfile;
