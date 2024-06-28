import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  player: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  statusDot: (isReady) => ({
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: isReady ? COLORS.green : COLORS.orange,
    borderWidth: 1,
    borderColor: 'white',
  }),
  descChat: {
    position: "absolute",
    top: 0,
    padding: 5,
    left: "120%",
    height: 50,
    width: "200%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: "white",

  },
  voteCount: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default styles;