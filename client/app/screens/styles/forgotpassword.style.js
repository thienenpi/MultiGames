import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 50,
    justifyContent: "center",
    padding: 16,
  },
  container: {
    flex: 1,
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
});

export default styles;
