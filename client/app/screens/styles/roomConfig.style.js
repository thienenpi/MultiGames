import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  body: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  playersRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  playerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: SIZES.medium,
  },

  playerAvatar: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    borderRadius: SIZES.xxLarge,
    marginBottom: SIZES.small,
  },

  playerName: {},

  settingsColumn: {
    flex: 3,
    flexDirection: "column",
  },

  footer: {
    flex: 3,
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 4,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.large,
    color: COLORS.white,
  },
});

export default styles;
