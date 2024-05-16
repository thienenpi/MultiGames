import React from 'react';
import styles from './styles/spyMain.style'
import {
    View,
    Text,
    ImageBackground,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import GameHeader from '../components/spy_game/GameHeader';
import GameType from '../components/spy_game/GameType';
const SpyMainScreen = () => {
    return (
        <SafeAreaView style={{ flexDirection: 'column' }}>
            <ImageBackground source={require('../../assets/spy_game_main_background.png')} style={styles.background}>
                <GameHeader />
                <View style={styles.gameOptionContainer('#FCBE4F')}>
                    <Text style={styles.gameText}> Ai Là Gián Điệp</Text>
                    <View style={styles.gameTypeContainer}>
                        <GameType
                            backgroundColor={COLORS.lightOrange}
                            textColor={COLORS.orange}
                            imageUrl={require('../../assets/micro_images.png')}
                            gametypeName={'Chế độ giọng nói'}>
                        </GameType>
                        <GameType
                            backgroundColor={COLORS.lightOrange}
                            textColor={COLORS.orange}
                            imageUrl={require('../../assets/pencil_images.png')}
                            gametypeName={'Chế độ văn bản'}>
                        </GameType>
                    </View>
                </View>
                <View style={styles.gameOptionContainer('#2CADFE')}>
                    <Text style={styles.gameText}> Gián điệp không lời</Text>
                    <View style={styles.gameTypeContainer}>
                        <GameType
                            backgroundColor={COLORS.brightBlue}
                            textColor={COLORS.darkBlue}
                            imageUrl={require('../../assets/micro_images.png')}
                            gametypeName={'Chế độ giọng nói'}>
                        </GameType>
                        <GameType
                            backgroundColor={COLORS.brightBlue}
                            textColor={COLORS.darkBlue}
                            imageUrl={require('../../assets/pencil_images.png')}
                            gametypeName={'Chế độ văn bản'}>
                        </GameType>
                    </View>
                </View>
                <View style={styles.buttonContainers}>
                    <View style={styles.containerFindRoom}>
                        <LinearGradient colors={COLORS.blueGradient} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                            <Image source={require('../../assets/find_icon.png')} style={{ flex: 1, resizeMode: 'center' }} />
                            <Text style={{ flex: 2, color: 'white', fontSize: 18 }}>Tìm phòng</Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.containerCreateRoom}>
                        <LinearGradient colors={COLORS.redGradient} start={[0, 0]} end={[1, 0]} style={styles.gradientButton}>
                            <Image source={require('../../assets/create_icon.png')} style={{ flex: 1, resizeMode: 'center' }} />
                            <Text style={{ flex: 2, color: 'white', fontSize: 18 }}>Tạo Phòng</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default SpyMainScreen;