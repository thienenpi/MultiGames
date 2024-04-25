import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import RoomCardView from "./RoomCardView";
import { COLORS, SIZES } from "../../constants";

const renderItem = ({ item }) => <RoomCardView item={item}></RoomCardView>;

const RoomColumn = ({ items }) => {
  return (
    <View style={styles.container}>
      {!items.length ? (
        <Text style={styles.notiText}>
          No rooms to show. Let's create a room ^.^
        </Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
        ></FlatList>
      )}
    </View>
  );
};

export default RoomColumn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.button
  },

  notiText: {
    color: COLORS.text,
    fontFamily: "sfProBold",
  },
});
