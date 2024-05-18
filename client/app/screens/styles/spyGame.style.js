import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2667C3',
    justifyContent: 'space-around',
    borderRadius: 20,
    padding: 8,
  },
  playersContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,

  },
  player: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#11568E',
    borderRadius: 50,
    padding: 10,
  },
  chatHistory: {
    flex: 3,
    marginBottom: 12,
    borderColor: '#ccc',
    backgroundColor: '#1A4788',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'white',
    margin: 5,
    opacity: 0.7,
    // You can style the input box here
  },
  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 6,
    height: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  roomBanner: {
    flex: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#47A6FF',
    textAlign: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  roomName: {
    width: '100%',
    backgroundColor: '#2874CC',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    height: windowHeight,
    resizeMode: 'contain', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  header_cotainer: {
    flex: 1,
    marginVertical: 20,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  containerReady: {
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
    justifyContent: 'center',
    alignItems: 'center',
}
});

export default styles;
