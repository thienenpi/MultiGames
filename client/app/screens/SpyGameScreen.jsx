import React, { useState, useContext } from 'react';
import styles from './styles/spy.style';
import {
  View,
  TextInput,
  Button,
  Text,
  ImageBackground,
  TouchableHighlight,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
const SpyScreen = () => {
  const players = [
    { id: 1, name: '+' },
    { id: 2, name: '+' },
    { id: 3, name: '+' },
    { id: 4, name: '+' },
    { id: 5, name: '+' },
    { id: 6, name: '+' },
    { id: 7, name: '+' },
    { id: 8, name: '+' },
  ];
  return (
    <SafeAreaView style={{ flexDirection: 'column' }}>
      <ImageBackground source={require('../../assets/background_spygame_image.png')} style={styles.background}>
        <View style={styles.header_cotainer}>
          <TouchableHighlight>
            <Image source={require('../../assets/menu.png')} style={{ width: 32, height: 32 }} />
          </TouchableHighlight>
          <View style={styles.roomBanner}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
              Số phòng VF3346338
            </Text>
            <View style={styles.roomName}>
              <Text style={{ fontSize: 14, color: 'white' }}>
                Phòng VFX1231239897819
              </Text>
            </View>
          </View>
          <TouchableHighlight>
            <Image source={require('../../assets/friend_setting.png')} style={{ width: 40, height: 40 }} />
          </TouchableHighlight>
        </View>
        <View style={styles.playersContainer}>
          {/* Hai cột người chơi */}
          <View style={styles.column}>
            {players.slice(0, 4).map(player => (
              <View key={player.id} style={styles.player}>
                <Text style={{color: 'white'}}>{player.name}</Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 4, justifyContent: 'flex-end', alignItems: 'center', borderRadius: 50, margin: 10 }}>
            <View style={styles.containerReady}>
              <LinearGradient colors={['#6B91FF', '#62C7FF']} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                <Text style={{ color: 'white', fontSize: 18 }}>Sẵng sàng</Text>
              </LinearGradient>
            </View>
            <View style={{height: 20}}></View>
            <View style={styles.containerStart}>
              <LinearGradient colors={['#F3D14F', '#FA972B']} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                <Text style={{ color: 'white', fontSize: 18 }}>Bắt đầu</Text>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.column}>
            {players.slice(4, 8).map(player => (
              <View key={player.id} style={styles.player}>
                <Text style={{color: 'white'}}>{player.name}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Chat history */}
        <View style={styles.chatHistory}>
          {/* Placeholder for chat messages */}
        </View>
        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            multiline
          // onChangeText={...}
          // value={...}
          />
          {/* Send button */}
          <Button title="Send" onPress={() => null} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SpyScreen;