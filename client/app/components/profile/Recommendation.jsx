import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const items = [
  {
    _id: 1,
    name: "Chỉ số",
    imageUrl: "https://multigames.blob.core.windows.net/images/index.png",
    screen: "Index",
  },
  {
    _id: 2,
    name: "Thành tựu",
    imageUrl: "https://multigames.blob.core.windows.net/images/achievement.png",
    screen: "Achievement",
  },
  {
    _id: 3,
    name: "Cửa hàng",
    imageUrl: "https://multigames.blob.core.windows.net/images/shop.png",
    screen: "Shop",
  },
];

const Recommendation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.item}>
          <Image
            source={{
              uri: items[0].imageUrl,
            }}
            style={styles.image}
          ></Image>
          <Text style={styles.text}>{items[0].name}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={styles.item}>
          <Image
            source={{
              uri: items[1].imageUrl,
            }}
            style={styles.image}
          ></Image>
          <Text style={styles.text}>{items[1].name}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(items[2].screen)}>
        <View style={styles.item}>
          <Image
            source={{
              uri: items[2].imageUrl,
            }}
            style={styles.image}
          ></Image>
          <Text style={styles.text}>{items[2].name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Recommendation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: COLORS.disable,
    alignItems: "center",
    justifyContent: "space-around",
  },

  item: {
    height: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  image: {
    width: SIZES.xxLarge * 1.5,
    height: SIZES.xxLarge * 1.5,
  },

  text: {
    fontSize: SIZES.medium,
    fontFamily: "sfProBold",
  },
});
