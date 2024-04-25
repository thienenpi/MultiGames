import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  appBar: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },

  body: {
    flex: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  btnContainer: (color) => ({
    backgroundColor: COLORS.background,
    width: SIZES.width,
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge,
  })
  ,

  btnLabel: {
    fontSize: SIZES.large,
    fontFamily: "sfPro",
    color: COLORS.text,
  },

  btnIcon: {
    flexDirection: 'row',
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xxLarge * 2,
    marginHorizontal: SIZES.small
  },
});

export default styles;
