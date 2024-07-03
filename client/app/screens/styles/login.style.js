import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width,
    backgroundColor: COLORS.background,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },

  btnContainer: () => ({
    borderRadius: SIZES.medium,
    width: SIZES.width - SIZES.xxLarge * 3.2,
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

  authentication: {
    flexDirection: "row",
    width: SIZES.width - SIZES.xxLarge * 2,
    justifyContent: "space-between",
    alignItems: "center",
  },

  fingerPrint: {
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: "black",
    padding: 2,
  },

  faceialRecognition: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    borderRadius: SIZES.xSmall,
  },

  registerText: {
    color: COLORS.lightBlue,
    fontSize: SIZES.medium,
  },

  forgotPasswordText: {
    color: COLORS.lightBlue,
    fontSize: SIZES.medium,
    textDecorationLine: "underline",
  },
});

export default styles;
