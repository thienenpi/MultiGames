import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/horizontalItem.style';

const HorizontalItem = ({ title, index, iconName, onPress, isCenter }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={isCenter ? styles.centeredTitleContainer : styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {!isCenter && <View style={styles.infoContainer}>
                    <Text style={styles.index}>{index}</Text>
                    <Ionicons name={iconName} size={16} color="black" style={styles.icon} />
                </View>}

            </View>
        </TouchableOpacity>
    );
};

export default HorizontalItem;