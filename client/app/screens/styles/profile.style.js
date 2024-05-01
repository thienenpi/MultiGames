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
    flex: 1.5,
    marginBottom: SIZES.small,
    width: SIZES.width,
  },

  body: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width,
  },

  options: {
    flex: 4,
    width: SIZES.width,
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
