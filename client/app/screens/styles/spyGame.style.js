import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
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
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'space-around',
    borderRadius: 20,
    padding: 10,
  },
  centerContainer: {
    gap: 20,
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10
  },
  playersContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
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
  roomBanner: {
    flex: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.lightBlue,
    textAlign: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  roomNameContainer: {
    width: '100%',
    backgroundColor: COLORS.darkBlue,
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
    marginVertical: 10,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  roomAddressText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
  roomNameText: {
    fontSize: 14,
    color: 'white'
  }
});

export default styles;
