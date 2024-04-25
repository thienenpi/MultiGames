import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 18,
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    textTask: {
        marginTop: 8,
        color: '#333333',
    },
    containerInfo: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(128, 128, 128, 0.06)',
        paddingHorizontal: 6,
      },
      buttonText: {
        fontSize: 12,
        color: '#333333',
      },
});

export default styles;