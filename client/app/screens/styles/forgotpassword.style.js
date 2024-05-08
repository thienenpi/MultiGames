import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width,
  },

  appBar: {
    flex: 1,
    width: "100%",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: SIZES.large,
  },

  headerText: {
    flex: 1,
    color: COLORS.back,
    fontSize: SIZES.xLarge,
    fontFamily: "sfProBold",
  },

  headerIcon: {
    fontSize: SIZES.xLarge,
  },

  body: {
    flex: 10,
    width: "100%",
  },
});

export default styles;
