import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { AppBar, CustomButton } from "../components";
import styles from "./styles/createRoom.style";
import { MaterialIcons } from "@expo/vector-icons";

const CreateRoom = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppBar style={styles}></AppBar>

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
    </View>
  );
};

export default CreateRoom;
