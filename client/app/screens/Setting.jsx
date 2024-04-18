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
                    <Text style={styles.headerText}>Cài đặt</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <HorizontalItem
                    title="Quản lý tài khoản"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Nhận thông báo mới nhất"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Quyền riêng tư"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Thường dùng"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Xóa bộ nhớ cache"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Sửa bằng 1 lượt nhấp"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <HorizontalItem
                    title="Tải lên nhật ký"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="MultiGame"
                    index="V 1.0.0"
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <View style={styles.separator} />
            <HorizontalItem
                    title="Đăng xuất"
                    index=""
                    iconName="arrow-forward"
                    onPress={() => { }}
                />
            <View style={styles.separator} />
        </SafeAreaView>
    );
};

export default Setting;