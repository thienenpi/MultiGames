import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width,
    top: SIZES.xxLarge
  },

  appBar: {
    flex: 1,
    width: "100%"
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
    fontFamily: 'sfProBold',
  },

  headerIcon: {
    fontSize: SIZES.xLarge,
  },

  body: {
    flex: 10,
    width: "100%",
  },
  centeredView: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    gap: 10,
    flexDirection: "row",
    height: SIZES.height / 6,
    width: SIZES.width / 1.2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeText: {
    color: "#2196F3",
    textAlign: "center",
  },
});

export default styles;
