const { StyleSheet } = require("react-native");
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },

  header: {
    flex: 2,
    marginBottom: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.button
  },

  body: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 5,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.large,
    color: COLORS.text,
  },

  ipfContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.xxLarge * 2,
    borderRadius: SIZES.medium,
    borderColor: COLORS.text,
    borderWidth: 1,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
  },

  ipfTextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
});

export default styles;
