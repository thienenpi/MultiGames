import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import styles from './styles/setting.style';
import { HorizontalItem } from '../components';

const Setting = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} />
                    </Pressable>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <HorizontalItem
                    title="Account Management"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Message Notification"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Privacy"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="General"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Clear Cache"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Quick Repair"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Upload Log"
                    index=""
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="About Us"
                    index="V 1.0.0"
                    iconName="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Log Out"
                    index=""
                    iconName=""
                    isCenter={true}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
        </SafeAreaView>
    );
};

export default Setting;