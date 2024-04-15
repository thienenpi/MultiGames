import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width,
    backgroundColor: COLORS.background,
  },

  btnContainer: () => ({
    // backgroundColor: backgroundColor,
    backgroundColor:'#00CDF9' ,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 4,
    height: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  
  btnLabel: {
    fontFamily: 'sfProBold',
    fontSize: SIZES.large,
    color: 'white',
  },

  ipfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - SIZES.xxLarge * 2,
    borderRadius: SIZES.medium,
    borderColor: COLORS.text,
    borderWidth: 1,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
  },

  ipfTextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    color: COLORS.text
  },
  registerText: {
    color: '#00BDF9',
    
  }
});

export default styles;
