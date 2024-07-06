import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
    opacity: 0.1,
  },
  body: {
    flex: 1,
    marginHorizontal: 8,
  },
  btnContainer: (backgroundColor) => ({
    // backgroundColor: backgroundColor,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 2,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
  }),
  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
