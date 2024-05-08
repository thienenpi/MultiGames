import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginHorizontal: 15,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#00CDF9",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 16,
    marginHorizontal: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    marginHorizontal: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  required: {
    color: "red",
  },
});

export default styles;
