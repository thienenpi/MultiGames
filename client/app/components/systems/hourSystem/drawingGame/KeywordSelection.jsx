import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image, Pressable, StyleSheet } from "react-native";

const KeywordSelection = ({ isShow, keyword }) => {
    const [show, setShow] = useState(isShow);

    useEffect(() => {
        setShow(isShow);
    }, [isShow]);

    const closeModal = () => {
        setShow(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={closeModal}
        >
            <Pressable style={styles.overlay} onPress={closeModal} />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>{keyword}</Text>
                </View>
            </View>
        </Modal>
    );
};

export default KeywordSelection;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height: "48%",
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
});
