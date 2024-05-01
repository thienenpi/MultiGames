import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    paddingHorizontal: 16,
    width: "100%",
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    marginLeft: 16,
    color: COLORS.white,
  },

  iconRight: {
    fontSize: 20,
    color: COLORS.white,
  },

  iconLeft: {
    fontSize: 22,
    color: COLORS.white,
  },
});

export default styles;
