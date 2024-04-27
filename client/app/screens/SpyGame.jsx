import React from 'react';
import styles from './styles/spyGame.style';
import { COLORS } from '../constants';
import {
  View,
  TextInput,
  Button,
  Text,
  ImageBackground,
  TouchableHighlight,
  Image,
  Touchable,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Player from '../components/spy_game/Player';
import GradientButton from '../components/spy_game/GradientButton';
import ChatHistory from '../components/spy_game/ChatBox';
const SpyScreen = () => {
  const players = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' },
    { id: 6, name: 'F' },
    { id: 7, name: 'G' },
    { id: 8, name: 'H' },
  ];
  return (
    <SafeAreaView style={{ flexDirection: 'column' }}>
      <ImageBackground source={require('../../assets/background_spygame_image.png')} style={styles.background}>
        <View style={styles.header_cotainer}>
          <TouchableHighlight>
            <Image source={require('../../assets/menu.png')} style={{ width: 32, height: 32 }} />
          </TouchableHighlight>
          <View style={styles.roomBanner}>
            <Text style={styles.roomAddressText}>
              Số phòng VF3346338
            </Text>
            <View style={styles.roomNameContainer}>
              <Text style={styles.roomNameText}>
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
              <Player id={player.id} name={player.name}>
              </Player>
              // <View key={player.id} style={styles.player}>
              //   <Text style={{color: 'white'}}>{player.name}</Text>
              // </View>
            ))}
          </View>
          <View style={styles.centerContainer}>
            <GradientButton gradientColors={COLORS.blueGradient} text={"Sẵng Sàn"}></GradientButton>
            <GradientButton gradientColors={COLORS.yellowGradient} text={"Bắt Đầu"}></GradientButton>
          </View>
          <View style={styles.column}>
            {players.slice(4, 8).map(player => (
              <Player id={player.id} name={player.name} />
            ))}
          </View>
        </View>
        {/* Chat history */}
            <ChatHistory/>
          {/* Placeholder for chat messages */}
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