import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  chatBox: {
    flex: 5, // Sử dụng flex để khung chứa câu trả lời mở rộng để điền vào khoảng trống còn lại
    backgroundColor: "white", // Màu nền của khung chứa câu trả lời
    marginTop: 10,
    marginBottom: 10, // Khoảng cách giữa khung chứa ảnh và khung chứa câu trả lời
    padding: 20, // Khoảng cách giữa các phần tử bên trong khung chứa câu trả lời
    borderRadius: 10,
  },

  senderName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },

  context: {
    fontSize: 20,
    fontWeight: "normal",
    color: COLORS.primaryLight,
  },
});

export default styles;
