import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/item.style';

const ItemComponent = ({ item, handleItemPress, showPrice }) => {
  console.log(item);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        {showPrice && (
          <View style={styles.priceContainer}>
            <Ionicons name="cash-outline" style={styles.icon} />
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ItemComponent;