import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        height: windowHeight,
        resizeMode: 'contain',
        justifyContent: 'flex-start',
    },
    headerContainer: {
        height: 'auto',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 138, 216, 0.6)',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#096BDD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameNameContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameOptionContainer: (_color) => ({
        height: 130,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: _color,
        borderRadius: 20,
        margin: 10,
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
    gameTypeContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    gameText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    buttonContainers: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        margin: 10,
    },
    containerFindRoom: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    containerCreateRoom: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    gradientButton: {
        width: 150,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

});
export default styles;