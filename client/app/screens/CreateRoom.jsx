import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView } from "react-native";
import { AppBar, CustomButton } from "../components";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles/createRoom.style";

const CreateRoom = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title='Create Room'
        onPressLeftIcon={() => navigation.goBack()}
      ></AppBar>
      <View style={styles.body}>
        <CustomButton
          isValid={true}
          icon={
            <View style={styles.btnIcon}>
              <MaterialIcons
                name="door-front"
                size={30}
                color={"white"}
              ></MaterialIcons>
            </View>
          }
          styles={styles}
          label={"Phòng tôi đã từng chơi"}
          onPress={() => {
            navigation.navigate("RoomHistory");
          }}
        ></CustomButton>
      </View>
    </SafeAreaView>

  );
};

export default CreateRoom;
