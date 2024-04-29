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
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: (backgroundColor) => ({
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.background,
    width: SIZES.width,
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge,
  }),
  btnLabel: {
    fontSize: SIZES.large,
    fontFamily: "sfPro",
    color: COLORS.text,
  },

  btnIcon: {
    flexDirection: "row",
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
    backgroundColor: "#FFA12E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xxLarge * 2,
    marginHorizontal: SIZES.small,
  },

  headerText: {
    fontSize: 20,
    marginLeft: 16,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  button: {
    padding: 8,
    elevation: 2,
    width: "40%",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 12,
  },
  icon: {
    fontSize: 20,
    color: "#00CF00",
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
    height: "48%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
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
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
  roomContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge * 2,
    width: SIZES.width,
    padding: SIZES.medium,
    // create border around the message card
    borderBottomWidth: 0.5,
    borderColor: COLORS.text,
  },
  avatar: {
    width: SIZES.xLarge * 2.5,
    height: SIZES.xLarge * 2.5,
    borderRadius: SIZES.xLarge * 2.5,
  },

  roomInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  roomID: {
    fontSize: SIZES.large,
    fontFamily: "sfPro",
    left: SIZES.small,
  },

  roomState: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.xSmall / 2,
  },

  waiting: {
    fontSize: SIZES.medium,
    fontFamily: "sfPro",
  },

  gameType: {
    fontSize: SIZES.medium,
    fontFamily: "sfPro",
    backgroundColor: COLORS.primaryLight,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.small,
  },
});

export default styles;