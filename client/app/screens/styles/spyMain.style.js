import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  background: {
    height: windowHeight,
    resizeMode: "contain",
    justifyContent: "flex-start",
  },
  gameOptionContainer: (_color) => ({
    height: 130,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: _color,
    borderRadius: 20,
    margin: 10,
  }),
  gameTypeContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  gameText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  buttonContainers: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    margin: 10,
  },
  containerFindRoom: {
    borderRadius: 5,
    overflow: "hidden",
  },
  containerCreateRoom: {
    borderRadius: 5,
    overflow: "hidden",
  },
  gradientButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default styles;
