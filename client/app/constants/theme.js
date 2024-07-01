import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const COLORS = {
  text: "#0D0D0D",
  back: "#000000",
  white: "#FFFFFF",
  primaryLight: "#FF92DA",
  primaryDark: "#9B92FF",
  background: "#F2F2F2",
  secondary: "#8C281F",
  disable: "#8C8C87",
  button: "#00BDF9",
  price: "#00CF00",
  darkBlue: "#2667C3",
  darkerBlue: "#11568E",
  lightBlue: "#47A6FF",
  brightBlue: "#B6EDFF",
  blurBlue: "rgba(2, 138, 216, 0.6)",
  yellowGradient: ["#F3D14F", "#FA972B"],
  blueGradient: ["#A3BFFF", "#A0E5FF"],
  redGradient: ["#AB012B", "#FF003F"],
  lightOrange: "#F2E19E",
  orange: "#FCB043",
  green: "#00CF00",
};

const SIZES = {
  xSmall: 10, // description, note
  small: 12, // normal text
  medium: 16, // section heading
  large: 20, // screen heading
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES, SHADOWS };
