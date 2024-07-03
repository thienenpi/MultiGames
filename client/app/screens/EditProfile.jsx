import React, { useContext, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  Modal,
  View,
  ScrollView,
} from "react-native";
import styles from "./styles/editProfile.style";
import { HorizontalItem, AppBar, CustomButton } from "../components";
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { updateAvatar } from "../api/UserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef();
  const selectedImage = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchUserInfo, userInfo, setUserInfo } = useContext(AuthContext);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need media library permissions to make this work!",
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", onPress: () => {} },
        ]
      );
    } else {
    }

    return status;
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera permissions to make this work!",
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          {
            text: "Cancel",
            onPress: () => {},
          },
        ]
      );
    } else {
    }

    return status;
  };

  const pickImageFromLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        selectedImage.current = result.assets[0].uri;
      } else {
        console.log("Image picking cancelled");
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const pickImageFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        selectedImage.current = result.assets[0].uri;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    setIsModalVisible(true);
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    // console.log(selectedImage.current);
    const res = await updateAvatar({
      userId: userInfo._id,
      uri: selectedImage.current,
    });
    // console.log(res.data);
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      avatarUrl: res.data.avatarUrl,
    }));
    setUploading(false);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="Edit Profile"
        onPressLeftIcon={() => navigation.goBack()}
      />

      <View style={styles.separator} />

      <ScrollView>
        <HorizontalItem
          title="Avatar"
          isAvt={true}
          iconRight="chevron-forward"
          isCenter={false}
          onPress={() => actionSheetRef.current?.setModalVisible(true)}
        />

        <HorizontalItem
          title="Nickname"
          desc={userInfo.name}
          iconRight="chevron-forward"
          isCenter={false}
          onPress={() => {}}
        />

        <HorizontalItem
          title="User ID"
          isIconDesc={userInfo._id !== "" ? false : true}
          iconDesc="alert-circle"
          colorIconDesc="red"
          desc={userInfo._id !== "" ? userInfo._id : "Not set"}
          colorDesc={userInfo._id !== "" ? "black" : "red"}
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
          isIconDesc={userInfo.birth !== null ? false : true}
          iconDesc="alert-circle"
          colorIconDesc="red"
          desc={userInfo.birth !== null ? userInfo.birth : "Not set"}
          colorDesc={userInfo.birth !== null ? "black" : "red"}
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
      </ScrollView>

      <ActionSheet ref={actionSheetRef}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={uploading}
                size="large"
                color="#0000ff"
              />
            </View>
          </View>
        </Modal>
        <View style={styles.actionSheetContent}>
          <CustomButton
            label={"Camera"}
            styles={styles}
            isValid={true}
            onPress={() => {
              requestCameraPermission().then(async (status) => {
                if (status === "granted") {
                  await pickImageFromCamera();
                  if (selectedImage.current !== null) {
                    await uploadImage();
                    await fetchUserInfo(userInfo._id);
                  }
                  actionSheetRef.current?.setModalVisible(false);
                }
              });
            }}
          ></CustomButton>

          <CustomButton
            label={"Library"}
            styles={styles}
            isValid={true}
            onPress={async () => {
              requestMediaLibraryPermission().then(async (status) => {
                if (status === "granted") {
                  await pickImageFromLibrary();
                  if (selectedImage.current !== null) {
                    await uploadImage();
                    await fetchUserInfo(userInfo._id);
                  }
                  actionSheetRef.current?.setModalVisible(false);
                }
              });
            }}
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
