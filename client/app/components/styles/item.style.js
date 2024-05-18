import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        color: '#00CF00',
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 16,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 6,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        textAlign: "left",
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    price: {
        fontSize: 14,
        marginLeft: 8,
        fontWeight: "bold",
        color: "#00CF00"
    },
});

export default styles;