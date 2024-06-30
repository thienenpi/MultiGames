import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";

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

  separator: {
    height: 10,
    opacity: 0.3,
    backgroundColor: "lightgray",
  },

  actionSheetContent: {
    // padding: 20,
    gap: SIZES.xSmall,
  },

  btnContainer: (backgroundColor) => ({
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  }),

  btnLabel: {
    fontSize: 18,
    fontFamily: "sfPro",
  },

  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
