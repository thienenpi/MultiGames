import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";
import React from "react";
import MessageCardView from "./MessageCardView";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
// const renderItem = ({ item }) => (
//   <MessageCardView item={item}></MessageCardView>
// );

const MessageColumn = ({ items }) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate("Friend Chat", {item});
  };

  const renderItem = ({ item }) => (
   <MessageCardView item={item} onPress={() => handlePress(item)} />
  );
  return (
    <View style={styles.container}>
      {!items.length ? (
        <Text style={styles.notiText}>
          No messages to show. Let's start a conversation ^.^
        </Text>
      ) :(
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
          contentContainerStyle={{ rowGap: SIZES.medium }}
        ></FlatList>
      )}
    </View>
  );
};

export default MessageColumn;

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
