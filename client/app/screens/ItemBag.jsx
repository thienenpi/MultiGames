import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, SafeAreaView, Modal, Pressable, TouchableOpacity } from "react-native";
import { Dimensions } from 'react-native';
import styles from './styles/itemBag.style';
import { ItemComponent } from '../components';

const ItemBag = () => {
  const data = [
    { id: 1, image: require('../../assets/bg01.png'), description: "Description 1", price: 200, },
    { id: 2, image: require('../../assets/bg02.png'), description: "Description 2", price: 300, },
    { id: 3, image: require('../../assets/bg03.png'), description: "Description 3", price: 300, },
    { id: 4, image: require('../../assets/bg04.png'), description: "Description 4", price: 500, },
    { id: 5, image: require('../../assets/bg05.png'), description: "Description 5", price: 600, },
    { id: 6, image: require('../../assets/bg06.png'), description: "Description 6", price: 100, },
  ];

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </Pressable>
          <Text style={styles.headerText}>My Inventory</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.categoryContainer}>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>Drawing Boards</Text>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemComponent item={item} handleItemPress={handleItemPress} showPrice={false} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ justifyContent: 'flex-start' }}
      />
      {isOverlayVisible ? <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.overlay} onPress={closeModal}></Pressable>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.itemContainer}>
              <Image source={selectedItem?.image} style={{ width: screenWidth * 0.8, height: screenWidth * 0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
              <View style={{
                flexDirection: "row",
                alignSelf: "center", justifyContent: "space-between", padding: 20,
              }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{selectedItem?.description}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.button, styles.buttonUse]} >
              <Text style={styles.textStyle}>Use</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> : null}
    </SafeAreaView>
  );
};

export default ItemBag;
