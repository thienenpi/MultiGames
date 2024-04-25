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
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Message Notification"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Privacy"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="General"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Clear Cache"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Quick Repair"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Upload Log"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="About Us"
                    desc="V 1.0.0"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Log Out"
                    isCenter={true}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
        </SafeAreaView>
    );
};

export default Setting;