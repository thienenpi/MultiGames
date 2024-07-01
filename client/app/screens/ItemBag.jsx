import React, { useState, useContext, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Modal,
  Alert,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import styles from "./styles/itemBag.style";
import { Item, AppBar } from "../components";
import { getItemById } from "../api/ShopApi";
import { AuthContext } from "../context/AuthContext";

const ItemBag = () => {
  const { userInfo } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;

  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchItemsBag();
    }, [])
  );

  const checkInventoryEmpty = () => {
    return !userInfo.bag || userInfo.bag.length === 0;
  };

  async function fetchItemsBag() {
    try {
      setItems([]);
      if (checkInventoryEmpty()) {
        return;
      }

      for (let itemId of userInfo.bag) {
        const res = await getItemById({ id: itemId });
        console.log("Response:", res.data); // In ra phản hồi để kiểm tra
        if (res && res.status === 200) {
          setItems((prevItems) => [...prevItems, res.data]);
        } else {
          console.error("Failed to fetch item:", res.message || res.error);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch items bag");
    }
  }

  // Trong hàm handleItemPress, set state của modal và lớp phủ thành true
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    setOverlayVisible(true);
  };

  // Thêm hàm để đóng modal và lớp phủ
  const closeModal = () => {
    setModalVisible(false);
    setOverlayVisible(false);
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="My Inventory"
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.separator} />
      <View style={styles.categoryContainer}>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>Drawing Boards</Text>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
      </View>
      {checkInventoryEmpty() &&
        <View style={styles.emptyBag}>
          <Text style={styles.emptyText}>Your bag is empty</Text>
        </View>
      }
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item
            item={item}
            handleItemPress={handleItemPress}
            showPrice={false}
          />
        )}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={{ justifyContent: "flex-start" }}
      />
      {isOverlayVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <Pressable style={styles.overlay} onPress={closeModal}></Pressable>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: selectedItem?.image }}
                  style={{
                    width: screenWidth * 0.8,
                    height: screenWidth * 0.7,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    padding: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {selectedItem?.description}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.button, styles.buttonUse]}>
                <Text style={styles.textStyle}>Sử dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ItemBag;
