import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    gameTypeImage: {
        flex: 3,
        resizeMode: 'center',
    },
    gameTypeName: (_color) => ({
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: _color,
    }),
    gameType: (_color) => ({
        height: 100,
        width: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: _color
    }),
    gameName: {
        borderRadius: 5,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});
export default styles;