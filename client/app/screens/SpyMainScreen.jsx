import React, { useState, useContext } from 'react';
import styles from './styles/spyMain.style'
import {
    View,
    TextInput,
    Button,
    Text,
    ImageBackground,
    Image,
    Touchable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const SpyMainScreen = () => {
    return (
        <SafeAreaView style={{ flexDirection: 'column' }}>
            <ImageBackground source={require('../../assets/spy_game_main_background.png')} style={styles.background}>
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <Image source={require('../../assets/spy_logo.png')} style={{ flex: 1, height: 100, width: 100 }} />
                        <View style={styles.gameNameContainer}>
                            <Text style={{ fontSize: 30, color: '#A8EAF9', fontWeight: 'bold' }}>Ai là</Text>
                            <Text style={{ fontSize: 30, color: '#FECF44', fontWeight: 'bold' }}>Gián Điệp</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.gameOptionContainer('#FCBE4F')}>
                    <Text style={styles.gameText}> Ai Là Gián Điệp</Text>
                    <View style={styles.gameTypeContainer}>
                        <View style={styles.gameType('#F2E19E')}>
                            <Image resizeMode='center' source={require('../../assets/micro_images.png')} style={{ flex: 3 }} />
                            <View style={styles.gameName}>
                                <Text style={{ textAlign: 'center', color: '#FCB043', fontSize: 12, fontWeight: 'bold' }}>Chế độ giọng nói</Text>
                            </View>
                        </View>
                        <View style={styles.gameType('#F2E19E')}>
                            <Image resizeMode='center' source={require('../../assets/pencil_images.png')} style={{ flex: 3 }} />
                            <View style={styles.gameName}>
                                <Text style={{ textAlign: 'center', color: '#FCB043', fontSize: 12, fontWeight: 'bold' }}>Chế độ văn bản</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.gameOptionContainer('#2CADFE')}>
                    <Text style={styles.gameText}> Gián điệp không lời</Text>
                    <View style={styles.gameTypeContainer}>
                        <View style={styles.gameType('#B6EDFF')}>
                            <Image resizeMode='center' source={require('../../assets/micro_images.png')} style={{ flex: 3 }} />
                            <View style={styles.gameName}>
                                <Text style={{ textAlign: 'center', color: '#318BD5', fontSize: 12, fontWeight: 'bold' }}>Chế độ giọng nói</Text>
                            </View>
                        </View>
                        <View style={styles.gameType('#B6EDFF')}>
                            <Image resizeMode='center' source={require('../../assets/pencil_images.png')} style={{ flex: 3 }} />
                            <View style={styles.gameName}>
                                <Text style={{ textAlign: 'center', color: '#318BD5', fontSize: 12, fontWeight: 'bold' }}>Chế độ văn bản</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainers}>
                    <View style={styles.containerFindRoom}>
                        <LinearGradient colors={['#2CB4FF', '#62C7FF']} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                            <Image source={require('../../assets/find_icon.png')} style={{flex: 1, resizeMode: 'center'}} />
                            <Text style={{flex: 2, color: 'white', fontSize: 18 }}>Tìm phòng</Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.containerCreateRoom}>
                        <LinearGradient colors={['#AB012B', '#FF003F']} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                            <Image source={require('../../assets/create_icon.png')} style={{flex: 1, resizeMode: 'center'}} />
                            <Text style={{flex: 2, color: 'white', fontSize: 18 }}>Tạo Phòng</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
};
export default SpyMainScreen;