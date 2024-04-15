import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, Modal, TouchableOpacity, Pressable } from "react-native";

const Store = () => {
  const data = [
    { id: 1, image: require('../../assets/bg01.png'), description: "Description 1", price: 200, },
    { id: 2, image: require('../../assets/bg02.png'), description: "Description 2", price: 300, },
    { id: 3, image: require('../../assets/bg03.png'), description: "Description 3", price: 300, },
    { id: 4, image: require('../../assets/bg04.png'), description: "Description 4", price: 500, },
    { id: 5, image: require('../../assets/bg05.png'), description: "Description 5", price: 600, },
    { id: 6, image: require('../../assets/bg06.png'), description: "Description 6", price: 100, },
    { id: 7, image: require('../../assets/bg01.png'), description: "Description 1", price: 100, },
    { id: 8, image: require('../../assets/bg02.png'), description: "Description 2", price: 100, },
    { id: 9, image: require('../../assets/bg03.png'), description: "Description 3", price: 100, },
    { id: 10, image: require('../../assets/bg04.png'), description: "Description 4", price: 100, },
    { id: 11, image: require('../../assets/bg05.png'), description: "Description 5", price: 100, },
    { id: 12, image: require('../../assets/bg06.png'), description: "Description 6", price: 100, },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <Ionicons name="cash-outline" style={[styles.icon, { color: 'green', fontSize: 18 }]} />
          <Text style={[styles.balance, { marginLeft: 8 }]}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back" size={22} />
            <Text style={styles.headerText}>Cửa hàng</Text>
          </View>
          <Ionicons name="cart" style={styles.icon} />
        </View>
        <View style={{ height: 0.5, backgroundColor: 'lightgray' }} />
        <View style={{ flexDirection: "row", paddingHorizontal: 8, paddingVertical: 16, justifyContent: 'space-between' }}>
          <Text style={styles.balance}>Số dư tài khoản:</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="cash-outline" style={[styles.icon, { color: 'green', fontSize: 20 }]} />
            <Text style={[styles.balance, { marginLeft: 8 }]}>100</Text>
          </View>
        </View>
        <View style={styles.bannerContainer}>
          <Image source={require('../../assets/store_banner.png')} style={styles.bannerImage} />
        </View>
        <View style={{ height: 10, backgroundColor: 'lightgray', opacity: 0.3, marginTop: 8 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
          <Ionicons name="flower-sharp" size={22} style={{ color: 'pink' }} />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 16 }}>Nền bảng vẽ</Text>
          <Ionicons name="flower-sharp" size={22} style={{ color: 'pink' }} />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
            <View
              style={styles.modalView}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.itemContainer}>
                <Image source={selectedItem?.image} style={[styles.image, {width: 250, height: 250} ]} />
                <Text style={styles.description}>{selectedItem?.description}</Text>
                <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                  <Ionicons name="cash-outline" style={[styles.icon, { color: 'green', fontSize: 18 }]} />
                  <Text style={[styles.balance, { marginLeft: 8 }]}>{selectedItem?.price}</Text>
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Mua</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,

  },
  headerText: {
    fontSize: 20,
    marginLeft: 16,
  },
  icon: {
    fontSize: 24,
    color: '#FFA500',
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    width: "100%",
    textAlign: "left",
    marginBottom: 4,
  },
  balance: {
    fontSize: 14,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 170,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Store;
