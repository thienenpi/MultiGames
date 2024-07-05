import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    fontSize: 20,
    marginLeft: 16,
  },

  icon: {
    fontSize: 20,
    color: COLORS.price,
  },

  itemContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },

  priceContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },

  price: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "bold",
    color: "#00CF00",
  },

  balanceContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
    justifyContent: "space-between",
  },

  balanceText: {
    fontSize: 14,
  },

  balanceContent: {
    flexDirection: "row",
  },

  balanceAmount: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "bold",
    color: "#00CF00",
  },

  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  bannerImage: {
    width: "100%",
    height: 170,
  },

  separator: {
    height: 0.5,
    backgroundColor: "lightgray",
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },

  categoryIcon: {
    color: "pink",
    fontSize: 22,
  },

  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    left: SIZES.width / 10,
    right: SIZES.width / 10,
    top: SIZES.height / 4,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: SIZES.medium,
  },

  button: {
    borderRadius: 50,
    padding: 8,
    elevation: 2,
    width: "60%",
    margin: 10
  },

  buttonBuy: {
    backgroundColor: "#00BDF9",
    marginBottom: 20,
  },

  textStyle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default styles;
