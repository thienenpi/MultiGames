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
  chatLeft: {
    position: "absolute",
    top: 0,
    padding: 5,
    left: "120%",
    height: 50,
    width: "200%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: "white",
    alignContent: "flex-start"
  },
  chatRight: {
    position: "absolute",
    top: 0,
    padding: 5,
    right: "120%",
    height: 50,
    width: "200%",
    borderRadius: 10,
    borderTopRightRadius: 0,
    backgroundColor: "white",
    alignContent: "flex-end"
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
  eliminated:{
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
  eliminatedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  voted:{
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
  votedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default styles;