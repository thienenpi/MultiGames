import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const CreateRoom = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{ text: "Phòng Board Game", style: { color: "#fff" } }}
        containerStyle={{
          backgroundColor: "#3D6DCC",
          justifyContent: "space-around",
        }}
      />
    </View>
  );
};

export default CreateRoom;
