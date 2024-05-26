import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalView: {
    height: "48%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  appBar: {
    zIndex: 999,
    position: "absolute",
    top: 0,
    flexDirection: "row",
    alignItems: 'flex-end',
    backgroundColor: "#fff",
    height: 80,
    width: SIZES.width,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#79c060",
  },

  whiteBoard: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: COLORS.background,
  },

  chatBox: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: "#79c060",
    padding: 10,
    // backgroundColor: COLORS.button
  },

  userImagesContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 40,
    paddingVertical: 5,
    fontSize: 16,
  },

  sendButton: {
    marginLeft: 10,
    padding: 5,
  },

  sendIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: COLORS.primary,
  },

  answersContainer: {
    flex: 1, // Sử dụng flex để khung chứa câu trả lời mở rộng để điền vào khoảng trống còn lại
    backgroundColor: "white", // Màu nền của khung chứa câu trả lời
    marginTop: 10,
    marginBottom: 10, // Khoảng cách giữa khung chứa ảnh và khung chứa câu trả lời
    padding: 60, // Khoảng cách giữa các phần tử bên trong khung chứa câu trả lời
    borderRadius: 10, // Đường viền cong cho khung chứa câu trả lời
  },

  roomInfoContainer: {
    flex: 1,
    alignItems: "center",
  },

  roomName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },

  roomId: {
    fontSize: 10,
    color: "white",
  },

  iconButton: {
    padding: 10,
  },

  icon: {
    width: 24,
    height: 24,
  },

  input: {
    flex: 1,
  },

  bannerCotainer: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: "#79c060",
    alignItems: "flex-end",
  },

  buttonContainers: {
    flex: 1,
    width: SIZES.width,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },

  containerInvite: {
    borderRadius: 5,
    overflow: "hidden",
  },

  containerStart: {
    borderRadius: 5,
    overflow: "hidden",
  },

  gradientButton: {
    width: 150,
    height: 50,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bottomBar: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
  },

  topBar: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    borderTopHeight: 1,
    backgroundColor: "white",
  },

  separator: {
    height: 1,
    backgroundColor: "lightgray",
  },

  optionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 8,
  },
});
export default styles;
