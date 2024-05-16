import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import styles from './styles/appbar.style';

const AppBar = ({ title, showRightIcon, rightIconName, rightIconStyle, onPressLeftIcon, onPressRightIcon }) => {
  return (
      <LinearGradient
        style={[styles.header, { paddingTop: Platform.OS === 'android' ? 40 : 60 }]}
        colors={[COLORS.primaryDark, COLORS.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Pressable onPress={onPressLeftIcon}>
            <Ionicons name="arrow-back" style={styles.iconLeft} />
          </Pressable>
          <Text style={styles.headerText}>{title}</Text>
        </View>

        {showRightIcon && (
          <Pressable onPress={onPressRightIcon}>
            <Ionicons name={rightIconName} style={[styles.iconRight, rightIconStyle]} />
          </Pressable>
        )}
      </LinearGradient>
  );
};

export default AppBar;
