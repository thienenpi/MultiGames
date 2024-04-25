import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  appBar: {
    flex: 1,
    width: "100%",
  },

  body: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
