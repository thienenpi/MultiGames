import { StyleSheet } from "react-native";
import { COLORS } from '../../constants';
const styles = StyleSheet.create({
    headerContainer: {
        height: 'auto',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.blurBlue,
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameNameContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameTile: (_color) => ({
        fontSize: 30,
        color: _color,
        fontWeight: 'bold',
    }),
    image: {
        flex: 1,
        height: 100,
        width: 100,
    },
});

export default styles;