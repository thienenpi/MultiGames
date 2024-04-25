import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  dialogContainer: {
    position: 'absolute', // Đảm bảo component lớn nhất nằm trên cùng
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(50, 50, 50, 0.5)', // Background color của component lớn nhất
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dialogBody: {
    height: '50%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },

  appBar: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    width: SIZES.width,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#79c060',
  },

  whiteBoard: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: COLORS.background,
  },

  chatBox: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: '#79c060',
    padding: 10, // Thêm padding để tạo khoảng cách giữa các phần tử trong khung chatBox
  },

  userImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Khoảng cách giữa userImagesContainer và inputContainer
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc', // Màu nền tạm thời
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Màu nền của ô nhập câu trả lời và nút gửi
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
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },

  answersContainer: {
    flex: 1, // Sử dụng flex để khung chứa câu trả lời mở rộng để điền vào khoảng trống còn lại
    backgroundColor: 'white', // Màu nền của khung chứa câu trả lời
    marginTop: 10,
    marginBottom: 10, // Khoảng cách giữa khung chứa ảnh và khung chứa câu trả lời
    padding: 60, // Khoảng cách giữa các phần tử bên trong khung chứa câu trả lời
    borderRadius: 10, // Đường viền cong cho khung chứa câu trả lời
  },

  roomInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'

  },
  roomId: {
    fontSize: 14,
    color: 'white'
  },
  //Inout container 

  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    // Thêm các style khác cho icon nếu cần
  },
  input: {
    flex: 1,
    // Thêm các style khác cho TextInput nếu cần
  },
  bannerCotainer: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: "#79c060",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonContainers: {
    flex: 1,
    width: SIZES.width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    margin: 10,
  },
  containerInvite: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  containerStart: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradientButton: {
    width: 150,
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}
});
export default styles;
