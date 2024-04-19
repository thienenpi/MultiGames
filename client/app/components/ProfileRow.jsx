import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileRow = ({ avatarSource, money, name, eventIcon, eventText }) => {
  
  const handleAvatarPress = () => {
    // Xử lý khi nhấn vào avatar
    console.log("Avatar pressed");
  };

  const handleEventPress = () => {
    // Xử lý khi nhấn vào phần event
    console.log("Event pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable style={styles.avatarContainer} onPress={handleAvatarPress}>
          <Image source={avatarSource} style={styles.avatar} />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Welcome {name}</Text>
          <Pressable style={styles.moneyContainer}>
            <Ionicons name="cash-outline" size={18} style={styles.icon} />
            <Text style={styles.moneyText}>{money}</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.rightContainer} onPress={handleEventPress}>
        <View style={styles.eventContainer}>
          <Ionicons name={eventIcon} size={26} color="pink" />
          <Text style={styles.eventText}>{eventText}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: 'column',
  },
  moneyContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(183, 244, 216, 0.5)',
    marginVertical: 5,
  },
  icon: {
    marginRight: 5,
    color: '#00BB00',
  },
  moneyText: {
    fontSize: 16,
    color: '#00BB00',
  },
  nameText: {
    fontSize: 16,  
    color: '#333333',
  },
  rightContainer: {
    alignItems: 'center',
  },
  eventContainer: {
    alignItems: 'center',
  },
  eventText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default ProfileRow;
