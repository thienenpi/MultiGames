import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";

const CustomTimer = ({ timer, setTimer }) => {

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) {
                clearInterval(interval);
                return;
            }
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
            <Text style={styles.timer}>{timer}</Text>
    );
};

const styles = StyleSheet.create({
    timer: {
        color: "white", 
        fontSize: 16, 
        marginLeft: 10, 
        height: 35, 
        textAlignVertical: "center",
    },
});

export default CustomTimer;