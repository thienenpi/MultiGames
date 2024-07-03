import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SIZES } from "../../../../constants";

const KeywordSelection = ({ isShow, keywordList, onKeywordSelect }) => {
  const [show, setShow] = useState(isShow);
  const [randomKeyword, setRandomKeyword] = useState([]);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  useEffect(() => {
    if (keywordList.length > 0 && randomKeyword.length === 0) {
      const keywordSet = new Set();

      while (keywordSet.size < 4 && keywordSet.size < keywordList.length) {
        const randomWord =
          keywordList[Math.floor(Math.random() * keywordList.length)];
        keywordSet.add(randomWord);
      }
      setRandomKeyword(Array.from(keywordSet));
    }
  }, [keywordList]);

  const handleKeywordPress = (keyword) => {
    onKeywordSelect(keyword);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <Pressable style={styles.overlay} />
      <View style={styles.modalView}>
        <Text style={styles.title}>Please choose the keyword</Text>
        <FlatList
          data={randomKeyword}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleKeywordPress(item)}
            >
              <Text style={styles.keyword}>{item.keyword}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default KeywordSelection;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    top: SIZES.height / 3,
    bottom: SIZES.height / 2.6,
    left: SIZES.width / 20,
    right: SIZES.width / 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    height: 55,
    width: "45%",
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: "lightgreen",
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },

  keyword: {
    fontSize: 16,
    color: "green",
  },
});
