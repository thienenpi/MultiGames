import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 50,
    justifyContent: "center",
    padding: 16,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },

  ipfContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - SIZES.xxLarge * 2,
    borderRadius: SIZES.medium,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
    backgroundColor: "white",
  },

  ipfTextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },

  btnContainer: () => ({
    borderRadius: SIZES.medium,
    width: SIZES.width - SIZES.xxLarge * 6,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "start",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.large,
    color: "white",
  },
});

export default styles;
