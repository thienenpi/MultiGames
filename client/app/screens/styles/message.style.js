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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
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
