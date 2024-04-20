import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import styles from './styles/editProfile.style';
import { HorizontalItem } from '../components';

const EditProfile = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} />
                    </Pressable>
                    <Text style={styles.headerText}>Edit Profile</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <HorizontalItem
                    title="Avatar"
                    isAvt={true}
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Nickname"
                    desc="Huynh Phat"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="User ID"
                    isIconDesc={true}
                    iconDesc='alert-circle'
                    colorIconDesc='red'
                    desc="Not set"
                    colorDesc='red'
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="QR Code Contact Card"
                    iconRight="qr-code-sharp"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Gender"
                    desc="Male"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Birthday"
                    desc="24/09/2003"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Region"
                    desc="Vietnam"
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Signature"
                    desc=""
                    iconRight="arrow-forward"
                    isCenter={false}
                    onPress={() => { }}
                />
            <View style={styles.separator} />
        </SafeAreaView>
    );
};

export default EditProfile;