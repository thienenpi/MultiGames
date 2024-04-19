import React, { useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileRow } from '../components';
import { AuthContext } from "../context/AuthContext";
import styles from './styles/dashboard.style';

const Dashboard = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <SafeAreaView style={{ marginTop: 40 }}>
            <ProfileRow
                avatarSource={require('../../assets/bg01.png')}
                name={userInfo.name}
                money="100"
                eventIcon="star-outline"
                eventText="Events"
            />
            <View style={styles.containerTask}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="stats-chart" size={34} color="blue" />
                    <Text style={styles.text}>Ranking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="list" size={34} color="red" />
                    <Text style={styles.text}>Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="people-sharp" size={34} color="purple" />
                    <Text style={styles.text}>Friends</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerInfo}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 30, fontWeight: "600" }}>Let's Play</Text>
                    <TouchableOpacity style={[styles.button, {paddingHorizontal: 10, paddingVertical: 4}]}>
                        <Ionicons name="lock-open-outline" size={16} color="gray" style={{marginRight: 6}} />
                        <Text style={[styles.buttonText, {fontSize: 14}]}>Game Room</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { justifyContent: "flex-start" }]}>
                    <Text style={{ fontSize: 14, color: "#333333", opacity: 0.5, marginRight: 10 }}>Recently played :</Text>
                    <TouchableOpacity style={[styles.button, {borderRadius: 6, paddingVertical: 2}]}>
                        <Ionicons name="pencil-outline" size={14} color="gray" style={{marginRight: 6}} />
                        <Text style={styles.buttonText}>Guess My Drawing</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Dashboard;