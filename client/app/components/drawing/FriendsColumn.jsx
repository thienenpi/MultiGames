import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants";
import FriendCardView from "./FriendCardView";

const FriendsColumn = ({ items, roomId }) => {

  const renderItem = ({ item }) => (
    <FriendCardView item={item} roomId={roomId}></FriendCardView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item)}
        contentContainerStyle={{ rowGap: SIZES.medium }}
        scrollEnabled={false}
      ></FlatList>
    </View>
  );
};

export default FriendsColumn;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
  },
});
