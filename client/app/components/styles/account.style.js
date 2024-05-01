import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },

  avatar: {
    flex: 2,
    width: SIZES.xLarge * 3,
    height: SIZES.xLarge * 3,
    borderRadius: SIZES.xLarge * 3,
  },

  user: {
    flex: 5,
    height: SIZES.xLarge * 3,
    justifyContent: "space-between",
  },

  userName: {
    fontFamily: "sfProBold",
    fontSize: SIZES.xLarge,
    color: COLORS.text,
  },

  userId: {
    flexDirection: "row",
    fontSize: SIZES.medium,
    alignItems: "center",
    color: COLORS.text,
  },

  iconId: {
    borderRadius: SIZES.medium
  },

  forward: {
    flex: 1,
    height: SIZES.xLarge * 3,
    alignItems: "flex-end",
  },
});

export default styles;
