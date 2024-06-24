import { 
  ImageBackground, 
  Text, 
  TouchableOpacity, 
  View, 
  ToastAndroid, // For Android-specific toast message 
  AlertIOS,     // For iOS-specific alert message 
  Platform      // To handle cross-platform differences 
} from "react-native";
import React from "react";
import styles from "../styles/account.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
// import Clipboard from "@react-native-clipboard/clipboard";

const Account = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleCopyText = (text) => {
    // Clipboard.setString(text);
    console.log(`Đã copy ${text}`);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Đã copy ${text}`,
        ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      AlertIOS.alert(`Đã copy ${text}`);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          //   uri: userInfo.avatarUrl,
          uri: "https://multigames.blob.core.windows.net/images/user.png",
        }}
        style={styles.avatar}
        imageStyle={styles.avatar}
      ></ImageBackground>

      {/* user name & user id */}
      <View style={styles.user}>
        <Text style={styles.userName}>{userInfo.name}</Text>

        <View style={styles.userId}>
          <MaterialCommunityIcons
            name="identifier"
            size={24}
            style={styles.iconId}
          ></MaterialCommunityIcons>
          <Text style={styles.userId}>{userInfo._id}</Text>
          <TouchableOpacity onPress={() => handleCopyText(userInfo._id)}>
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View>

      {/* foward button */}
      <View style={styles.forward}>
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
          <Ionicons name="chevron-forward" size={24}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
