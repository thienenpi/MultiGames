import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import RankUserView from "./RankUserView";
import { SIZES } from "../../../../constants";

const renderItem = ({ item }) => <RankUserView isInGame={true} item={item}></RankUserView>;

const RankColumns = ({ items }) => {
  const rankedItems = items
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <View style={styles.container}>
      <FlatList
        data={rankedItems}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item._id)}
        contentContainerStyle={{ rowGap: SIZES.medium }}
        scrollEnabled={true}
      ></FlatList>
    </View>
  );
};

export default RankColumns;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
  },
});
