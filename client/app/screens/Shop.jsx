import React, { useState, useContext, useCallback, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { View, Text, Image, FlatList, Modal, Pressable, TouchableOpacity } from "react-native";
import { Dimensions } from 'react-native';
import styles from './styles/shop.style';
import { Item, AppBar } from '../components';
import { getAllItems } from "../api/ShopApi";

const Shop = () => {
  const { userInfo, fetchUserInfo, updateInfo } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
        fetchUserInfo(userInfo._id);
        fetchItems();
    }, [])
  );

  async function fetchItems() {
    try {
      const res = await getAllItems();
      if (res.status === 200) {
        setItems(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;

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

  const handleDeductMoney = (money) => {
    userInfo.money -= money;
  }

  const handleAddItemIntoBag = (itemId) => {
    userInfo.bag.push(itemId);
  }

  const isBought = (itemId) => {
    return userInfo.bag.includes(itemId);
  }

  const handleBuyItem = () => {
    if (isBought(selectedItem._id)) {
      return alert('Item already bought');
    }
    
    if (userInfo.money >= selectedItem.price) {
      // Deduct money
      handleDeductMoney(selectedItem.price);
      // Add item into bag
      handleAddItemIntoBag(selectedItem._id);
      // Update user info
      updateInfo({ id: userInfo._id, data: userInfo });
      // Close modal
      alert('Item bought successfully');
      closeModal();
    } else {
      alert('Not enough money');
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="Shop"
        rightIconName="cart"
        showRightIcon={true}
        rightIconStyle={{ fontSize: 24 }}
        onPressLeftIcon={() => navigation.goBack()}
        onPressRightIcon={() => navigation.navigate('Item Bag')} />
      <View style={styles.separator} />
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance:</Text>
        <View style={styles.balanceContent}>
          <Ionicons name="cash-outline" style={styles.icon} />
          <Text style={styles.balanceAmount}>{userInfo.money}</Text>
        </View>
      </View>
      <View style={styles.bannerContainer}>
        <Image source={require('../../assets/store_banner.png')} style={styles.bannerImage} />
      </View>
      <View style={styles.separator} />
      <View style={styles.categoryContainer}>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>Drawing Boards</Text>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item item={item} handleItemPress={handleItemPress} showPrice={true} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={{ justifyContent: 'flex-start' }}
      />
      {isOverlayVisible && <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.overlay} onPress={closeModal}></Pressable>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.itemContainer}>
              <Image source={ { uri: selectedItem?.image }} style={{ width: screenWidth * 0.8, height: screenWidth * 0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
              <View style={{
                flexDirection: "row",
                alignSelf: "stretch", justifyContent: "space-between", padding: 20,
              }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{selectedItem?.description}</Text>
                <View style={styles.priceContainer}>
                  <Ionicons name="cash-outline" style={styles.icon} />
                  <Text style={styles.price}>{selectedItem?.price}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={[styles.button, styles.buttonBuy]} onPress={handleBuyItem}>
              <Text style={styles.textStyle}>{isBought(selectedItem._id) ? 'Đã mua' : 'Mua'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>}
    </View>
  );
};

export default Shop;
