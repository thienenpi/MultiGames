import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        height: 95,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
        position: 'relative',
    },
    innerContainer: {
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 35,
        borderRadius: 15,
        position: 'relative',
        zIndex: -1,
    },
    text: {
        width: "90%",
        fontSize: 28,
        fontWeight: "600",
        verticalAlign: "middle",
        color: 'white',
    },
    icon: {
        width: 102,
        height: 102,
        position: 'absolute',
        alignSelf: 'flex-end',
        zIndex: 1,
    },
});

export default styles;