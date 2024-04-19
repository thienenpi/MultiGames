import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/horizontalItem.style';

const HorizontalItem = ({ title, index, iconName, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.index}>{index}</Text>
                <Ionicons name={iconName} size={16} color="black" style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
};

export default HorizontalItem;