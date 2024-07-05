import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerButton: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f8bbf5",
    borderRadius: 20,
    marginVertical: 20,
    paddingHorizontal: 35,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },

  item: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  textTask: {
    marginTop: 8,
    color: "#333333",
  },

  containerInfo: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "rgba(128, 128, 128, 0.06)",
    paddingHorizontal: 6,
  },

  buttonText: {
    fontSize: 12,
    color: "#333333",
  },
  text: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
    opacity: 0.9,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
});

export default styles;
