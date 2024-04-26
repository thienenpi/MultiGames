import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    playerCotainer: {
        height: '25%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    playerAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#11568E',
        borderRadius: 50,
        padding: 10,
        resizeMode: 'cover'
    },
    playerName: {
        color: 'white',
        fontSize: 15,
    },
    statusIndicator: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        width: 12,
        height: 12,
        backgroundColor: "orange",
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1,
    },
});
export default styles;