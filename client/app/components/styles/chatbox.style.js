import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  chatBox: {
    flex: 3,
    backgroundColor: "white", 
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },

  senderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },

  context: {
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.primaryLight,
  },
});

export default styles;
