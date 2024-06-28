import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  chatBox: {
    flex: 2, 
    backgroundColor: "white", 
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },

  senderName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },

  context: {
    fontSize: 20,
    fontWeight: "normal",
    color: COLORS.primaryLight,
  },
});

export default styles;
